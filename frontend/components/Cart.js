import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import calculateTotalPrice from '../lib/calculateTotalPrice';
import formatMoney from '../lib/formatMoney';
import { useSetState } from '../lib/stateProvider';
import AddSingleCartItem from './AddSingleCartItem';
import RemoveFromCart from './RemoveFromCart';
import RemoveSingleCartItem from './RemoveSingleCartItem';
import { CartPageStyles, CartStyles } from './styles/CartStyles';
import { useUser } from './User';
// TODO
// add stock and a message if the request is higher than stock (max amount of products available)

export function CartItem({ cartItem }) {
  const { product } = cartItem;
  // const [isAmount, setIsAmount] = useState('');
  const { setAmount } = useSetState();

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
            onChange={() => setAmount(cartItem.quantity)}
            className="quantityParagraph"
          >
            {cartItem.quantity}
          </p>
          <AddSingleCartItem id={product.id} />
        </div>
      </div>
      <RemoveFromCart id={cartItem.id} />
    </CartPageStyles>
  );
}

export default function Cart() {
  const user = useUser();
  const cartItems = user?.cart;
  const emptyCart = cartItems?.length === 0;

  // if there's no user
  if (!user) {
    <CartStyles>
      <p>
        <Link href="/signin">Click here to sign in if you'd like to shop!</Link>
      </p>
    </CartStyles>;
  }
  // if the user is logged in
  if (user) {
    return (
      <CartStyles>
        <Head>
          <title>Cart | 56 Sugar Gumpaste</title>
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
        <p>
          <Link href="/checkout">Go to payment</Link>
        </p>
      </CartStyles>
    );
  }
}
