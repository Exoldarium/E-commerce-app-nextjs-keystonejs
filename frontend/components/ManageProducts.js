import Link from 'next/link';
import { ErrorMessageStyles } from './styles/ErrorMessageStyles';
import { ManagePageStyles } from './styles/ManagePageStyles';
import UpdateProduct from './UpdateProduct';
import { useUser } from './User';

export default function ManageProducts() {
  const user = useUser();
  const products = user?.products;
  console.log(products);
  if (user) {
    return (
      <ManagePageStyles>
        {/* <div className="orderInfo">
          <p className="ref">Name</p>
          <p className="date">Date</p>
          <p className="total">Total Price</p>
        </div> */}
        <Link href="/create">Create new product</Link>
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
