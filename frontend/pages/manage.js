// TODO
// add a page that will allow user to manage their products
// the page should display all products that a user currently has
// the page should have update, create and delete options for products

import Link from 'next/link';
import styled from 'styled-components';
import ManageProducts from '../components/ManageProducts';
import { useUser } from '../components/User';

const ManagePageStyles = styled.div`
  padding-top: 25%;
`;

export default function ManageProductsPage() {
  const user = useUser();
  if (!user) {
    <ManagePageStyles>
      <p style={{ paddingTop: 500 }}>
        You don't have permission to view this page.
        <Link href="/products">Click here to go back to home page</Link>
      </p>
      ;
    </ManagePageStyles>;
  }
  return <ManageProducts />;
}
