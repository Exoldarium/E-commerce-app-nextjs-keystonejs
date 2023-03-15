import { gql, useQuery } from '@apollo/client';
import { productsPerPage } from '../config';
import { useSetState } from '../lib/stateProvider';
import CartMenu from './CartMenu';
import Product from './Product';
import { ErrorMessageStyles } from './styles/ErrorMessageStyles';
import { ProductStyles } from './styles/ProductsStyles';

export const ALL_PRODUCTS_QUERY = gql`
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

export default function Products({ page }) {
  const { isCartOpen, closeCart } = useSetState();
  const { data, loading, error } = useQuery(ALL_PRODUCTS_QUERY, {
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
    variables: {
      take: productsPerPage,
      skip: page * productsPerPage - productsPerPage,
    },
  });
  const products = data?.products;

  console.log({ data, error, loading });

  if (loading) return <ErrorMessageStyles>Loading...</ErrorMessageStyles>;
  if (error)
    return <ErrorMessageStyles>Error: {error.message}</ErrorMessageStyles>;

  return (
    <>
      <ProductStyles open={isCartOpen}>
        {products.map((product) => (
          <Product key={product.id} product={product} id={product.id} />
        ))}
      </ProductStyles>
      <CartMenu />
    </>
  );
}
