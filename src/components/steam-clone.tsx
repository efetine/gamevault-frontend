"use client";

import { Search, ShoppingCart, User } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import { ModeToggle } from "./mode-toogle";

export function SteamClone() {
  const featuredGames = [
    {
      id: 1,
      title: "Cyberpunk 2077",
      image: "/placeholder.svg?height=200&width=400",
      price: "$59.99",
    },
    {
      id: 2,
      title: "Red Dead Redemption 2",
      image: "/placeholder.svg?height=200&width=400",
      price: "$49.99",
    },
  ];

  const categories = [
    "Action",
    "Adventure",
    "RPG",
    "Strategy",
    "Simulation",
    "Sports",
    "Racing",
    "Indie",
  ];

  const games = [
    {
      id: 1,
      title: "The Witcher 3",
      image: "/placeholder.svg?height=150&width=250",
      price: "$39.99",
    },
    {
      id: 2,
      title: "Grand Theft Auto V",
      image: "/placeholder.svg?height=150&width=250",
      price: "$29.99",
    },
    {
      id: 3,
      title: "Portal 2",
      image: "/placeholder.svg?height=150&width=250",
      price: "$9.99",
    },
    {
      id: 4,
      title: "Half-Life: Alyx",
      image: "/placeholder.svg?height=150&width=250",
      price: "$59.99",
    },
    {
      id: 5,
      title: "Stardew Valley",
      image: "/placeholder.svg?height=150&width=250",
      price: "$14.99",
    },
    {
      id: 6,
      title: "Hades",
      image: "/placeholder.svg?height=150&width=250",
      price: "$24.99",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-white">
      <header className="bg-gray-800 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Steam Clone</h1>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Store
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Support
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                className="pl-8 bg-gray-700"
                placeholder="Search games..."
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <ModeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-3">
            <h2 className="text-2xl font-bold mb-4">Featured Games</h2>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {featuredGames.map((game) => (
                <div key={game.id} className="relative">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-auto rounded-lg"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-4">
                    <h3 className="text-lg font-semibold">{game.title}</h3>
                    <p className="text-green-400">{game.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <h2 className="text-2xl font-bold mb-4">All Games</h2>
            <div className="grid grid-cols-3 gap-4">
              {games.map((game) => (
                <div
                  key={game.id}
                  className="bg-gray-800 rounded-lg overflow-hidden"
                >
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-auto"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{game.title}</h3>
                    <p className="text-green-400">{game.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Categories</h2>
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <Button variant="ghost" className="w-full justify-start">
                      {category}
                    </Button>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </div>
        </div>
      </main>
      <footer className="bg-gray-800 py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          © 2023 Steam Clone. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
