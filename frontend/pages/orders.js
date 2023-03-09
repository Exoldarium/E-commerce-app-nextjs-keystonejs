import Link from 'next/link';
import { OrderHistoryStyles } from '../components/styles/OrderStyles';
import { useUser } from '../components/User';
import { convertDate } from '../lib/convertDate';
import formatMoney from '../lib/formatMoney';

export default function OrdersPage() {
  const user = useUser();
  const orders = user?.orders;
  console.log(orders);
  // add a dropdown to display items
  if (user) {
    return (
      <OrderHistoryStyles>
        <div className="orderInfo">
          <p className="ref">Reference number</p>
          <p className="date">Date</p>
          <p className="total">Total Price</p>
        </div>
        {orders.map((order) => (
          <div key={order.id}>
            <p>{order.charge}</p>
            <p>{convertDate(order.date)}</p>
            <p>{formatMoney(order.total)}</p>
          </div>
        ))}
      </OrderHistoryStyles>
    );
  }
}
