import Link from 'next/link';
import AddToCart from './AddToCart';
import { ProductStyles } from './styles/ProductStyles';

export default function Product({ product }) {
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
      <AddToCart id={product.id} />
    </ProductStyles>
  );
}
