import React from 'react'

import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { Search, ShoppingCart, User } from "lucide-react"


const Navbar = () => {
  return (
    <header className="bg-gray-800 py-4 ">
        <div className="container mx-auto px-4 flex items-center justify-between ">
          <div className="flex items-center space-x-4 ">
            <h1 className="text-2xl font-bold">Pixel Games</h1>
            <nav>
              <ul className="flex space-x-4 ">
                <li><a href="#" className="hover:text-gray-300">Store</a></li>
                <li><a href="#" className="hover:text-gray-300">Community</a></li>
                <li><a href="#" className="hover:text-gray-300">About</a></li>
                <li><a href="#" className="hover:text-gray-300">Support</a></li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input className="pl-8 bg-gray-700" placeholder="Search games..." />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
  )
}

export default Navbar