import Products from '../components/Products';
import useProductsCount from '../components/ProductsCount';

export default function ProductsPage() {
  const count = useProductsCount();
  return <Products count={count} />;
}
