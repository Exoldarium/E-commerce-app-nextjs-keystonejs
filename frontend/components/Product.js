import Link from 'next/link';
import PropTypes from '../node_modules/prop-types/prop-types';

export default function Product({ product }) {
  return (
    <Link href={`/product/${product.id}`}>
      <div>
        <span key={product.id}>
          <img
            src={product.photo?.image?.publicUrlTransformed}
            alt={product.description}
          />
          <p key={product.id}>{product.name}</p>
        </span>
      </div>
    </Link>
  );
}

Product.propTypes = {
  product: PropTypes.object,
};
