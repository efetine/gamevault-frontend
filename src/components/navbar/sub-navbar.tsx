import { Search } from "lucide-react";
import Link from "next/link";

import { Input } from "~/components/ui/input";
// import { ModeToggle } from "./mode-toggle";

const SubNavbar = () => {
  return (
    <nav className="w-full relative">
      <div className="relative lg:absolute lg:top-4 lg:left-20 z-10 mx-auto flex md:flex-row flex-col md:h-10 h-auto w-screen md:w-fit items-center justify-center md:gap-10 gap-3 bg-gradient-to-r from-blue-900 via-[#1a2332] to-slate-600 p-3 transition-colors duration-200 dark:bg-slate-700">
        <div className="flex flex-row items-center space-x-4">
          <nav>
            <ul className="flex md:gap-10 gap-5 justify-center text-sm md:text-lg font-semibold text-[#dad9dc]">
              <Link href="/">Home</Link>
              <Link href="/products">Store</Link>
              <Link href="/">Categories</Link>
              <Link href="/">About</Link>
              <Link href="/">Suport</Link>
              <Link href="/"></Link>
            </ul>
          </nav>
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
    </nav>
  );
};

export default SubNavbar;
