import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import Link from 'next/link';
import { ordersPerPage } from '../config';
import DeleteProduct from './DeleteProduct';
import { ErrorMessageStyles } from './styles/ErrorMessageStyles';
import { ManagePageStyles } from './styles/ManagePageStyles';
import UpdateProductPhoto from './UpdateProductPhoto';
import { useUser } from './User';

const MANAGE_PRODUCTS_QUERY = gql`
  query MANAGE_PRODUCTS_QUERY($id: ID, $skip: Int! = 0, $take: Int) {
    user(where: { id: $id }) {
      id
      products(skip: $skip, take: $take) {
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
`;

export default function ManageProducts() {
  const user = useUser();
  const userId = user?.id;
  const { data, loading, error, fetchMore } = useQuery(MANAGE_PRODUCTS_QUERY, {
    variables: {
      id: userId,
      take: ordersPerPage,
      skip: 0,
    },
  });
  const products = data?.user?.products;
  const productsLength = data?.user?.products?.length <= 1;
  console.log(products);

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
          <a className="createProductLink">Create a new product</a>
        </Link>
        {products?.map((product) => (
          <div key={product.id}>
            <img
              src={product.photo.image.publicUrlTransformed}
              alt={product.description}
            />
            <p>{product.name}</p>
            <Link
              href={{
                pathname: 'updateProductPhoto',
                query: { id: product.id },
              }}
            >
              Update Photo
            </Link>
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
        <button
          type="button"
          className="loadMoreButton"
          onClick={async function () {
            await fetchMore({
              variables: {
                skip: products?.length,
              },
            });
          }}
        >
          Load More
        </button>
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
