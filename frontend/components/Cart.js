import { useSetState } from '../lib/stateProvider';
import { CartSliderStyles } from './styles/CartStyles';
import { useUser } from './User';

export function CartItem() {
  return <div>I'm an item</div>;
}

export default function Cart() {
  const user = useUser();
  const { isCartOpen, closeCart } = useSetState();

  // if the user is registered
  if (user) {
    return (
      <CartSliderStyles open={isCartOpen}>
        <button type="button" onClick={closeCart}>
          &times;
        </button>
        <CartItem />
      </CartSliderStyles>
    );
  }
}
