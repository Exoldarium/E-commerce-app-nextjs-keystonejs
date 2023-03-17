import 'dotenv/config';
import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { cloudinaryImage } from '@keystone-6/cloudinary';
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  integer,
  virtual,
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import type { Lists } from '.keystone/types';
import { graphql } from '@graphql-ts/schema';
import formatMoney from './lib/formatMoney';

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
  apiKey: process.env.CLOUDINARY_KEY!,
  apiSecret: process.env.CLOUDINARY_SECRET!,
  folder: 'e-commerce-images',
};

// TODO
// roles and premissions

export const lists: Lists = {
  User: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      password: password(),
      products: relationship({
        ref: 'Product.user',
        many: true,
      }),
      cart: relationship({
        ref: 'CartItem.user',
        many: true,
        ui: {
          createView: { fieldMode: 'hidden' },
          itemView: { fieldMode: 'read' },
        }
      }),
      orders: relationship({ ref: 'Order.user', many: true }),
    },
  }),
  Product: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      description: text({
        ui: {
          displayMode: 'textarea',
        },
      }),
      status: select({
        options: [
          { label: 'Draft', value: 'DRAFT' },
          { label: 'Available', value: 'AVAILABLE' },
          { label: 'Unavailable', value: 'UNAVAILABLE' },
        ],
        defaultValue: 'DRAFT',
        ui: {
          displayMode: 'segmented-control',
          createView: { fieldMode: 'hidden' },
        },
      }),
      price: integer(),
      stock: integer(),
      photo: relationship({
        ref: 'ProductImage.product',
        ui: {
          displayMode: 'cards',
          cardFields: ['image', 'altText'],
          inlineCreate: { fields: ['image', 'altText'] },
          inlineEdit: { fields: ['image', 'altText'] },
        },
      }),
      user: relationship({
        ref: 'User.products',
        hooks: {
          // when a product is created make a relationship to User.products
          resolveInput({ resolvedData, operation, context }) {
            if (operation === 'create') {
              // we return an object with a connect property which connects to the id of the currently signed in user
              return {
                connect: { id: context.session.itemId },
              };
            }
            return resolvedData.user;
          },
        },
      }),
    },
  }),
  ProductImage: list({
    access: allowAll,
    fields: {
      image: cloudinaryImage({
        cloudinary,
        label: 'Source',
      }),
      altText: text(),
      product: relationship({ ref: 'Product.photo' }),
    },
    ui: {
      listView: {
        initialColumns: ['image', 'altText', 'product'],
      },
    },
  }),
  CartItem: list({
    access: allowAll,
    ui: {
      listView: {
        initialColumns: ['product', 'quantity', 'user'],
      }
    },
    fields: {
      quantity: integer({
        defaultValue: 1,
        // validation means that integer method can't be set to 0
        validation: {
          isRequired: true
        },
      }),
      product: relationship({ ref: 'Product' }),
      user: relationship({ ref: 'User.cart' }),
    }
  }),
  Order: list({
    access: allowAll,
    fields: {
      // virtual fields allow us to query on the fly, here we query Order.total
      label: virtual({
        field: graphql.field({
          type: graphql.String,
          // grabs the total amount from Order and formats it
          resolve(item) {
            return `${formatMoney(item.total as number)}`;
          }
        })
      }),
      total: integer(),
      items: relationship({ ref: 'OrderItem.order', many: true }),
      user: relationship({ ref: 'User.orders' }),
      charge: text(),
      date: timestamp({
        defaultValue: {
          kind: 'now',
        },
      }),
    }
  }),
  OrderItem: list({
    access: allowAll,
    fields: {
      name: text({
        validation: {
          isRequired: true,
        }
      }),
      description: text({
        ui: {
          displayMode: 'textarea',
        }
      }),
      photo: relationship({
        ref: 'ProductImage',
        ui: {
          displayMode: 'cards',
          cardFields: ['image', 'altText'],
          inlineCreate: { fields: ['image', 'altText'] },
          inlineEdit: { fields: ['image', 'altText'] },
        }
      }),
      price: integer(),
      quantity: integer(),
      order: relationship({ ref: 'Order.items' }),
    }
  })
};
