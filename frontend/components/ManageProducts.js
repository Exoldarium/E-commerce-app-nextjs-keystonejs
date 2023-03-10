import { ManagePageStyles } from './styles/ManagePageStyles';
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
        {products.map((product) => (
          <div key={product.id}>
            <img
              src={product.photo.image.publicUrlTransformed}
              alt={product.description}
            />
            <p>{product.name}</p>
          </div>
        ))}
      </ManagePageStyles>
    );
  }
}
