import { Search } from 'lucide-react';
import Link from 'next/link';

import { Input } from '~/components/ui/input';
// import { ModeToggle } from "./mode-toggle";

const SubNavbar = () => {
  return (
    <nav className="fixed top-20 z-10 w-full">
      <div className="mx-auto mt-2 flex h-10 w-3/5 items-center justify-center gap-10 bg-gradient-to-r from-blue-900 via-[#1a2332] to-slate-600 p-3 transition-colors duration-200 dark:bg-slate-700">
        <div className="flex flex-row items-center space-x-4">
          <nav>
            <ul className="flex gap-10 text-lg font-semibold text-[#dad9dc]">
              <Link href="/">Home</Link>
              <Link href="/products">Products</Link>
              <Link href="/" className="pointer-events-none opacity-15">
                Categories
              </Link>
              <Link href="/" className="pointer-events-none opacity-15">
                About
              </Link>
              <Link href="/" className="pointer-events-none opacity-15">
                Support
              </Link>
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
