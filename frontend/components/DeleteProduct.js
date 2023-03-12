import { gql, useMutation } from '@apollo/client';
import { USER_QUERY } from './User';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(where: { id: $id }) {
      id
    }
  }
`;

export default function DeleteProduct({ id }) {
  const [deleteProduct, { data, loading, error }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      variables: {
        id,
      },
      refetchQueries: [{ query: USER_QUERY }],
    }
  );
  return (
    <button type="button" onClick={() => deleteProduct()}>
      Delete
    </button>
  );
}
