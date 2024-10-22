import Link from "next/link";
import Card from "~/components/card/Card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { recommendedGames } from "~/helpers/products";
import { getProductsFromDb } from "~/helpers/products-from-db";
import Carousel from "../carousel/carousel";

interface CardListProps {
  page: number;
}

export default async function CardList({ page }: CardListProps) {
  const products = await getProductsFromDb(8, page);
  //const recommended = recommendedGames;

  if (products.length === 0) {
    return <div>No hay productos en esta pagina</div>;
  }

  return (
    <div className="flex flex-col gap-16">
      <section className="hero">
        <h2 className="mb-4 text-2xl font-semibold">
          Destacados y recomendados
        </h2>
        <Carousel images={recommendedGames} />
      </section>
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Todos los juegos</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-16 px-16 sm:justify-items-center">
          {products?.map((product) => {
            return (
              <Link
                className="transition duration-700 ease-in-out hover:scale-[1.05]"
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
