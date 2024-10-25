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
  const { products, nextCursor } = await getProductsFromDb(12, cursor);

    return (
    <div className='h-full flex flex-col justify-center items-center gap-16 bg-gradient-to-b from-[#0d1117] via-[#212c3f] to-black'>
    <section className='relative flex flex-col h-[50%] w-[60%] items-center justify-center overflow-hidden '>
      <div className="w-full items-center ">
      <h2 className='mb-4 text-2xl font-semibold'>Featured & Recommended</h2>
      </div>
      <div className="w-full">
      <ProductsCarousel images={featuredGames} />
      </div>
    </section>
    <section className='relative flex flex-col h-[50%] w-[60%] items-center justify-center overflow-hidden '>
      <div className="w-full justify-center">
      <h2 className='mb-4 text-2xl font-semibold'>Trending</h2>
      </div>
      <div className='w-full grid grid-cols-4 py-5 gap-7 sm:justify-items-center '>
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
