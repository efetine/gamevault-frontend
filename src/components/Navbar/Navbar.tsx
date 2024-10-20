"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Search, ShoppingCart, User } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

const Navbar = () => {
  const { setTheme } = useTheme();

  return (
    <header className=" w-full h-1/3 bg-gray-300 dark:bg-gray-800 py-4 transition-colors duration-200 ">
      <div className=" w-full flex flex-col md:flex-row md:w-full lg:flex-row lg:w-[60%] mx-auto  items-center justify-between ">
        <div className="flex w-[50%] items-center space-x-4  ">
          <Link href="/">
            <h1 className=" text-base md:text-xl lg:text-2xl font-bold text-gray-900 text-center dark:text-white">
              Pixel Games
            </h1>
          </Link>
          
            <div className="relative w-[70%] ">
              <Input
                className="pl-8 bg-gray-100 dark:bg-gray-700"
                placeholder="Search games..."
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          
        </div>
        <div className="flex items-center space-x-4">
          <ul className="text-xs md:text-lg flex space-x-3">
            <li>
              <Link
                href="/products"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Store
              </Link>
            </li>
            
            <li>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Support
              </a>
            </li>
          </ul>
          <Link
            href="/shopping-cart"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
