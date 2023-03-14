import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import { OrderHistoryStyles } from '../components/styles/OrderStyles';
import { useUser } from '../components/User';
import { convertDate } from '../lib/convertDate';
import formatMoney from '../lib/formatMoney';

// TODO
// pagination

const ORDERS_QUERY = gql`
  query ORDERS_QUERY {
    authenticatedItem {
      ... on User {
        id
        orders {
          id
          charge
          date
          total
          items {
            id
            quantity
            price
          }
        }
      }
    }
  }
`;

export default function OrdersPage() {
  const user = useUser();
  const { data, loading, error } = useQuery(ORDERS_QUERY);
  const orders = data?.authenticatedItem?.orders;
  const orderLength = orders?.length <= 1;
  // TODO add a dropdown to display items
  if (user) {
    return (
      <OrderHistoryStyles>
        <Head>
          <title>Orders | Showing {orders?.length} orders</title>
          {orderLength && (
            <title>Orders | Showing {orders?.length} order</title>
          )}
        </Head>
        <div className="orderInfo">
          <p className="ref">Reference number</p>
          <p className="date">Date</p>
          <p className="total">Total Price</p>
        </div>
        {orders?.map((order) => (
          <div key={order.id}>
            <p className="chargeP">{order.charge}</p>
            <p>{convertDate(order.date)}</p>
            <p>{formatMoney(order.total)}</p>
          </div>
        ))}
      </OrderHistoryStyles>
    );
  }
}
