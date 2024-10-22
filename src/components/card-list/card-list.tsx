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

interface CardListProps {
  page: number;
}

export default async function CardList({ page }: CardListProps) {
  const products = await getProductsFromDb(8, page);

  if (products.length === 0) {
    return <div>No hay productos en esta pagina</div>;
  }

  return (
    <div className="flex gap-1">
      <div className="w-48 space-y-6 bg-[#030712] p-6">
        <div className="flex flex-col space-y-2">
          <h2 className="mb-6 text-2xl font-bold">Categorías</h2>
          {/* <Button variant="ghost" className="justify-start">
            <Star className="mr-2 h-4 w-4" /> Arcade
          </Button>
          <Button variant="ghost" className="justify-start">
            <ShoppingBag className="mr-2 h-4 w-4" /> Terror
          </Button>
          <Button variant="ghost" className="justify-start">
            <Settings className="mr-2 h-4 w-4" /> Edit Profile
          </Button> */}
        </div>
      </div>

      <div className="flex flex-col gap-10 p-10">
        <div className="grid columns-2 grid-cols-2 gap-10 md:grid-cols-4">
          {products?.map((product) => {
            return (
              <Link
                className=""
                href={`/products/${product.id}`}
                key={product.id}
              >
                <Card {...product} />
              </Link>
            );
          })}
        </div>
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
