import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import useForm from '../lib/useForm';
import { ALL_PRODUCTS_QUERY } from './Products';
import { ErrorMessageStyles } from './styles/ErrorMessageStyles';
import { FormStyles } from './styles/FormStyles';
import { USER_QUERY } from './User';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $price: Int!
    $stock: Int
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        stock: $stock
        photo: { create: { image: $image, altText: $name } }
        status: "DRAFT"
      }
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function CreateProduct() {
  const { inputs, handleInputs, clearForm } = useForm({
    name: '',
    description: '',
    price: '',
    image: '',
    stock: '',
  });
  const [createProduct, { data, loading, error }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await createProduct().catch((err) => console.error(err));
    clearForm();
    router.push({
      pathname: `/product/${res?.data?.createProduct?.id}`,
    });
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
          className="uploadPhotoInput"
        />
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          value={inputs.name}
          onChange={handleInputs}
          required
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Description"
          value={inputs.description}
          onChange={handleInputs}
          required
        />
        <label htmlFor="description">Stock</label>
        <input
          type="number"
          name="stock"
          id="stock"
          placeholder="Stock"
          value={inputs.stock}
          onChange={handleInputs}
        />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          id="price"
          placeholder="Price"
          value={inputs.price}
          onChange={handleInputs}
          required
        />
      </fieldset>
      <button type="submit" disabled={loading}>
        Create Product
      </button>
    </FormStyles>
  );
}
