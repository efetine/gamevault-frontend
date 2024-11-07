import Link from "next/link";

import { Cart } from "~/components/cart/cart";
import { IconComponent } from "~/components/icon/icon.svg";
import { UserMenu } from "~/components/layout/navbar/user-menu";
import { NavbarDrawer } from "./navbar-drawer";

export function Navbar() {
  return (
    <header className="fixed z-20 h-16 w-screen bg-gradient-to-r from-slate-400 to-sky-300 py-0 transition-colors duration-200 dark:bg-gradient-to-r dark:from-blue-900 dark:via-gray-800 dark:to-gray-900 lg:h-20">
      <div className="container mx-auto flex h-full flex-row justify-end gap-0 lg:items-center lg:justify-end lg:gap-2">
        <div className="flex w-full items-center justify-end pr-[80px] lg:w-[58%] lg:justify-end lg:p-0">
          <Link href="/" className="flex items-center gap-3">
            <h1 className="flex items-center text-2xl font-semibold lg:text-3xl">
              <IconComponent />
              Game Vault
            </h1>
          </Link>
        </div>
        <div className="hidden justify-end lg:flex lg:w-[42%] lg:items-center lg:space-x-6">
          <UserMenu />
          <Cart />
        </div>
        <div className="flex h-full w-10 items-center justify-center">
          <NavbarDrawer>
            <UserMenu />
          </NavbarDrawer>
        </div>
      </div>
    </header>
  );
}
