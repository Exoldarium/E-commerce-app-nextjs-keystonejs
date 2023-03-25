import { gql, useQuery } from '@apollo/client';
import Head from 'next/head';
import { useState } from 'react';
import { OrderHistoryStyles } from '../components/styles/OrderStyles';
import { useUser } from '../components/User';
import { ordersPerPage } from '../config';
import { convertDate } from '../lib/convertDate';
import formatMoney from '../lib/formatMoney';

const ORDERS_QUERY = gql`
  query ORDERS_QUERY($id: ID, $skip: Int! = 0, $take: Int) {
    user(where: { id: $id }) {
      id
      orders(skip: $skip, take: $take) {
        id
        charge
        date
        total
        items {
          name
          id
          quantity
          price
        }
      }
    }
  }
`;

export default function OrdersPage() {
  const [isDropdown, setDropdown] = useState();
  const user = useUser();
  const userId = user?.id;
  const { data, loading, error, fetchMore } = useQuery(ORDERS_QUERY, {
    variables: {
      id: userId,
      take: ordersPerPage,
      skip: 0,
    },
  });
  const orders = data?.user?.orders;
  const orderLength = orders?.length <= 1;

  function handleClick(e) {
    setDropdown(e.target.id);
    if (isDropdown === e.target.id) {
      setDropdown('');
    }
  }

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
        {orders?.map((order, i) => (
          <div key={order.id} className="allOrders">
            <div className="productOrders">
              <button type="button" id={order.id} onClick={handleClick}>
                V
              </button>
              <p className="chargeP">{order.charge}</p>
              <p className="dateP">{convertDate(order.date)}</p>
              <p className="moneyP">{formatMoney(order.total)}</p>
            </div>
            <div
              id={order.id}
              className={`orderItems ${
                isDropdown === order.id ? 'active' : ''
              }`}
            >
              {order.items.map((item) => (
                <div key={item.id}>
                  <p>Product: {item.name}</p>
                  <p>&times; {item.quantity}</p>
                  <p>Price: {formatMoney(item.price)}</p>
                </div>
              ))}
            </div>
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
