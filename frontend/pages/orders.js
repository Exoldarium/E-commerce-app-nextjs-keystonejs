import { gql, useQuery } from '@apollo/client';
import { OrderHistoryStyles } from '../components/styles/OrderStyles';
import { useUser } from '../components/User';
import { ordersPerPage } from '../config';
import { convertDate } from '../lib/convertDate';
import formatMoney from '../lib/formatMoney';

const ORDERS_QUERY = gql`
  query ORDERS_QUERY($take: Int, $skip: Int! = 0) {
    orders(take: $take, skip: $skip) {
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
`;

export default function OrdersPage() {
  const user = useUser();
  const { data, loading, error, fetchMore } = useQuery(ORDERS_QUERY, {
    variables: {
      take: ordersPerPage,
      skip: 0,
    },
  });
  const orders = data?.orders;
  // TODO add a dropdown to display items
  if (user) {
    return (
      <OrderHistoryStyles>
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
        <button
          type="button"
          onClick={() =>
            fetchMore({
              variables: {
                skip: orders?.length,
              },
            })
          }
        >
          Load More
        </button>
      </OrderHistoryStyles>
    );
  }
}
