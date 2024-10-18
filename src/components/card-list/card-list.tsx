import Link from "next/link";
import Card from "~/components/card/Card";
import { getProductsFromDb } from "~/helpers/products-from-db";
import type { CardListProps } from "~/interfaces/IProductsViewProps";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

export default async function CardList({ page }: CardListProps) {
  const products = await getProductsFromDb(8, page);

  if (products.length === 0) {
    return <div>No hay productos en esta pagina</div>;
  }

  return (
    <div className="flex flex-col gap-16">
      <h1 className="text-center">VIDEOJUEGOS</h1>
      <div className="grid columns-2 grid-cols-4 gap-16 px-16">
        {products?.map((product) => {
          return (
            <Link
              className="transition duration-700 ease-in-out hover:scale-[1.05]"
              href={`/products/${product.id}`}
              key={product.id}
            >
              <Card {...product} />
            </Link>
          );
        })}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={{
                query: {
                  page: page - 1,
                },
              }}
              aria-disabled={page <= 1}
              tabIndex={page <= 1 ? -1 : undefined}
              isActive={page <= 1}
              className={
                page <= 1 ? "pointer-events-none opacity-50" : undefined
              }
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href={{
                query: {
                  page: page + 1,
                },
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
