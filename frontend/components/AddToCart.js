import { gql, useMutation, useQuery } from '@apollo/client';
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

  async function handleClick() {
    const res = await addToCart();
    setIsCartOpen(true);
    // try to use this id to get the cart item
    sessionStorage.setItem('itemId', JSON.stringify(res.data.addToCart.id));
    console.log(res);
  }

  return (
    <button type="button" onClick={handleClick}>
      Add to cart
    </button>
  );
}
