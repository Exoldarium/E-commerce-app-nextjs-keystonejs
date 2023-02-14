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
var import_config3 = require("dotenv/config");
var import_core2 = require("@keystone-6/core");

// schema.ts
var import_config = require("dotenv/config");
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_cloudinary = require("@keystone-6/cloudinary");
var import_fields = require("@keystone-6/core/fields");
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
      })
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
var sessionSecret = process.env.SESSION_SECRET;
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
    session
  })
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
