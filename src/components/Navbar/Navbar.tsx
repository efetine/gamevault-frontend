"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import {
  CalendarDays,
  Home,
  MenuIcon,
  Search,
  Settings,
  ShoppingCart,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

import Link from "next/link";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useIsMobile } from "~/hooks/use-mobile";
import { Drawer, DrawerContent } from "../ui/drawer";
import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

const MenuToggle = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleDrawer = () => setOpen(!open);

  const items = [
    {
      title: "Explore genres",
      url: "#",
      icon: Home,
    },
    {
      title: "Explore categories",
      url: "#",
      icon: Home,
    },
    {
      title: "Calendar",
      url: "#",
      icon: CalendarDays,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ];
  return (
    <div>
      <Drawer direction="left" open={open} onOpenChange={setOpen}>
        <Button size="icon" onClick={toggleDrawer}>
          <MenuIcon />
        </Button>
        <DrawerContent>
          <SidebarContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

const Navbar = () => {
  const { setTheme } = useTheme();

  return (
    <header className="h-1/3 w-full bg-gray-300 py-4 transition-colors duration-200 dark:bg-gray-800">
      <div className="mx-auto flex w-full flex-col items-center justify-between md:w-full md:flex-row lg:w-[60%] lg:flex-row">
        <div className="flex w-[50%] items-center space-x-4">
          <Link href="/">
            <h1 className="text-center text-base font-bold text-gray-900 dark:text-white md:text-xl lg:text-2xl">
              Pixel Games
            </h1>
          </Link>

          <div className="relative w-[70%]">
            <Input
              className="bg-gray-100 pl-8 dark:bg-gray-700"
              placeholder="Search games..."
            />
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <ul className="flex space-x-3 text-xs md:text-lg">
            <li>
              <Link
                href="/products"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Store
              </Link>
            </li>

            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Support
              </a>
            </li>
          </ul>
          <Link
            href="/shopping-cart"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
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
