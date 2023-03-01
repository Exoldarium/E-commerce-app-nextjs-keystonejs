import { gql, useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';
import formatMoney from '../lib/formatMoney';
import useForm from '../lib/useForm';
import { ALL_PRODUCTS_QUERY } from './Products';
import RemoveFromCart from './RemoveFromCart';
import { CartPageStyles, CartStyles } from './styles/CartStyles';
import { USER_QUERY, useUser } from './User';

export const UPDATE_CART_ITEM_MUTATION = gql`
  mutation UPDATE_CART_ITEM_MUTATION($quantity: Int, $id: ID!) {
    updateCartItem(data: { quantity: $quantity }, where: { id: $id }) {
      quantity
    }
  }
`;

export function CartItem({ cartItem }) {
  const { product } = cartItem;
  const { inputs, handleInputs } = useForm({
    quantity: '',
  });
  const [update, { data, loading, error }] = useMutation(
    UPDATE_CART_ITEM_MUTATION,
    {
      variables: {
        quantity: cartItem.quantity,
        id: cartItem.id,
      },
      refetchQueries: [{ query: USER_QUERY }],
    }
  );
  console.log(inputs);

  async function handleSubmit() {
    const res = await update().catch(console.error);
  }
  return (
    <CartPageStyles>
      <img src={product.photo.image.publicUrlTransformed} alt={product.name} />
      <h1>{product.name}</h1>
      <div className="cartPageInfo">
        <p>Price: {formatMoney(product.price * cartItem.quantity)}</p>
        <div>
          <label htmlFor="number">
            <button type="button" onClick={() => cartItem.quantity + 1}>
              +
            </button>
          </label>
          <input
            type="text"
            name="quantity"
            min="1"
            inputMode="numeric"
            placeholder="1"
            value={cartItem.quantity}
            onChange={handleSubmit}
            // onSubmit={handleSubmit}
          />
          <label htmlFor="number">
            <button type="button" onClick={() => cartItem.quantity - 1}>
              -
            </button>
          </label>
        </div>
        <RemoveFromCart id={cartItem.id} />
      </div>
    </CartPageStyles>
  );
}

export default function Cart() {
  const user = useUser();
  const { data } = useQuery(ALL_PRODUCTS_QUERY);
  console.log({ data });
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
