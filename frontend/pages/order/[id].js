import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import { ErrorMessageStyles } from '../../components/styles/ErrorMessageStyles';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(where: { id: $id }) {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

export default function SingleOrderPage({ query }) {
  const { data, error, loading } = useQuery(SINGLE_ORDER_QUERY, {
    variables: {
      id: query.id,
    },
  });

  if (loading) return <ErrorMessageStyles>Loading...</ErrorMessageStyles>;
  if (error)
    return <ErrorMessageStyles>Error: {error.message}</ErrorMessageStyles>;

  const { order } = data;

  return (
    <div>
      <Head>
        <title>56 Gumpaste {order.id}</title>
      </Head>
    </div>
  );
}
