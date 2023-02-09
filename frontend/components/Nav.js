import Link from 'next/link';
import { NavStyles } from './styles/NavStyles';

export default function Nav() {
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      <Link href="/orders">Orders</Link>
      <Link href="/account">Account</Link>
      <Link href="/signin">Sign In</Link>
    </NavStyles>
  );
}
