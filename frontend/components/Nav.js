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
  const { closeCart } = useSetState();
  const [signout, { data }] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: USER_QUERY }],
  });
  const user = useUser();
  const router = useRouter();
  console.log(userMenu);

  function handleSignOut() {
    signout();
    router.push('/products');
  }

  // if user is logged in
  if (user)
    return (
      <>
        <NavStyles onClick={closeCart} userMenu={userMenu}>
          <Link href="/orders">Order History</Link>
          <Link href="/account">Account</Link>
          <Link href="/manage">Manage</Link>
          <button type="button" onClick={handleSignOut}>
            Sign Out
          </button>
        </NavStyles>
        <MobileNavStyles active={active}>
          <Link href="/products">Products</Link>
          <Link href="/orders">Order History</Link>
          <Link href="/account">Account</Link>
          <Link href="/manage">Manage</Link>
          <button type="button" onClick={handleSignOut}>
            Sign Out
          </button>
        </MobileNavStyles>
      </>
    );

  // if there's no user
  if (user === null)
    return (
      <MobileNavStyles active={active}>
        <Link href="/products">Products</Link>
        <Link href="/signin">Sign In</Link>
      </MobileNavStyles>
    );
}
