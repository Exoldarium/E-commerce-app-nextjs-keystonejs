import CreateProduct from '../components/CreateProduct';
import { useUser } from '../components/User';

export default function CreateProductPage() {
  const user = useUser();
  if (user) {
    return <CreateProduct />;
  }
}
