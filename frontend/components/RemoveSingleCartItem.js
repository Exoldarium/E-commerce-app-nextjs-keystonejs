import { gql, useMutation } from '@apollo/client';
import { useSetState } from '../lib/stateProvider';
import { USER_QUERY } from './User';

export const REMOVE_SINGLE_CART_ITEM_MUTATION = gql`
  mutation REMOVE_SINGLE_CART_ITEM_MUTATION($id: ID!) {
    removeFromCart(productId: $id) {
      id
    }
  }
`;

export default function RemoveSingleCartItem({ id }) {
  const { isCartOpen, setIsCartOpen } = useSetState();
  const [removeFromCart, { data, loading, error }] = useMutation(
    REMOVE_SINGLE_CART_ITEM_MUTATION,
    {
      variables: {
        id,
      },
      refetchQueries: [{ query: USER_QUERY }],
    }
  );

  async function handleClick() {
    const res = await removeFromCart();
    // setIsCartOpen(true);
  }

  return (
    <button type="button" onClick={handleClick}>
      Remove from cart
    </button>
  );
}
