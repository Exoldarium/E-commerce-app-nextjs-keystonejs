"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_config4 = require("dotenv/config");
var import_core2 = require("@keystone-6/core");

// schema.ts
var import_config = require("dotenv/config");
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_cloudinary = require("@keystone-6/cloudinary");
var import_fields = require("@keystone-6/core/fields");
var import_schema = require("@graphql-ts/schema");

// lib/formatMoney.ts
function formatMoney(cents) {
  const currency = {
    style: "currency",
    currency: "USD"
  };
  const amount = cents / 100;
  const formatter = new Intl.NumberFormat("en-US", currency).format(amount);
  return formatter;
}
var formatMoney_default = formatMoney;

// schema.ts
var cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
  folder: "e-commerce-images"
};
var lists = {
  User: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      email: (0, import_fields.text)({ validation: { isRequired: true }, isIndexed: "unique" }),
      password: (0, import_fields.password)(),
      products: (0, import_fields.relationship)({
        ref: "Product.user",
        many: true
      }),
      cart: (0, import_fields.relationship)({
        ref: "CartItem.user",
        many: true,
        ui: {
          createView: { fieldMode: "hidden" },
          itemView: { fieldMode: "read" }
        }
      }),
      orders: (0, import_fields.relationship)({ ref: "Order.user", many: true })
    }
  }),
  Product: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      description: (0, import_fields.text)({
        ui: {
          displayMode: "textarea"
        }
      }),
      status: (0, import_fields.select)({
        options: [
          { label: "Draft", value: "DRAFT" },
          { label: "Available", value: "AVAILABLE" },
          { label: "Unavailable", value: "UNAVAILABLE" }
        ],
        defaultValue: "DRAFT",
        ui: {
          displayMode: "segmented-control",
          createView: { fieldMode: "hidden" }
        }
      }),
      price: (0, import_fields.integer)(),
      stock: (0, import_fields.integer)(),
      photo: (0, import_fields.relationship)({
        ref: "ProductImage.product",
        ui: {
          displayMode: "cards",
          cardFields: ["image", "altText"],
          inlineCreate: { fields: ["image", "altText"] },
          inlineEdit: { fields: ["image", "altText"] }
        }
      }),
      user: (0, import_fields.relationship)({
        ref: "User.products",
        hooks: {
          resolveInput({ resolvedData, operation, context }) {
            if (operation === "create") {
              return {
                connect: { id: context.session.itemId }
              };
            }
            return resolvedData.user;
          }
        }
      })
    }
  }),
  ProductImage: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      image: (0, import_cloudinary.cloudinaryImage)({
        cloudinary,
        label: "Source"
      }),
      altText: (0, import_fields.text)(),
      product: (0, import_fields.relationship)({ ref: "Product.photo" })
    },
    ui: {
      listView: {
        initialColumns: ["image", "altText", "product"]
      }
    }
  }),
  CartItem: (0, import_core.list)({
    access: import_access.allowAll,
    ui: {
      listView: {
        initialColumns: ["product", "quantity", "user"]
      }
    },
    fields: {
      quantity: (0, import_fields.integer)({
        defaultValue: 1,
        validation: {
          isRequired: true
        }
      }),
      product: (0, import_fields.relationship)({ ref: "Product" }),
      user: (0, import_fields.relationship)({ ref: "User.cart" })
    }
  }),
  Order: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      label: (0, import_fields.virtual)({
        field: import_schema.graphql.field({
          type: import_schema.graphql.String,
          resolve(item) {
            return `${formatMoney_default(item.total)}`;
          }
        })
      }),
      total: (0, import_fields.integer)(),
      items: (0, import_fields.relationship)({ ref: "OrderItem.order", many: true }),
      user: (0, import_fields.relationship)({ ref: "User.orders" }),
      charge: (0, import_fields.text)()
    }
  }),
  OrderItem: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({
        validation: {
          isRequired: true
        }
      }),
      description: (0, import_fields.text)({
        ui: {
          displayMode: "textarea"
        }
      }),
      photo: (0, import_fields.relationship)({
        ref: "ProductImage",
        ui: {
          displayMode: "cards",
          cardFields: ["image", "altText"],
          inlineCreate: { fields: ["image", "altText"] },
          inlineEdit: { fields: ["image", "altText"] }
        }
      }),
      price: (0, import_fields.integer)(),
      quantity: (0, import_fields.integer)(),
      order: (0, import_fields.relationship)({ ref: "Order.items" })
    }
  })
};

// auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");

// lib/passwordResetMail.ts
var import_config2 = require("dotenv/config");
var nodemailer = require("nodemailer");
var transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});
function makeAnEmail(text2) {
  return `
    <div style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2>Hello!</h2>
      <p>${text2}</p>
    </div>
  `;
}
async function sendPasswordResetEmail(resetToken, to) {
  const emailInfo = await transport.sendMail({
    to,
    from: "test@example.com",
    subject: "Your password reset email",
    html: makeAnEmail(`This is your password reset token, 
      <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">click the link to reset your password</a>`)
  });
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(emailInfo));
}

