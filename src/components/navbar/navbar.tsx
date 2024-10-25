import { ShoppingCart } from "lucide-react";
import Link from "next/link";

import { UserMenu } from "~/components/navbar/user-menu";
import { Button } from "~/components/ui/button";

const Navbar = () => {
  return (
    <header className="fixed h-20 w-full bg-gray-300 py-3 transition-colors duration-200 dark:bg-slate-700">
      <div className="container mx-auto flex items-center justify-center gap-10 px-4">
        <div className="flex w-[60%] items-center justify-end">
          <Link href="/" className="flex flex-row items-center gap-3">
            <img
              src="/b2936695e4c1d28d1232842dfd361b9d.jpg"
              alt="Logo de un fantasma con cascos"
              className="h-[55px] rounded-full"
            />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Pixel Games
            </h1>
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <Link href="/">Home</Link>
              <Link href="/products">Store</Link>
            </ul>
          </nav>
        </div>
        <div className="flex w-[45%] items-center justify-end space-x-6">
          <UserMenu />
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
          </Button>
          {/* <ModeToggle /> */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
