import Link from 'next/link';
import Checkout from '../components/Checkout';
import {
  CheckoutItemStyles,
  CheckoutStyles,
} from '../components/styles/CheckoutStyles';
import { useUser } from '../components/User';
import calculateTotalPrice from '../lib/calculateTotalPrice';
import formatMoney from '../lib/formatMoney';

export function CheckoutItems({ cartItems }) {
  const { product } = cartItems;
  console.log(product);
  return (
    <CheckoutItemStyles>
      <img src={product.photo.image.publicUrlTransformed} alt={product.name} />
      <h1>{product.name}</h1>
      <p>
        {cartItems.quantity}&times;{formatMoney(product.price)}
      </p>
      <p>{formatMoney(product.price * cartItems.quantity)}</p>
    </CheckoutItemStyles>
  );
}

export default function CheckoutPage() {
  const user = useUser();
  const cartItems = user?.cart;

  if (cartItems.length === 0) {
    return (
      <p>
        Whoops, it looks like you don't have anything to checkout.
        <Link href="/products">
          Click here to add some items to your cart first
        </Link>
      </p>
    );
  }

  if (user) {
    return (
      <CheckoutStyles>
        {cartItems.map((item) => (
          <CheckoutItems cartItems={item} key={item.id} />
        ))}
        <p>Total: {formatMoney(calculateTotalPrice(cartItems))}</p>
        <Checkout />
      </CheckoutStyles>
    );
  }
}
