import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";

import { Input } from "~/components/ui/input";
import { Button } from "../ui/button";
// import { ModeToggle } from "./mode-toggle";

const SubNavbar = () => {
  return (
    <section className="w-full p-3 my-10">
      <div className="container mx-auto flex h-14 w-[60%] items-center justify-center rounded-md gap-10 bg-gradient-to-r from-blue-900 via-[#1a2332] to-slate-600 p-3 transition-colors duration-200 dark:bg-slate-700">
        <div className="flex flex-row items-center space-x-4">
          <nav>
            <ul className="flex gap-10 text-lg font-normal text-[#dad9dc]">
              <Link href="/">Home</Link>
              <Link href="/products">Store</Link>
              <Link href="/">Categories</Link>
              <Link href="/">About</Link>
              <Link href="/">Suport</Link>
              <Link href="/"></Link>
            </ul>            
          </nav>
              <Button variant="outline" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input
              className="bg-gray-100 pl-8 text-white dark:bg-gray-500"
              placeholder="Search games..."
            />
            <Search className="absolute right-2 top-2.5 h-4 w-4 text-[#dad9dc]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubNavbar;
