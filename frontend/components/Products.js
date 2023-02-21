import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import { productsPerPage } from '../config';
import { useSetState } from '../lib/stateProvider';
import Product from './Product';
import { ErrorMessageStyles } from './styles/ErrorMessageStyles';
import { PaginationStyles } from './styles/PaginationStyles';
import { ProductStyles } from './styles/ProductsStyles';

const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($take: Int, $skip: Int! = 0) {
    products(take: $take, skip: $skip) {
      id
      name
      description
      price
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Products({ count }) {
  const { data, fetchMore, loading, error } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      // initial number of products on page
      take: productsPerPage,
      // how many products we skip when loading more
      skip: 0,
    },
  });
  const products = data?.products;
  const productsLength = data?.products?.length;
  const hideButton = data?.products?.length < count;

  console.log({ data, error, loading });

  if (loading) return <ErrorMessageStyles>Loading...</ErrorMessageStyles>;
  if (error)
    return <ErrorMessageStyles>Error: {error.message}</ErrorMessageStyles>;

  return (
    <>
      <ProductStyles>
        <Head>
          <title>
            56 Sugar Gumpaste | Showing {productsLength} of {count} items
          </title>
        </Head>
        {products.map((product) => (
          <Product key={product.id} product={product} id={product.id} />
        ))}
      </ProductStyles>
      <PaginationStyles>
        {hideButton && (
          <button
            type="button"
            onClick={() =>
              fetchMore({
                variables: {
                  skip: productsLength,
                },
              })
            }
          >
            Load More
          </button>
        )}
        <p>
          Showing {productsLength} of {count} items
        </p>
      </PaginationStyles>
    </>
  );
}
