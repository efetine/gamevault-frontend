"use client";

import { Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";

const Navbar = () => {
  const { setTheme } = useTheme();

  return (
    <header className="bg-gray-300 dark:bg-gray-800 py-4 transition-colors duration-200">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Pixel Games
            </h1>
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <Link href="/">Home</Link>
              <Link href="/products">Products</Link>
            </ul>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input
              className="pl-8 bg-gray-100 dark:bg-gray-700"
              placeholder="Search games..."
            />
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <Link href="/auth/register">
            <Button variant="secondary">Register</Button>
          </Link>
          <Link href="/api/auth/signin">
            <Button>Login</Button>
          </Link>
          <Link href="/profile">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
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
