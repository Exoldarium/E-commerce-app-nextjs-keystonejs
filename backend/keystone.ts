import 'dotenv/config';
import { config, graphql } from '@keystone-6/core';
import { lists } from './schema';
import { withAuth, session } from './auth';
import { insertSeedData } from './seed-data';
import { extendGraphqlSchema } from './mutations';

const database = process.env.DATABASE_URL!;

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL!],
        credentials: true,
      }
    },
    db: {
      provider: 'sqlite',
      url: database,
      async onConnect(context) {
        console.log('Connected to the database!');
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(context.prisma);
        }
      },
    },
    lists,
    session,
    extendGraphqlSchema,
  })
);
