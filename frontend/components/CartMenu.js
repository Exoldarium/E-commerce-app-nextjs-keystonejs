import Link from 'next/link';
import formatMoney from '../lib/formatMoney';
import { useSetState } from '../lib/stateProvider';
import RemoveFromCart from './RemoveFromCart';
import { CartMenuPageStyles, CartSliderStyles } from './styles/CartStyles';
import { useUser } from './User';

export function CartItem({ cartItem }) {
  const { product } = cartItem;
  // we can use query prop to display cart items in a separate page
  // if it's just sliding menu use a separate styled components component
  return (
    <CartMenuPageStyles>
      <img src={product.photo.image.publicUrlTransformed} alt={product.name} />
      <h1>{product.name}</h1>
      <div className="sliderStyles">
        <div>
          <label htmlFor="number">
            <button type="button">+</button>
          </label>
          <input
            type="text"
            name="number"
            min="1"
            placeholder="1"
            inputMode="numeric"
          />
          <label htmlFor="number">
            <button type="button">-</button>
          </label>
        </div>
        <p>Price: {formatMoney(product.price)}</p>
        <RemoveFromCart id={cartItem.id} />
      </div>
    </CartMenuPageStyles>
  );
}

export default function CartMenu() {
  const user = useUser();
  const cartItems = user?.cart;
  const { isCartOpen, closeCart } = useSetState();
  console.log(user);

  // if the user is registered
  if (user) {
    return (
      <CartSliderStyles open={isCartOpen}>
        <button type="button" onClick={closeCart}>
          &times;
        </button>
        <div>
          <p>
            <Link href="/payment">Go to payment</Link>
          </p>
          <p>
            <Link href="/cart">Go to cart</Link>
          </p>
        </div>
        {cartItems.map((cartItem) => (
          <CartItem cartItem={cartItem} key={cartItem.id} />
        ))}
      </CartSliderStyles>
    );
  }
}