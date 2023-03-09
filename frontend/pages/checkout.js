import Head from 'next/head';
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
  return (
    <CheckoutItemStyles>
      <img src={product.photo.image.publicUrlTransformed} alt={product.name} />
      <h1>
        <Link href={`/product/${product.id}`}>
          <a>{product.name}</a>
        </Link>
      </h1>
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
      <CheckoutStyles>
        <p className="errorParagraph">
          <Link href="/products">
            Whoops, it looks like you don't have anything to checkout. Click
            here to add some items to your cart first
          </Link>
        </p>
      </CheckoutStyles>
    );
  }

  if (user) {
    return (
      <CheckoutStyles>
        <Head>
          <title>Checkout | 56 Sugar Gumpaste</title>
        </Head>
        {cartItems.map((item) => (
          <CheckoutItems cartItems={item} key={item.id} />
        ))}
        <p className="total">
          Total: {formatMoney(calculateTotalPrice(cartItems))}
        </p>
        <Checkout />
      </CheckoutStyles>
    );
  }
}
