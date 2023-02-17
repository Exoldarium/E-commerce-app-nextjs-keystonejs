import Products from '../components/Products';
import useProductsCount from '../components/ProductsCount';
import Search from '../components/Search';

export default function ProductsPage() {
  const count = useProductsCount();
  return <Products count={count} />;
}
