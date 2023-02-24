import { gql, useMutation } from '@apollo/client';
import { USER_QUERY } from './User';

export const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(where: { id: $id }) {
      id
    }
  }
`;

function update(cache, payload) {
  cache.evict({ id: payload.data.deleteCartItem.id });
}

export default function RemoveFromCart({ id }) {
  const [removeFromCart, { data, loading, error }] = useMutation(
    REMOVE_FROM_CART_MUTATION,
    {
      variables: { id },
      update,
      refetchQueries: [{ query: USER_QUERY }],
    }
  );

  return (
    <button type="button" onClick={removeFromCart}>
      Remove
    </button>
  );
}
