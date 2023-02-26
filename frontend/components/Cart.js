import { gql } from '@apollo/client';
import Link from 'next/link';
import formatMoney from '../lib/formatMoney';
import RemoveFromCart from './RemoveFromCart';
import { CartPageStyles, CartStyles } from './styles/CartStyles';
import { useUser } from './User';

export function CartItem({ cartItem }) {
  const { product } = cartItem;
  return (
    <CartPageStyles>
      <img src={product.photo.image.publicUrlTransformed} alt={product.name} />
      <h1>{product.name}</h1>
      <div className="cartPageInfo">
        <p>Price: {formatMoney(product.price)}</p>
        <div>
          <label htmlFor="number">
            <button type="button">+</button>
          </label>
          <input
            type="text"
            name="number"
            min="1"
            inputMode="numeric"
            placeholder="1"
          />
          <label htmlFor="number">
            <button type="button">-</button>
          </label>
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

  // add if the user is logged out or not registered
  // if (!user) {

  // }

  // if the user is logged in
  if (user) {
    return (
      <CartStyles>
        {emptyCart && (
          <p>
            Your cart is empty!
            <Link href="/products"> Go ahead and add some items!</Link>
          </p>
        )}
        {cartItems.map((cartItem) => (
          <CartItem cartItem={cartItem} key={cartItem.id} />
        ))}
      </CartStyles>
    );
  }
}
