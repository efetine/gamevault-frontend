import Link from "next/link";

import Card from "~/components/card/card";
import { getProductsFromDb } from "~/helpers/products-from-db";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import type { PaginationDto } from "~/schemas/pagination-dto";
import { featuredGames } from "~/helpers/products";
import ProductsCarousel from "./products-carousel";

type CardListProps = PaginationDto;

export default async function CardList({ prevCursor, cursor }: CardListProps) {
  const { products, nextCursor } = await getProductsFromDb(8, cursor);

    return (
    <div className='flex flex-col gap-16 '>
    <section className='relative flex flex-col h-[60vh] w-full items-center justify-center overflow-hidden bg-fuchsia-400'>
      <h2 className='mb-4 text-2xl font-semibold'>Featured & Recommended</h2>
      <ProductsCarousel images={featuredGames} />
    </section>
    <section>
      <h2 className='mb-4 text-2xl font-semibold'>All games</h2>
      <div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-16 px-16 sm:justify-items-center'>
        {products &&
          products.length > 0 &&
          products.map((product) => {
            return (
              <Link
                className='transition duration-700 ease-in-out hover:scale-[1.05]'
                href={`/product/${product.id}`}
                key={product.id}
              >
                <Card {...product} />
              </Link>
            );
          })}
      </div>
    </section>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={{
                query: {
                  cursor: prevCursor,
                },
              }}
              aria-disabled={prevCursor === undefined}
              className={
                prevCursor === undefined
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
            />
          </PaginationItem>
          {nextCursor !== undefined ? (
            <PaginationItem>
              <PaginationNext
                href={{
                  query: {
                    prevCursor: products[0]?.id,
                    cursor: nextCursor,
                  },
                }}
              />
            </PaginationItem>
          ) : null}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
