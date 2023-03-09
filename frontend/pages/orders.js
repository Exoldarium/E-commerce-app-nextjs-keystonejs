import Link from 'next/link';
import { OrderHistoryStyles } from '../components/styles/OrderStyles';
import { useUser } from '../components/User';

export default function OrdersPage() {
  const user = useUser();
  const orders = user?.orders;
  console.log(orders);
  // add a dropdown to display items
  return (
    <OrderHistoryStyles>
      <div className="orderInfo">
        <p className="ref">Reference number</p>
        <p className="date">Date</p>
        <p className="total">Total Price</p>
      </div>
      {orders.map((order) => (
        <div>
          <p>{order.charge}</p>
          <p>{order.date}</p>
          <p>{order.total}</p>
        </div>
      ))}
    </OrderHistoryStyles>
  );
}
