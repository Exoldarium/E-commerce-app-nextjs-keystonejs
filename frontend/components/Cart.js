import { CartPageStyles, CartStyles } from './styles/CartStyles';
import { useUser } from './User';

export function CartItem({ cartItem }) {
  const { product } = cartItem;
  return (
    <CartPageStyles>
      <img src={product.photo.image.publicUrlTransformed} alt={product.name} />
      <h1>{product.name}</h1>
      <div>
        <p>Price: {product.price}</p>
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
    </CartPageStyles>
  );
}

export default function Cart() {
  const user = useUser();
  const cartItems = user?.cart;
  console.log(cartItems);

  // if the user is logged in
  if (user) {
    return (
      <CartStyles>
        {cartItems.map((cartItem) => (
          <CartItem cartItem={cartItem} key={cartItem.id} />
        ))}
      </CartStyles>
    );
  }
}
