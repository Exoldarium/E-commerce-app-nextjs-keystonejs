import { useSetState } from '../lib/stateProvider';

export default function AddToCart() {
  const { toggleCart } = useSetState();
  return (
    <button type="button" onClick={toggleCart}>
      Add to cart
    </button>
  );
}
