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
import { isSignedIn, permissions, rules } from './access';
import { permissionFields } from './fields';

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
  apiKey: process.env.CLOUDINARY_KEY!,
  apiSecret: process.env.CLOUDINARY_SECRET!,
  folder: 'e-commerce-images',
};

export const lists: Lists = {
  User: list({
    access: {
      // everyone can create an account only admin can delete accounts
      operation: {
        create: () => true,
        delete: permissions.canManageUsers,
      },
      // signed in users can manage their own account
      filter: {
        query: rules.canManageUsers,
        delete: rules.canManageUsers
      }
    },
    ui: {
      // the create user ui is hidden unless the user has permission
      hideCreate: (args) => !permissions.canManageUsers(args),
      hideDelete: (args) => !permissions.canManageUsers(args),
    },
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
      role: relationship({
        ref: 'Role.assignedTo',
        access: {
          // only admin can see the roles
          create: permissions.canManageUsers,
          update: permissions.canSeeOtherUsers,
        }
      }),
    },
  }),
  Product: list({
    access: {
      // only signed in users can create products
      operation: {
        create: isSignedIn,
      },
      // signed in users can only manage their own products
      filter: {
        query: rules.canQueryProducts,
        update: rules.canManageProducts,
        delete: rules.canManageProducts,
      }
    },
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
    access: {
      operation: {
        // everyone can see images, only signed in users can create them, the admin is the only one that can update and delete
        create: isSignedIn,
        query: () => true,
        update: permissions.canManageProducts,
        delete: permissions.canManageProducts,
      },
    },
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
    access: {
      operation: {
        // only signed in users can add to cart
        create: isSignedIn,
      },
      filter: {
        // signed in users can only see their own cart, the admin sees everything
        query: rules.canOrder,
        update: rules.canOrder,
        delete: rules.canOrder,
      }
    },
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
    access: {
      // only signed in users can order but only admin can delete and update all orders
      operation: {
        query: isSignedIn,
        update: () => false,
        delete: () => false,
      },
      // signed in users can only see their own orders
      filter: {
        query: rules.canOrder,
      },
    },
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
    access: {
      operation: {
        // only signed in users can see their order items but only admin can update and delete all
        query: isSignedIn,
        update: () => false,
        delete: () => false,
      },
      // signed in users can only update, delete and see their own items
      filter: {
        query: rules.canManageOrderItems,
      },
    },
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
  }),
  Role: list({
    access: {
      operation: {
        // roles can be managed based on permissions 
        create: permissions.canManageRoles,
        query: permissions.canManageRoles,
        update: permissions.canManageRoles,
        delete: permissions.canManageRoles,
      },
    },
    ui: {
      // the ui is hidden unless the user has permisssion
      hideCreate: (args) => !permissions.canManageRoles(args),
      hideDelete: (args) => !permissions.canManageRoles(args),
      isHidden: (args) => !permissions.canManageRoles(args),
    },
    fields: {
      ...permissionFields,
      assignedTo: relationship({
        ref: 'User.role',
        many: true,
        ui: {
          itemView: { fieldMode: 'read' },
        }
      }),
      name: text({
        validation: { isRequired: true },
      })
    }
  })
};
