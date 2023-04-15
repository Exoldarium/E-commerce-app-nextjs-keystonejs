import Link from 'next/link';
import { useRouter } from 'next/router';
import formatMoney from '../lib/formatMoney';
import AddToCart from './AddToCart';
import { ProductStyles } from './styles/ProductStyles';
import { useUser } from './User';
import { useSetState } from '../lib/stateProvider';

export default function Product({ product }) {
  const user = useUser();
  const router = useRouter();
  const { isProductId, setProductId } = useSetState();

  function onClick(e) {
    setProductId(e.target.id);
  }

  return (
    <ProductStyles>
      <Link href={`/product/${product.id}`}>
        <img
          src={product.photo?.image?.publicUrlTransformed}
          alt={product.description}
        />
      </Link>
      <div>
        <div className="buttonDiv">
          <p>{product.name}</p>
          {user && <AddToCart id={product.id} />}
          {!user && (
            <button type="button" onClick={onClick} id={product.id}>
              Add to Cart
            </button>
          )}
        </div>
        <p className="priceParagraph">{formatMoney(product.price)}</p>
      </div>
    </ProductStyles>
  );
}
