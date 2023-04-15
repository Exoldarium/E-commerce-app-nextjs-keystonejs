import { gql, useMutation } from '@apollo/client';
import { useSetState } from '../lib/stateProvider';
import { CartButtonStyles } from './styles/ButtonStyles';
import { USER_QUERY } from './User';

// TODO
// checking if adding cart mutation without user is possible
// create cart item mutation should happen only through front end

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
  }

  return (
    <CartButtonStyles type="button" onClick={handleClick}>
      Add to cart
    </CartButtonStyles>
  );
}
