import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import useForm from '../lib/useForm';
import { FormStyles } from './styles/FormStyles';
import { ErrorMessageStyles } from './styles/ErrorMessageStyles';
import { USER_QUERY, useUser } from './User';
import { ONE_PRODUCT_QUERY } from './OneProduct';

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $name: String
    $description: String
    $price: Int
    $stock: Int
    $id: ID!
    $status: String
  ) {
    updateProduct(
      where: { id: $id }
      data: {
        name: $name
        description: $description
        price: $price
        stock: $stock
        status: $status
      }
    ) {
      name
      description
      price
      stock
      id
    }
  }
`;

export default function UpdateProduct({ id }) {
  const user = useUser();
  const { data, error, loading } = useQuery(ONE_PRODUCT_QUERY, {
    variables: {
      id,
    },
  });
  // grab the specific product details and pass them as our values
  // so that the inputs show the current product values
  const { inputs, handleInputs } = useForm(data?.product);
  const [
    updateProduct,
    {
      data: updateProductData,
      error: updateProductError,
      loading: updateProductLoading,
    },
  ] = useMutation(UPDATE_PRODUCT_MUTATION, {
    variables: {
      id,
      name: inputs.name,
      description: inputs.description,
      price: inputs.price,
      stock: inputs.stock,
    },
    refetchQueries: [{ query: USER_QUERY }],
  });
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await updateProduct().catch((err) => console.error(err));
    router.push(`/product/${data?.product.id}`);
  }

  if (user) {
    return (
      <FormStyles onSubmit={handleSubmit}>
        {updateProductError && (
          <ErrorMessageStyles>
            {updateProductError && updateProductError.message}
          </ErrorMessageStyles>
        )}
        <fieldset
          disabled={updateProductLoading}
          aria-busy={updateProductLoading}
        >
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
            className="descriptionInput"
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
            required
          />
          <label htmlFor="price">Price in cents</label>
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
        <button type="submit" disabled={updateProductLoading}>
          Update Product
        </button>
      </FormStyles>
    );
  }
}
