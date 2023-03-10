import Link from 'next/link';
import calculateTotalPrice from '../lib/calculateTotalPrice';
import formatMoney from '../lib/formatMoney';
import { useSetState } from '../lib/stateProvider';
import AddSingleCartItem from './AddSingleCartItem';
import RemoveFromCart from './RemoveFromCart';
import RemoveSingleCartItem from './RemoveSingleCartItem';
import { CartMenuPageStyles, CartSliderStyles } from './styles/CartStyles';
import { useUser } from './User';
// TODO
// change input for cart amount, should be a paragraph
// add stock and a message if the request is higher than stock (max amount of products available)

export function CartItem({ cartItem }) {
  const { product } = cartItem;
  const { setAmount } = useSetState();

  return (
    <CartMenuPageStyles>
      <div className="imageInfo">
        <img
          src={product.photo.image.publicUrlTransformed}
          alt={product.name}
        />
        <Link href={`/product/${product.id}`}>
          <h1>{product.name}</h1>
        </Link>
      </div>
      <div className="sliderStyles">
        <div>
          <RemoveSingleCartItem id={product.id} quantity={cartItem.quantity} />
          <input
            type="text"
            name="number"
            min="1"
            value={cartItem.quantity}
            onChange={() => setAmount(cartItem.quantity)}
            inputMode="numeric"
          />
          <AddSingleCartItem id={product.id} />
        </div>
        <p>Price: {formatMoney(product.price * cartItem.quantity)}</p>
      </div>
      <RemoveFromCart id={cartItem.id} />
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
            <Link href="/checkout">Go to payment</Link>
          </p>
          <p>
            <Link href="/cart">Go to cart</Link>
          </p>
        </div>
        {cartItems.map((cartItem) => (
          <CartItem cartItem={cartItem} key={cartItem.id} />
        ))}
        <p>Total: {formatMoney(calculateTotalPrice(cartItems))}</p>
      </CartSliderStyles>
    );
  }
}