// auth.ts
var sessionSecret = process.env.COOKIE_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"]
  },
  sessionData: "id name email",
  passwordResetLink: {
    async sendToken(args) {
      console.log(args);
      await sendPasswordResetEmail(args.token, args.identity);
    }
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// seed-data/data.ts
var products = [
  {
    name: "Totoro",
    description: "fluffy",
    status: "AVAILABLE",
    price: 3423,
    photo: {
      id: "5dfbed262849d7961377c2c0",
      filename: "totoro.jpg",
      originalFilename: "totoro.jpg",
      _meta: {
        format: "jpg",
        resource_type: "image",
        type: "upload",
        placeholder: false,
        url: "https://res.cloudinary.com/dxznx8ivg/image/upload/v1675785063/e-commerce-images/5dfbed262849d7961377c2c0_ivpucc.jpg",
        secure_url: "https://res.cloudinary.com/dxznx8ivg/image/upload/v1675785063/e-commerce-images/5dfbed262849d7961377c2c0_ivpucc.jpg",
        original_filename: "file"
      }
    }
  },
  {
    name: "Santa",
    description: "presents",
    status: "AVAILABLE",
    price: 3423,
    photo: {
      id: "5e2a143f689b2835ae71d1ad",
      filename: "santa.jpg",
      originalFilename: "santa.jpg",
      _meta: {
        format: "jpg",
        resource_type: "image",
        type: "upload",
        placeholder: false,
        url: "https://res.cloudinary.com/dxznx8ivg/image/upload/v1675785061/e-commerce-images/5e2a143f689b2835ae71d1ad_jkigrx.jpg",
        secure_url: "https://res.cloudinary.com/dxznx8ivg/image/upload/v1675785061/e-commerce-images/5e2a143f689b2835ae71d1ad_jkigrx.jpg",
        original_filename: "file"
      }
    }
  },
  {
    name: "Smiley face",
    description: "cute",
    status: "AVAILABLE",
    price: 3423,
    photo: {
      id: "5e2a13ff689b2835ae71d1a7",
      filename: "smiley.jpg",
      originalFilename: "smiley.jpg",
      _meta: {
        format: "jpg",
        resource_type: "image",
        type: "upload",
        placeholder: false,
        url: "https://res.cloudinary.com/dxznx8ivg/image/upload/v1675785062/e-commerce-images/5e2a13ff689b2835ae71d1a7_vcpu5t.jpg",
        secure_url: "https://res.cloudinary.com/dxznx8ivg/image/upload/v1675785062/e-commerce-images/5e2a13ff689b2835ae71d1a7_vcpu5t.jpg",
        original_filename: "file"
      }
    }
  },
  {
    name: "Unicorns",
    description: "cool",
    status: "AVAILABLE",
    price: 3423,
    photo: {
      id: "5e2a13f0689b2835ae71d1a5",
      filename: "unicorns.jpg",
      originalFilename: "unicorns.jpg",
      _meta: {
        format: "jpg",
        resource_type: "image",
        type: "upload",
        placeholder: false,
        url: "https://res.cloudinary.com/dxznx8ivg/image/upload/v1675785061/e-commerce-images/5e2a13f0689b2835ae71d1a5_cxnasi.jpg",
        secure_url: "https://res.cloudinary.com/dxznx8ivg/image/upload/v1675785061/e-commerce-images/5e2a13f0689b2835ae71d1a5_cxnasi.jpg",
        original_filename: "file"
      }
    }
  },
  {
    name: "Cupcakes",
    description: "delicious",
    status: "AVAILABLE",
    price: 3423,
    photo: {
      id: "5e2a1413689b2835ae71d1a9",
      filename: "cupcakes.jpg",
      originalFilename: "cupcakes.jpg",
      _meta: {
        format: "jpg",
        resource_type: "image",
        type: "upload",
        placeholder: false,
        url: "https://res.cloudinary.com/dxznx8ivg/image/upload/v1675785061/e-commerce-images/5e2a1413689b2835ae71d1a9_em0xos.jpg",
        secure_url: "https://res.cloudinary.com/dxznx8ivg/image/upload/v1675785061/e-commerce-images/5e2a1413689b2835ae71d1a9_em0xos.jpg",
        original_filename: "file"
      }
    }
  },
  {
    name: "Candycanes",
    description: "sweet",
    status: "AVAILABLE",
    price: 3423,
    photo: {
      id: "5e2a142c689b2835ae71d1ab",
      filename: "candycanes.jpg",
      originalFilename: "candycanes.jpg",
      _meta: {
        format: "jpg",
        resource_type: "image",
        type: "upload",
        placeholder: false,
        url: "https://res.cloudinary.com/dxznx8ivg/image/upload/v1675785061/e-commerce-images/5e2a142c689b2835ae71d1ab_r6m4ct.jpg",
        secure_url: "https://res.cloudinary.com/dxznx8ivg/image/upload/v1675785061/e-commerce-images/5e2a142c689b2835ae71d1ab_r6m4ct.jpg",
        original_filename: "file"
      }
    }
  }
];

// seed-data/index.ts
async function insertSeedData(prisma) {
  console.log(`Inserting Seed Data: ${products.length} Products`);
  for (const product of products) {
    console.log(`Adding Product: ${product.name}`);
    const { photo, ...productData } = product;
    const { id } = await prisma.productImage.create({
      data: {
        image: JSON.stringify(product.photo),
        altText: product.description
      }
    });
    await prisma.product.create({ data: { ...productData, photoId: id } });
  }
  console.log(`Seed Data Inserted: ${products.length} Products`);
  console.log(
    `Please start the process with \`yarn dev\` or \`npm run dev\``
  );
  process.exit();
}

// mutations/index.ts
var import_schema2 = require("@graphql-tools/schema");

// mutations/addToCart.ts
async function addToCart(root, { productId }, context) {
  console.log("adding to cart");
  const session2 = context.session;
  if (session2) {
    const allCartItems = await context.db.CartItem.findMany({
      where: {
        user: { id: { equals: session2.itemId } },
        product: { id: { equals: productId } }
      }
    });
    const [existingCartItem] = allCartItems;
    if (existingCartItem) {
      console.log(existingCartItem);
      console.log(
        `There are already ${existingCartItem.quantity} items in your cart`
      );
      return context.db.CartItem.updateOne({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + 1 }
      });
    }
    return context.db.CartItem.createOne({
      data: {
        product: { connect: { id: productId } },
        user: { connect: { id: session2.itemId } }
      }
    });
  }
}
var addToCart_default = addToCart;

