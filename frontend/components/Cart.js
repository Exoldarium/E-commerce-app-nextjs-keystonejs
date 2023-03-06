import Link from 'next/link';
import { useState } from 'react';
import formatMoney from '../lib/formatMoney';
import AddToCart from './AddToCart';
import RemoveFromCart from './RemoveFromCart';
import RemoveSingleCartItem from './RemoveSingleCartItem';
import { CartPageStyles, CartStyles } from './styles/CartStyles';
import { useUser } from './User';

export function CartItem({ cartItem }) {
  const { product } = cartItem;
  const [isAmount, setIsAmount] = useState('');
  console.log(cartItem);

  return (
    <CartPageStyles>
      <img src={product.photo.image.publicUrlTransformed} alt={product.name} />
      <h1>{product.name}</h1>
      <div className="cartPageInfo">
        <p>Price: {formatMoney(product.price * cartItem.quantity)}</p>
        <div>
          <label htmlFor="number">
            <RemoveSingleCartItem id={product.id} />
          </label>
          <input
            type="text"
            name="quantity"
            min="1"
            value={cartItem.quantity}
            onChange={() => setIsAmount(cartItem.quantity)}
          />
          <label htmlFor="number">
            <AddToCart id={product.id} />
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
