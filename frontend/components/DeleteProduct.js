import { gql, useMutation } from '@apollo/client';
import { ALL_PRODUCTS_QUERY } from './Products';
import { USER_QUERY } from './User';
// TODO
// fix delete mutation not updating manage products page

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(where: { id: $id }) {
      id
      name
    }
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteProduct));
}

export default function DeleteProduct({ id }) {
  const [deleteProduct, { data, loading, error }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      variables: {
        id,
      },
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
      update,
    }
  );
  function handleClick() {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct().catch((err) => window.alert(err.message));
    }
  }
  return (
    <button type="button" onClick={handleClick}>
      &times;
    </button>
  );
}
