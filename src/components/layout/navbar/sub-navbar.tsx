// import { Search } from "lucide-react";
import Link from "next/link";

import { CategoriesMenu } from "~/components/categories/categories-menu";
// import { Input } from "~/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";

export default function SubNavbar() {
  return (
    <section className="w-full p-0 pt-16 lg:fixed lg:top-20 lg:z-10 lg:p-3">
      <div className="flex w-full flex-col items-center justify-center gap-2 from-blue-900 via-cyan-900 to-slate-800 p-2 transition-colors duration-200 dark:bg-gradient-to-r lg:mx-auto lg:h-12 lg:w-[60%] lg:flex-row lg:items-center lg:justify-evenly lg:gap-10 lg:rounded-lg lg:p-4">
        <NavigationMenu className="w-full">
          <NavigationMenuList className="flex flex-col gap-4 text-lg font-semibold text-[#dad9dc] md:gap-5 lg:flex-row lg:gap-10">
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
            <NavigationMenuItem className="w-full">
              <MobileCategoriesMenu />
              <div className="hidden lg:block">
                <NavigationMenuTrigger className="bg-transparent text-lg font-semibold text-[#dad9dc]">
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <CategoriesMenu />
                </NavigationMenuContent>
              </div>
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
        {/* <div className="mt-4 w-full lg:mt-0 lg:w-auto">
          <div className="relative w-full">
            <Input
              className="w-full bg-gray-100 pl-8 pr-10 text-white dark:bg-gray-500"
              placeholder="Search games..."
            />
            <Search className="absolute right-2 top-2.5 h-4 w-4 text-[#dad9dc]" />
          </div>
        </div> */}
      </div>
    </section>
  );
}