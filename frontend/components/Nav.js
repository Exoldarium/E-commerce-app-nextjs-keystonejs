import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import { NavStyles } from './styles/NavStyles';
import { useUser, USER_QUERY } from './User';

const SIGNOUT_MUTATION = gql`
  mutation SIGNIN_MUTATION {
    endSession
  }
`;

export default function Nav() {
  const [signout, { data }] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: USER_QUERY }],
  });
  const user = useUser();

  if (user)
    return (
      <NavStyles>
        <Link href="/products">Products</Link>
        <Link href="/orders">Orders</Link>
        <Link href="/account">Account</Link>
        <button type="button" onClick={signout}>
          Sign Out
        </button>
      </NavStyles>
    );
  if (user === null)
    return (
      <NavStyles>
        <Link href="/products">Products</Link>
        <Link href="/orders">Orders</Link>
        <Link href="/account">Account</Link>
        <Link href="/signin">Sign In</Link>
      </NavStyles>
    );
}
