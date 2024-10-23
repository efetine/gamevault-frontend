import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";

import { ModeToggle } from "~/components/navbar/mode-toggle";
import { UserMenu } from "~/components/navbar/user-menu";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

const Navbar = () => {
  return (
    <header className="bg-gray-300 py-4 transition-colors duration-200 dark:bg-gray-800">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link href="/">
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
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input
              className="bg-gray-100 pl-8 dark:bg-gray-700"
              placeholder="Search games..."
            />
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <UserMenu />
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;