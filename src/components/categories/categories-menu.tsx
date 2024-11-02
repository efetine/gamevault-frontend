'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useMemo } from 'react';

import { ChevronDown } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { NavigationMenuLink } from '~/components/ui/navigation-menu';
import { getCategories } from '~/services/categories-service';

export function CategoriesMenu() {
  const { data, fetchNextPage } = useSuspenseInfiniteQuery({
    queryKey: ['categories'],
    queryFn: ({ pageParam }) =>
      getCategories({
        cursor: pageParam,
        limit: '6',
      }),
    initialPageParam: '',
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
    <>
      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-3 lg:w-[600px]">
        {categories.map((category) => (
          <li key={category.id}>
            <NavigationMenuLink asChild>
              <Link
                href={`/categories/${category.id}`}
                className={
                  'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                }
              >
                <div className="text-sm font-medium leading-none">
                  {category.name}
                </div>
              </Link>
            </NavigationMenuLink>
          </li>
        ))}
      </ul>
      <Button
        className="w-full"
        variant="outline"
        onClick={() => {
          fetchNextPage();
        }}
      >
        <ChevronDown className="h-4 w-4" />
        View more
      </Button>
    </>
  );
}
