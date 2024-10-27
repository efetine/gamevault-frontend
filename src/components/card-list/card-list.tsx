'use client'

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from "next/link";
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
import Card from "../card/card";
import type { IProduct } from "~/interfaces/IProduct";
import ProductTypeSelector from './products-type-selector';

type CardListProps = PaginationDto & {
  initialType?: string
};

export default function CardList({ prevCursor, cursor: initialCursor, initialType }: CardListProps) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [nextCursor, setNextCursor] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('type') ?? initialType;
  const cursor = searchParams.get('cursor') ?? initialCursor;

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { products: fetchedProducts, nextCursor: fetchedNextCursor } = await getProductsFromDb(7, cursor, type);
        setProducts(fetchedProducts);
        setNextCursor(fetchedNextCursor);
      } catch (err) {
        setError('Error fetching products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchProducts();
  }, [cursor, type]);

  const handleTypeChange = (newType: string | undefined) => {
    const params = new URLSearchParams(searchParams);
    if (newType) {
      params.set('type', newType);
    } else {
      params.delete('type');
    }
    params.delete('cursor');
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

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
        <ProductTypeSelector initialType={type} onTypeChange={handleTypeChange} />
        <div className='w-full grid grid-cols-4 py-5 gap-7 sm:justify-items-center '>
          {isLoading ? (
            <p className="col-span-4 text-center">Loading products...</p>
          ) : error ? (
            <p className="col-span-4 text-center text-red-500">{error}</p>
          ) : products && products.length > 0 ? (
            products.map((product) => (
              <Link
                className='transition duration-700 ease-in-out hover:scale-[1.05]'
                href={`/product/${product.id}`}
                key={product.id}
              >
                <Card {...product} />
              </Link>
            ))
          ) : (
            <p className="col-span-4 text-center text-xl">No products of this type available.</p>
          )}
        </div>
      </section>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={{
                query: {
                  cursor: prevCursor,
                  type: type
                },
              }}
              aria-disabled={!prevCursor}
              className={
                !prevCursor
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
            />
          </PaginationItem>
          {nextCursor && (
            <PaginationItem>
              <PaginationNext
                href={{
                  query: {
                    prevCursor: products[0]?.id,
                    cursor: nextCursor,
                    type: type
                  },
                }}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
