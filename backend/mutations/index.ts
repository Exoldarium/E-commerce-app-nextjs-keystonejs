import { mergeSchemas } from '@graphql-tools/schema';
import type { GraphQLSchema } from 'graphql';
import addToCart from './addToCart';
import removeFromCart from './removeFromCart';
import checkout from './checkout';

// https://github.com/keystonejs/keystone/blob/main/examples/extend-graphql-schema-graphql-tools/schema.ts

const graphql = String.raw;

export const extendGraphqlSchema = (schema: GraphQLSchema) =>
  mergeSchemas({
    schemas: [schema],
    typeDefs: graphql`
      type Mutation {
        addToCart(productId: ID): CartItem
        removeFromCart(productId: ID): CartItem
        checkout(token: String!): Order
      }
    `,
    resolvers: {
      Mutation: {
        addToCart,
        removeFromCart,
        checkout,
      },
    },
  })