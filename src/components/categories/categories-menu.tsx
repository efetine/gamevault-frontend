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
    <div className="rounded-lg bg-gradient-to-br from-slate-400 via-slate-400 to-sky-300 dark:bg-gradient-to-br dark:from-blue-900 dark:via-cyan-900 dark:to-slate-700 p-4 backdrop-blur-md">
      <ul className="grid w-[350px] gap-3 p-2 md:w-[500px] md:grid-cols-3 lg:w-[550px]">
        {categories.map((category) => (
          <li key={category.id}>
            <NavigationMenuLink
              asChild
              className="flex items-center justify-center text-center"
            >
              <Link
                href={`/categories/${category.id}`}
                className="block select-none space-y-1 rounded-md p-2 leading-none text-gray-900 dark:text-white no-underline outline-none transition-colors hover:bg-white/10 focus:bg-white/10"
              >
                <div className="text-lg font-medium capitalize leading-none">
                  {category.name}
                </div>
              </Link>
            </NavigationMenuLink>
          </li>
        ))}
      </ul>
      <Button
        className="mt-4 w-full bg-white/10 text-lg text-white hover:bg-white/20"
        variant="outline"
        onClick={() => {
          void fetchNextPage();
        }}
      >
        <ChevronDown className="mr-2 h-4 w-4" />
        View more
      </Button>
    </div>
  );
}
