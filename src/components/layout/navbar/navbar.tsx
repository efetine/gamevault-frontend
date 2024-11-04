

import Link from 'next/link';

import { Cart } from '~/components/cart/Cart';
import { IconComponent } from '~/components/icon/icon.svg';
import { ModeToggle } from '~/components/layout/navbar/mode-toggle';
import { UserMenu } from '~/components/layout/navbar/user-menu';
import { NavbarDrawer } from './navbar-drawer';

export default async function Navbar() {
  return (
    <header className="fixed z-20 w-screen h-16 lg:h-20 bg-slate-400 py-0 transition-colors duration-200 dark:bg-slate-700">
      <div className="container mx-auto flex h-full gap-20 lg:items-center justify-end lg:gap-[350px] px-4 ">
        <Link href="/" className="flex items-center gap-3 ">
          <h1 className="flex items-center text-lg lg:text-3xl font-semibold">
          <IconComponent  />
            Game Vault</h1>
        </Link>
        
        <div className="hidden lg:flex lg:items-center lg:space-x-6">
          <UserMenu />
          <Cart />
          <ModeToggle />
        </div>
        
        <NavbarDrawer>
          <UserMenu />
        </NavbarDrawer>
      </div>
    </header>
  );
}