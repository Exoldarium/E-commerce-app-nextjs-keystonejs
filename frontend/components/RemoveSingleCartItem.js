import { gql, useMutation } from '@apollo/client';
import { CartButtonStyles } from './styles/ButtonStyles';
import { USER_QUERY } from './User';

export const REMOVE_SINGLE_CART_ITEM_MUTATION = gql`
  mutation REMOVE_SINGLE_CART_ITEM_MUTATION($id: ID!) {
    removeFromCart(productId: $id) {
      id
    }
  }
`;

export default function RemoveSingleCartItem({ id, quantity }) {
  const [removeFromCart, { data, loading, error }] = useMutation(
    REMOVE_SINGLE_CART_ITEM_MUTATION,
    {
      variables: {
        id,
      },
      refetchQueries: [{ query: USER_QUERY }],
    }
  );

  return (
    <button
      type="button"
      onClick={removeFromCart}
      aria-disabled={quantity <= 1}
    >
      -
    </button>
  );
}
