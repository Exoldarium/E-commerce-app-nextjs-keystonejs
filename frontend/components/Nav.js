import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import { MobileNavStyles, NavStyles } from './styles/NavStyles';
import { useUser, USER_QUERY } from './User';

export const SIGNOUT_MUTATION = gql`
  mutation SIGNIN_MUTATION {
    endSession
  }
`;

export default function Nav({ active, onClick }) {
  const [signout, { data }] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: USER_QUERY }],
  });
  const user = useUser();

  function handleActive() {
    onClick(!active);
  }

  // if user is logged in
  if (user)
    return (
      <>
        <NavStyles>
          <Link href="/products">Products</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <button type="button" onClick={signout}>
            Sign Out
          </button>
        </NavStyles>
        <MobileNavStyles onClick={handleActive} active={active}>
          <Link href="/products">Products</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <button type="button" onClick={signout}>
            Sign Out
          </button>
        </MobileNavStyles>
      </>
    );

  // if there's no user
  if (user === null)
    return (
      <>
        <NavStyles>
          <Link href="/products">Products</Link>
          <Link href="/signin">Sign In</Link>
        </NavStyles>
        <MobileNavStyles onClick={handleActive}>
          <Link href="/products">Products</Link>
          <Link href="/signin">Sign In</Link>
        </MobileNavStyles>
      </>
    );
}
