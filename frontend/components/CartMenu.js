import Link from 'next/link';
import { useState } from 'react';
import calculateTotalPrice from '../lib/calculateTotalPrice';
import formatMoney from '../lib/formatMoney';
import { useSetState } from '../lib/stateProvider';
import AddSingleCartItem from './AddSingleCartItem';
import RemoveFromCart from './RemoveFromCart';
import RemoveSingleCartItem from './RemoveSingleCartItem';
import { CartMenuPageStyles, CartSliderStyles } from './styles/CartStyles';
import { useUser } from './User';

export function CartItem({ cartItem }) {
  const { product } = cartItem;
  const [isAmount, setIsAmount] = useState('');
  const maxAmount = cartItem.quantity >= product?.stock;

  return (
    <CartMenuPageStyles>
      <div className="imageInfo">
        <img
          src={product?.photo.image.publicUrlTransformed}
          alt={product?.name}
        />
        <Link href={`/product/${product?.id}`}>
          <h1>{product?.name}</h1>
        </Link>
      </div>
      <div className="sliderStyles">
        <div className="buttonAmountDiv">
          <RemoveSingleCartItem id={product?.id} quantity={cartItem.quantity} />
          <p
            onChange={() => setIsAmount(cartItem.quantity)}
            className="quantityParagraph"
          >
            {cartItem.quantity}
          </p>
          <AddSingleCartItem
            id={product?.id}
            stock={product?.stock}
            quantity={cartItem.quantity}
          />
        </div>
        <p>
          Price:
          <span className="priceSpan">
            {formatMoney(product?.price * cartItem.quantity)}
          </span>
        </p>
        <div className="pdiv">
          {maxAmount && <p className="maxAmountP">Max amount available</p>}
        </div>
      </div>
      <RemoveFromCart id={cartItem.id} />
    </CartMenuPageStyles>
  );
}

export default function CartMenu() {
  const { isCartOpen, closeCart, isProductId } = useSetState();
  const user = useUser();
  const cartItems = user?.cart;

  // if the user is registered
  if (user) {
    return (
      <CartSliderStyles open={isCartOpen}>
        <div className="cartLinks">
          <p>
            <Link href="/checkout">Payment</Link>
          </p>
          <p>
            <Link href="/cart">Cart</Link>
          </p>
          <button type="button" onClick={closeCart} className="closeCartButton">
            &times;
          </button>
        </div>
        <p className="totalParagraph">
          Total: {formatMoney(calculateTotalPrice(cartItems))}
        </p>
        {cartItems.map((cartItem) => (
          <CartItem cartItem={cartItem} key={cartItem.id} />
        ))}
      </CartSliderStyles>
    );
  }
}
