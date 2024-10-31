import { Search } from "lucide-react";
import Link from "next/link";

import React from "react";
import { Input } from "~/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";

import { cn } from "~/lib/utils";
// import { ModeToggle } from "./mode-toggle";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const SubNavbar = async () => {
  return (
    <section className="fixed top-20 z-10 w-full">
      <div className="mx-auto mt-2 flex h-10 w-3/5 items-center justify-center gap-10 bg-gradient-to-r from-blue-900 via-[#1a2332] to-slate-600 p-3 transition-colors duration-200 dark:bg-slate-700">
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
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-3 lg:w-[600px]"></ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
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
          {/* <Button variant="outline" size="icon">
            <ShoppingCart className="h-5 w-5" />
          </Button> */}
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
