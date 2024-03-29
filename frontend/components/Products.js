import { gql, useQuery } from '@apollo/client';
import { productsPerPage } from '../config';
import { useSetState } from '../lib/stateProvider';
import CartMenu from './CartMenu';
import Product from './Product';
import { ErrorMessageStyles } from './styles/ErrorMessageStyles';
import { ProductsStyles } from './styles/ProductsStyles';
import { useUser } from './User';
import NoUserCartMenu from './NoUserCartMenu';

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($take: Int, $skip: Int! = 0) {
    products(take: $take, skip: $skip) {
      id
      name
      description
      price
      stock
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
  const user = useUser();
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
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('products', JSON.stringify(products));
  }

  // console.log({ data, error, loading });

  if (loading) return <ErrorMessageStyles>Loading...</ErrorMessageStyles>;
  if (error)
    return <ErrorMessageStyles>Error: {error.message}</ErrorMessageStyles>;

  return (
    <>
      <ProductsStyles open={isCartOpen}>
        {products.map((product) => (
          <Product key={product.id} product={product} id={product.id} />
        ))}
      </ProductsStyles>
      <CartMenu />
      <NoUserCartMenu />
    </>
  );
}
