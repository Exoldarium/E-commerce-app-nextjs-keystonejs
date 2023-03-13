import Head from 'next/head';
import Link from 'next/link';
import DeleteProduct from './DeleteProduct';
import { ErrorMessageStyles } from './styles/ErrorMessageStyles';
import { ManagePageStyles } from './styles/ManagePageStyles';
import { useUser } from './User';

export default function ManageProducts() {
  const user = useUser();
  const products = user?.products;
  const productsLength = products?.length <= 1;

  console.log(products);
  if (user) {
    return (
      <ManagePageStyles>
        <Head>
          <title>Manage | Showing {products?.length} items</title>
          {productsLength && (
            <title>Manage | Showing {products?.length} item</title>
          )}
        </Head>
        <Link href="/create">
          <a className="createProductLink">Create new product</a>
        </Link>
        {products.map((product) => (
          <div key={product.id}>
            <img
              src={product.photo.image.publicUrlTransformed}
              alt={product.description}
            />
            <p>{product.name}</p>
            <Link
              href={{
                pathname: 'update',
                query: { id: product.id },
              }}
            >
              Update Product
            </Link>
            <DeleteProduct id={product.id} />
          </div>
        ))}
      </ManagePageStyles>
    );
  }
  if (!user) {
    <ErrorMessageStyles>
      You don't have permission to view this page.
      <Link href="/products">Click here to go back to home page</Link>;
    </ErrorMessageStyles>;
  }
}
