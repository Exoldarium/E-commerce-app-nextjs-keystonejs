import { gql, useMutation } from '@apollo/client';

export const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(where: { id: $id }) {
      id
    }
  }
`;

function updateCache(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

export default function RemoveFromCart({ id }) {
  console.log(id);
  const [removeFromCart, { data, loading, error }] = useMutation(
    REMOVE_FROM_CART_MUTATION,
    {
      variables: { id },
    },
    updateCache
  );

  // function handleClick() {
  //   removeFromCart();
  //   updateCache();
  // }

  return (
    <button type="button" onClick={removeFromCart}>
      Remove
    </button>
  );
}
