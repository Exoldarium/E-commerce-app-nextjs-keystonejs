import { gql, useQuery } from '@apollo/client';
import { productsPerPage } from '../config';
import Product from './Product';
import { ErrorMessageStyles } from './styles/ErrorMessageStyles';
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
  console.log({ data, error, loading });

  if (loading) return <ErrorMessageStyles>Loading...</ErrorMessageStyles>;
  if (error)
    return <ErrorMessageStyles>Error: {error.message}</ErrorMessageStyles>;

  return (
    <ProductStyles>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
      <button
        type="button"
        onClick={() =>
          fetchMore({
            variables: {
              skip: products.length,
            },
          })
        }
      >
        Load More || Showing {products.length} of {count} items
      </button>
    </ProductStyles>
  );
}
