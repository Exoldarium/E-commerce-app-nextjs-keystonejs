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

export default function Products({ page }) {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      // products on the first page
      take: productsPerPage,
      // skip the products based on page number
      skip: page * productsPerPage - productsPerPage,
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
    </ProductStyles>
  );
}
