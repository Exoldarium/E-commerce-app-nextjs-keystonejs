import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSetState } from '../lib/stateProvider';
import { MobileNavStyles, NavStyles } from './styles/NavStyles';
import { useUser, USER_QUERY } from './User';

export const SIGNOUT_MUTATION = gql`
  mutation SIGNIN_MUTATION {
    endSession
  }
`;

export default function Nav({ active, userMenu }) {
  const { closeCart, toggleUserMenu, toggleMenu } = useSetState();
  const [signout, { data }] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: USER_QUERY }],
  });
  const user = useUser();
  const router = useRouter();

  function handleSignOut() {
    signout();
    router.push('/products');
  }

  // if user is logged in
  if (user)
    return (
      <>
        <NavStyles onClick={closeCart} userMenu={userMenu}>
          <h1>
            Logged in as <br />
            {user.name}
          </h1>
          <div onClick={toggleUserMenu}>
            <Link href="/account">Account</Link>
            <Link href="/orders">Order History</Link>
            <Link href="/manage">Manage</Link>
            <Link href="/help">Help</Link>
            <Link href="/terms">Terms</Link>
          </div>
          <button type="button" onClick={handleSignOut}>
            Sign Out
          </button>
        </NavStyles>
        <MobileNavStyles active={active}>
          <h1>
            Logged in as <br />
            {user.name}
          </h1>
          <div onClick={toggleMenu}>
            <Link href="/account">Account</Link>
            <Link href="/products">Products</Link>
            <Link href="/orders">Order History</Link>
            <Link href="/manage">Manage</Link>
            <Link href="/help">Help</Link>
            <Link href="/terms">Terms</Link>
            <button type="button" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        </MobileNavStyles>
      </>
    );

  // if there's no user
  if (user === null)
    return (
      <MobileNavStyles active={active}>
        <Link href="/products">Products</Link>
        <Link href="/signin">Sign In</Link>
        <Link href="/help">Help</Link>
        <Link href="/terms">Terms</Link>
      </MobileNavStyles>
    );
}
