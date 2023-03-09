import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import { ErrorMessageStyles } from '../../components/styles/ErrorMessageStyles';
import { OrderStyles } from '../../components/styles/OrderStyles';
import formatMoney from '../../lib/formatMoney';

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
  console.log(order);
  console.log(query);
  return (
    <>
      <Head>
        <title>56 Sugar Gumpaste</title>
      </Head>
      <OrderStyles>
        <h1>Order charge id: {order.charge}</h1>
        {order.items.map((item) => (
          <div className="orderItems">
            <img
              src={item.photo.image.publicUrlTransformed}
              alt={item.description}
            />
            <p className="name">{item.name}</p>
            <p>&times;{item.quantity}</p>
            <p>{formatMoney(item.price)}</p>
          </div>
        ))}
        <p className="total">Total: {formatMoney(order.total)}</p>
      </OrderStyles>
    </>
  );
}
