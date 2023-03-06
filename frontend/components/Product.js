import Link from 'next/link';
import { useRouter } from 'next/router';
import AddToCart from './AddToCart';
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
      {!user && (
        <button type="button" onClick={() => router.push('/signin')}>
          Add to Cart
        </button>
      )}
    </ProductStyles>
  );
}
