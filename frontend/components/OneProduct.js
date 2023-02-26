import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import formatMoney from '../lib/formatMoney';
import { ErrorMessageStyles } from './styles/ErrorMessageStyles';
import { OneProductStyles } from './styles/OneProductStyles';

// ADD: add to cart button

export const ONE_PRODUCT_QUERY = gql`
  query ONE_PRODUCT_QUERY($id: ID!) {
    product(where: { id: $id }) {
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

export default function OneProduct({ id }) {
  const { data, loading, error } = useQuery(ONE_PRODUCT_QUERY, {
    variables: {
      id,
    },
  });
  const product = data?.product;

  if (loading) return <ErrorMessageStyles>Loading...</ErrorMessageStyles>;
  if (error)
    return <ErrorMessageStyles>Error: {error.message}</ErrorMessageStyles>;

  return (
    <OneProductStyles>
      <Head>
        <title> 56 Sugar Gumpaste || {product.name}</title>
      </Head>
      <img src={product.photo.image.publicUrlTransformed} alt={product.name} />
      <div className="product-info">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p className="product-price">{formatMoney(product.price)}</p>
      </div>
    </OneProductStyles>
  );
}
