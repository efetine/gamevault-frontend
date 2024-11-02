"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useMemo } from "react";

import { ChevronDown } from "lucide-react";
import { Button } from "~/components/ui/button";
import { NavigationMenuLink } from "~/components/ui/navigation-menu";
import { getCategories } from "~/services/categories-service";

export function CategoriesMenu() {
  const { data, fetchNextPage } = useSuspenseInfiniteQuery({
    queryKey: ["categories"],
    queryFn: ({ pageParam }) =>
      getCategories({
        cursor: pageParam,
        limit: "6",
      }),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const categories = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) => page.data);
  }, [data]);

  if (categories.length === 0) {
    return <div>No categories found</div>;
  }

  return (
    <div className="rounded-lg bg-gradient-to-br from-blue-900 via-cyan-900  to-slate-700 p-4 backdrop-blur-md">
      <ul className="grid w-[400px] gap-3 p-2 md:w-[500px] md:grid-cols-3 lg:w-[600px]">
        {categories.map((category) => (
          <li key={category.id}>
            <NavigationMenuLink asChild className="">
              <Link
                href={`/categories/${category.id}`}
                className="block select-none space-y-1 rounded-md p-2 leading-none text-white no-underline outline-none transition-colors hover:bg-white/10 focus:bg-white/10"
              >
                <div className="text-sm font-medium capitalize leading-none">
                  {category.name}
                </div>
              </Link>
            </NavigationMenuLink>
          </li>
        ))}
      </ul>
      <Button
        className="w-full mt-4 bg-white/10 text-white hover:bg-white/20"
        variant="outline"
        onClick={() => {
          void fetchNextPage();
        }}
      >
        <ChevronDown className="h-4 w-4 mr-2" />
        View more
      </Button>
    </div>
  );
}

// return (
//   <div className="backdrop-blur-md bg-black/30 rounded-lg p-4">
//     <ul className="grid w-[400px] gap-3 md:w-[500px] md:grid-cols-3 lg:w-[600px]">
//       {categories.map((category) => (
//         <li key={category.id}>
//           <NavigationMenuLink asChild>
//             <Link
//               href={`/categories/${category.id}`}
//               className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 focus:bg-white/10 text-white"
//             >
//               <div className="text-sm font-medium leading-none capitalize">
//                 {category.name}
//               </div>
//             </Link>
//           </NavigationMenuLink>
//         </li>
//       ))}
//     </ul>
//     <Button
//       className="w-full mt-4 bg-white/10 text-white hover:bg-white/20"
//       variant="outline"
//       onClick={() => {
//         void fetchNextPage();
//       }}
//     >
//       <ChevronDown className="h-4 w-4 mr-2" />
//       View more
//     </Button>
//   </div>
// );
