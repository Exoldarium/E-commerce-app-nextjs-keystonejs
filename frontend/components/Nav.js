import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import { useState } from 'react';
import { MobileNavStyles } from './styles/MobileNavStyles';
import { NavStyles } from './styles/NavStyles';
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
        <div className={`mobileNavMenu ${active ? 'active' : ''}`}>
          <MobileNavStyles onClick={handleActive}>
            <Link href="/products">Products</Link>
            <Link href="/orders">Orders</Link>
            <Link href="/account">Account</Link>
            <button type="button" onClick={signout}>
              Sign Out
            </button>
          </MobileNavStyles>
        </div>
      </>
    );
  if (user === null)
    return (
      <>
        <NavStyles>
          <Link href="/products">Products</Link>
          <Link href="/signin">Sign In</Link>
        </NavStyles>
        <div className={`mobileNavMenu ${active ? 'active' : ''}`}>
          <MobileNavStyles onClick={handleActive}>
            <Link href="/products">Products</Link>
            <Link href="/signin">Sign In</Link>
          </MobileNavStyles>
        </div>
      </>
    );
}
