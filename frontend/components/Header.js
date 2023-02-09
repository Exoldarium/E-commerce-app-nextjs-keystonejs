import Link from 'next/link';
import MobileNavButton from './MobileNavButton';
import Nav from './Nav';
import { HeaderStyles } from './styles/HeaderStyles';
import { LogoStyles } from './styles/LogoStyles';

export default function Header() {
  return (
    <HeaderStyles>
      {/* MobileNavButton visible only under 790px */}
      <MobileNavButton />
      <LogoStyles>
        <Link href="/products">It's a LOGO</Link>
      </LogoStyles>
      <Nav />
    </HeaderStyles>
  );
}
