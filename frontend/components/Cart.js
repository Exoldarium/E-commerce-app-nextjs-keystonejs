import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import calculateTotalPrice from '../lib/calculateTotalPrice';
import formatMoney from '../lib/formatMoney';
import AddSingleCartItem from './AddSingleCartItem';
import Checkout from './Checkout';
import RemoveFromCart from './RemoveFromCart';
import RemoveSingleCartItem from './RemoveSingleCartItem';
import { CartPageStyles, CartStyles } from './styles/CartStyles';
import { useUser } from './User';

export function CartItem({ cartItem }) {
  const { product } = cartItem;
  const [isAmount, setIsAmount] = useState('');

  return (
    <CartPageStyles>
      <img src={product.photo.image.publicUrlTransformed} alt={product.name} />
      <Link href={`/product/${product.id}`}>
        <h1>{product.name}</h1>
      </Link>
      <div className="cartPageInfo">
        <p>{formatMoney(product.price * cartItem.quantity)}</p>
        <div className="quantityDiv">
          <RemoveSingleCartItem id={product.id} quantity={cartItem.quantity} />
          <p
            onChange={() => setIsAmount(cartItem.quantity)}
            className="quantityParagraph"
          >
            {cartItem.quantity}
          </p>
          <AddSingleCartItem id={product.id} />
        </div>
        <RemoveFromCart id={cartItem.id} />
      </div>
    </CartPageStyles>
  );
}

export default function Cart() {
  const user = useUser();
  const cartItems = user?.cart;
  const emptyCart = cartItems?.length === 0;

  // if the user is logged in
  if (!user) {
    <CartStyles>
      <p>
        <Link href="/signin">Click here to sign in if you'd like to shop!</Link>
      </p>
    </CartStyles>;
  }
  if (user) {
    return (
      <CartStyles>
        <Head>
          <title>Add cart amount here</title>
        </Head>
        {emptyCart && (
          <p>
            Your cart is empty!
            <Link href="/products"> Go ahead and add some items!</Link>
          </p>
        )}
        {cartItems.map((cartItem) => (
          <CartItem cartItem={cartItem} key={cartItem.id} />
        ))}
        <p>Total: {formatMoney(calculateTotalPrice(cartItems))}</p>
        <Checkout />
      </CartStyles>
    );
  }
}
