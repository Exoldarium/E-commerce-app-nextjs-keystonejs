import { useMutation } from '@apollo/client';
import { ADD_TO_CART_MUTATION } from './AddToCart';
import { USER_QUERY } from './User';

export default function AddSingleCartItem({ id }) {
  const [addToCart, { data, loading, error }] = useMutation(
    ADD_TO_CART_MUTATION,
    {
      variables: {
        id,
      },
      refetchQueries: [{ query: USER_QUERY }],
    }
  );

  return (
    <button type="button" onClick={addToCart}>
      +
    </button>
  );
}
