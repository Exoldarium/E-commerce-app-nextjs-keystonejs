import { randomBytes } from 'crypto';
import { createAuth } from '@keystone-6/auth';
import { statelessSessions } from '@keystone-6/core/session';
import { sendPasswordResetEmail } from './lib/passwordResetMail';
import { permissionList } from './fields';

let sessionSecret = process.env.COOKIE_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== 'production') {
  sessionSecret = randomBytes(32).toString('hex');
}

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
  },
  sessionData: `id name email role { ${permissionList.join(' ')} }`,
  passwordResetLink: {
    async sendToken(args) {
      console.log(args);
      await sendPasswordResetEmail(args.token, args.identity)
    }
  }
});

const sessionMaxAge = 60 * 60 * 24 * 30;

const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret!,
});

export { withAuth, session };
