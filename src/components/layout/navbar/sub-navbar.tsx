

import { Search } from 'lucide-react'
import Link from 'next/link'

import { CategoriesMenu } from '~/components/categories/categories-menu'
import { Input } from '~/components/ui/input'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '~/components/ui/navigation-menu'
import { MobileCategoriesMenu } from './mobile-sub-navbar-categories'

export default function SubNavbar() {
  return (
    <section className="w-full pt-16 p-0 lg:fixed lg:top-20 lg:z-10 lg:p-3">
      <div className="w-full lg:w-[60%] p-2 lg:h-12 lg:mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-evenly gap-2 lg:gap-10 lg:rounded-lg from-blue-900 via-cyan-900 to-slate-800 lg:p-4 transition-colors duration-200 dark:bg-gradient-to-r">
        <NavigationMenu className="w-full">
          <NavigationMenuList className="flex flex-col lg:flex-row gap-4 md:gap-5 lg:gap-10 text-lg font-semibold text-[#dad9dc]">
            {[
              { href: "/", label: "Home" },
              { href: "/products", label: "Store" },
              { href: "/", label: "About" },
              { href: "/", label: "Support" },
            ].map((item) => (
              <NavigationMenuItem key={item.label} className="w-full">
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink className="flex w-full px-4 py-2 hover:bg-gray-700 rounded transition-colors">
                    {item.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem className="w-full">
              <div className="lg:hidden">
                <MobileCategoriesMenu />
              </div>
              <div className="hidden pl-1 lg:block">
                <NavigationMenuTrigger className="bg-transparent text-lg font-semibold text-[#dad9dc]">
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <CategoriesMenu />
                </NavigationMenuContent>
              </div>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="w-full  lg:w-auto  lg:px-0 ">
          <div className="relative w-full items-center justify-center ">
            <Input
              className="w-full bg-gray-100 pl-8 pr-10 text-gray-900 dark:text-white dark:bg-gray-700"
              placeholder="Search games..."
              aria-label="Search games"
            />
            <Search className="absolute right-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          </div>
        </div>
      </div>
    </section>
  )
}

