import { gql, useMutation } from '@apollo/client';
import { useSetState } from '../lib/stateProvider';
import { USER_QUERY } from './User';

export const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
    }
  }
`;

export default function AddToCart({ id }) {
  const { isCartOpen, setIsCartOpen } = useSetState();
  const [addToCart, { data, loading, error }] = useMutation(
    ADD_TO_CART_MUTATION,
    {
      variables: {
        id,
      },
      refetchQueries: [{ query: USER_QUERY }],
    }
  );

  function handleClick() {
    addToCart();
    setIsCartOpen(true);
  }

  return (
    <button type="button" onClick={handleClick}>
      Add to cart
    </button>
  );
}
