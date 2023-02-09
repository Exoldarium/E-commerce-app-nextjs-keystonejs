import Link from 'next/link';
import { MobileNavStyles } from './styles/MobileNavStyles';

export default function MobileNav() {
  return (
    <MobileNavStyles>
      <Link href="/products">Products</Link>
      <Link href="/orders">Orders</Link>
      <Link href="/account">Account</Link>
      <Link href="/signin">Sign In</Link>
    </MobileNavStyles>
  );
}
