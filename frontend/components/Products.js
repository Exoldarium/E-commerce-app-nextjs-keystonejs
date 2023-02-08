import { gql, useQuery } from '@apollo/client';

const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    products {
      id
      name
      description
      price
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Products() {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);
  console.log({ data, error, loading });

  return (
    <div>
      {data.products.map((product) => (
        <p>{product.id}</p>
      ))}
    </div>
  );
}
