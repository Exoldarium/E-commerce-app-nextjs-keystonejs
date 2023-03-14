import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import Link from 'next/link';
import DeleteProduct from './DeleteProduct';
import { ErrorMessageStyles } from './styles/ErrorMessageStyles';
import { ManagePageStyles } from './styles/ManagePageStyles';
import { useUser } from './User';
// TODO
// pagination

const MANAGE_PRODUCTS_QUERY = gql`
  query MANAGE_PRODUCTS_QUERY {
    authenticatedItem {
      ... on User {
        manageProducts: products {
          id
          name
          description
          photo {
            image {
              publicUrlTransformed
            }
          }
        }
      }
    }
  }
`;

export default function ManageProducts() {
  const user = useUser();
  const { data } = useQuery(MANAGE_PRODUCTS_QUERY);
  const products = data?.authenticatedItem?.manageProducts;
  const productsLength = data?.authenticatedItem?.manageProducts?.length <= 1;

  if (user) {
    return (
      <ManagePageStyles>
        <Head>
          <title>Manage | Showing {products?.length} items</title>
          {productsLength && (
            <title>Manage | Showing {products?.length} item</title>
          )}
        </Head>
        <Link href="/create">
          <a className="createProductLink">Create new product</a>
        </Link>
        {products.map((product) => (
          <div key={product.id}>
            <img
              src={product.photo.image.publicUrlTransformed}
              alt={product.description}
            />
            <p>{product.name}</p>
            <Link
              href={{
                pathname: 'update',
                query: { id: product.id },
              }}
            >
              Update Product
            </Link>
            <DeleteProduct id={product.id} />
          </div>
        ))}
      </ManagePageStyles>
    );
  }
  if (!user) {
    <ErrorMessageStyles>
      You don't have permission to view this page.
      <Link href="/products">Click here to go back to home page</Link>;
    </ErrorMessageStyles>;
  }
}
