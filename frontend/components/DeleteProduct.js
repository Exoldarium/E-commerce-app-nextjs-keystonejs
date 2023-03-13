import { gql, useMutation } from '@apollo/client';
import { USER_QUERY } from './User';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(where: { id: $id }) {
      id
    }
  }
`;

function update(cache, payload) {
  cache.evict({ id: payload.data.deleteProduct.id });
}

export default function DeleteProduct({ id }) {
  const [deleteProduct, { data, loading, error }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      variables: {
        id,
      },
      update,
      refetchQueries: [{ query: USER_QUERY }],
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
