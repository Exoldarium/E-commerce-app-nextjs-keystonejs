import Link from 'next/link';
import PropTypes from '../node_modules/prop-types/prop-types';
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
    </ProductStyles>
  );
}

Product.propTypes = {
  product: PropTypes.object,
};
