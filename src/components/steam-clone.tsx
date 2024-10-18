// 'use client'

// import { Button } from "~/components/ui/button"
// import { ScrollArea } from "~/components/ui/scroll-area"
// import { categories, featuredGames, games } from "~/Helpers/productsToPreload"

// export function SteamClone() {

//   return (

//     //!Featured games

//     <div className="flex flex-col min-h-screen bg-gray-900 text-white  ">      
//       <main className="flex-1 container mx-auto px-4 py-8">
//         <div className="grid grid-cols-4 gap-8">
//           <div className="col-span-3">
//             <h2 className="text-2xl font-bold mb-4">Featured Games</h2>

//             <div className="grid grid-cols-2 gap-4 mb-8">

//               {featuredGames.map((game) => (
//                 <div key={game.id} className="relative">
//                   <img src={game.image} alt={game.title} className="w-full h-auto rounded-lg" />
//                   <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-4">
//                     <h3 className="text-lg font-semibold">{game.title}</h3>
//                     <p className="text-green-400">{game.price}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//         {/*//!All games*/}

//             <h2 className="text-2xl font-bold mb-4">All Games</h2>
//             <div className="grid grid-cols-3 gap-4">
//               {games.map((game) => (
//                 <div key={game.id} className="bg-gray-800 rounded-lg overflow-hidden">
//                   <img src={game.image} alt={game.title} className="w-full h-auto" />
//                   <div className="p-4">
//                     <h3 className="text-lg font-semibold mb-2">{game.title}</h3>
//                     <p className="text-green-400">{game.price}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/*//!Categories*/}

//           <div>
//             <h2 className="text-2xl font-bold mb-4">Categories</h2>
//             <ScrollArea className="h-[calc(100vh-12rem)]">
//               <ul className="space-y-2">
//                 {categories.map((category) => (
//                   <li key={category}>
//                     <Button variant="ghost" className="w-full justify-start">
//                       {category}
//                     </Button>
//                   </li>
//                 ))}
//               </ul>
//             </ScrollArea>
//           </div>
//         </div>
//       </main>
      
//     </div>
//   )
// }