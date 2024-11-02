import { Search } from 'lucide-react';
import Link from 'next/link';

import { CategoriesMenu } from '~/components/categories/categories-menu';
import { Input } from '~/components/ui/input';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '~/components/ui/navigation-menu';

const SubNavbar = async () => {
  return (
    <section className="fixed top-20 z-10 w-full p-3">
      <div className="container mx-auto flex h-12 w-[60%] items-center justify-evenly gap-10 rounded-lg from-blue-900 via-cyan-900 to-slate-800 p-4 transition-colors duration-200 dark:bg-gradient-to-r">
        <div className="flex flex-row items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-10 text-lg font-semibold text-[#dad9dc]">
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink>Home</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/products" legacyBehavior passHref>
                  <NavigationMenuLink>Store</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-lg font-semibold text-[#dad9dc]">
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <CategoriesMenu />
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink>About</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink>Support</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
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
