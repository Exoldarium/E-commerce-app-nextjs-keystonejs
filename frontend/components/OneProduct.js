import { gql, useQuery } from '@apollo/client';
import { ErrorMessageStyles } from './styles/ErrorMessageStyles';
import { OneProductStyles } from './styles/OneProductStyles';

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
  console.log(product);

  if (loading) return <ErrorMessageStyles>Loading...</ErrorMessageStyles>;
  if (error)
    return <ErrorMessageStyles>Error: {error.message}</ErrorMessageStyles>;

  return (
    <OneProductStyles>
      <div>
        <img
          src={product.photo.image.publicUrlTransformed}
          alt={product.photo.altText}
        />
      </div>
      <div>
        <p>{product.name}</p>
        <p>{product.description}</p>
        <p>{product.price}</p>
      </div>
    </OneProductStyles>
  );
}