// mutations/removeFromCart.ts
async function removeFromCart(root, { productId }, context) {
  console.log("removing from cart");
  const session2 = context.session;
  if (session2) {
    const allCartItems = await context.db.CartItem.findMany({
      where: {
        user: { id: { equals: session2.itemId } },
        product: { id: { equals: productId } }
      }
    });
    const [existingCartItem] = allCartItems;
    if (existingCartItem) {
      console.log(existingCartItem);
      console.log(
        `There are already ${existingCartItem.quantity} items in your cart`
      );
      return context.db.CartItem.updateOne({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity - 1 }
      });
    }
  }
}
var removeFromCart_default = removeFromCart;

// lib/stripe.ts
var import_config3 = require("dotenv/config");
var import_stripe = require("stripe");
var stripeConfig = new import_stripe.Stripe(
  process.env.STRIPE_SECRET || "",
  {
    apiVersion: "2022-11-15"
  }
);
var stripe_default = stripeConfig;

// mutations/checkout.ts
async function checkout(root, { token }, context) {
  const session2 = context.session;
  if (!session2) {
    throw new Error("Sorry you must be signed in to do this!");
  }
  const user = await context.query.User.findOne({
    where: { id: session2.itemId },
    query: "id name email cart { id quantity product { name price description id photo { id image { id publicUrlTransformed } } } }"
  });
  console.dir(user, { depth: null });
  const cartItems = user.cart.filter((cartItem) => cartItem.product);
  const amount = cartItems.reduce(function(tally, cartItem) {
    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);
  console.log(amount);
  const charge = await stripe_default.paymentIntents.create({
    amount,
    currency: "USD",
    confirm: true,
    payment_method: token
  }).catch(
    (err) => {
      console.log(err);
      throw new Error(err.message);
    }
  );
  console.log(charge);
  const orderItems = cartItems.map((cartItem) => {
    const orderItem = {
      name: cartItem.product.name,
      description: cartItem.product.description,
      price: cartItem.product.price,
      quantity: cartItem.quantity,
      photo: { connect: { id: cartItem.product.photo.id } }
    };
    return orderItem;
  });
  const order = await context.db.Order.createOne({
    data: {
      total: charge.amount,
      charge: charge.id,
      items: { create: orderItems },
      user: { connect: { id: session2.itemId } }
    }
  });
  await context.query.CartItem.deleteMany({
    where: user.cart.map((cartItem) => ({ id: cartItem.id }))
  });
  return order;
}
var checkout_default = checkout;

// mutations/index.ts
var graphql2 = String.raw;
var extendGraphqlSchema = (schema) => (0, import_schema2.mergeSchemas)({
  schemas: [schema],
  typeDefs: graphql2`
      type Mutation {
        addToCart(productId: ID): CartItem
        removeFromCart(productId: ID): CartItem
        checkout(token: String!): Order
      }
    `,
  resolvers: {
    Mutation: {
      addToCart: addToCart_default,
      removeFromCart: removeFromCart_default,
      checkout: checkout_default
    }
  }
});

// keystone.ts
var database = process.env.DATABASE_URL;
var keystone_default = withAuth(
  (0, import_core2.config)({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true
      }
    },
    db: {
      provider: "sqlite",
      url: database,
      async onConnect(context) {
        console.log("Connected to the database!");
        if (process.argv.includes("--seed-data")) {
          await insertSeedData(context.prisma);
        }
      }
    },
    lists,
    session,
    extendGraphqlSchema
  })
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
