import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import useForm from '../lib/useForm';
import { ALL_PRODUCTS_QUERY } from './Products';
import { ErrorMessageStyles } from './styles/ErrorMessageStyles';
import { FormStyles } from './styles/FormStyles';
import { USER_QUERY } from './User';

const UPDATE_PHOTO_MUTATION = gql`
  mutation UPDATE_PHOTO_MUTATION($image: Upload, $id: ID!, $name: String) {
    updateProduct(
      where: { id: $id }
      data: {
        photo: { create: { image: $image, altText: $name } }
        name: $name
      }
    ) {
      name
      id
    }
  }
`;

export default function UpdateProductPhoto({ id }) {
  const { inputs, handleInputs } = useForm({
    name: '',
    image: '',
  });
  const [updatePhoto, { data, loading, error }] = useMutation(
    UPDATE_PHOTO_MUTATION,
    {
      variables: {
        id,
        image: inputs.image,
      },
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );
  const productId = data?.updateProduct?.id;
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await updatePhoto().catch((err) => console.error(err));
    router.push({ pathname: `/product/${res?.data?.updateProduct.id}` });
  }

  return (
    <FormStyles onSubmit={handleSubmit}>
      {error && (
        <ErrorMessageStyles>{error && error.message}</ErrorMessageStyles>
      )}
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="photo">Photo</label>
        <input
          type="file"
          name="image"
          id="image"
          placeholder="Image"
          onChange={handleInputs}
          required
        />
      </fieldset>
      <button type="submit" disabled={loading}>
        Update Photo
      </button>
    </FormStyles>
  );
}
