import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AddToCart from './AddToCart';
import RemoveSingleCartItem from './RemoveSingleCartItem';
import { ProductStyles } from './styles/ProductStyles';
import { useUser } from './User';

export default function Product({ product }) {
  const user = useUser();
  const router = useRouter();

  return (
    <ProductStyles>
      <Link href={`/product/${product.id}`}>
        <img
          src={product.photo?.image?.publicUrlTransformed}
          alt={product.description}
          key={product.id}
        />
      </Link>
      <p key={product.id}>{product.name}</p>
      {user && <AddToCart id={product.id} />}
      <RemoveSingleCartItem id={product.id} />
      {!user && (
        <button type="button" onClick={() => router.push('/signin')}>
          Add to Cart
        </button>
      )}
      {/* add add to cart component that will be active if the user is not logged in, pass in the product id from above 
      create a cart object that will have our product info, and quantity and store in local storage
      when the user creates an account or logs in grab this info from local storage (id of the product and quantity)
      and create a cart item that matches that */}
      {/* this add to cart component should be a button that will create our cartItem, when clicked the cartItem is created and is automaticaly 
      mapped over into the cart */}
    </ProductStyles>
  );
}
