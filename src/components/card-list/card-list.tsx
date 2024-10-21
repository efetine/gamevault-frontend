import Link from "next/link";
import Card from "../Card/Card";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { getProductsFromDb } from "~/Helpers/products-from-db";

import { recommendedGames } from "~/Helpers/products";
import Carousel from "../carousel/carousel";

interface CardListProps {
  page: number;
}

export default async function CardList({ page }: CardListProps) {
  const products = await getProductsFromDb(8, page);
  //const recommended = recommendedGames;

  // const [products, setProducts] = useState<IProduct[]>([]);
  // const [page, setPage] = useState(2);
  // const [limit] = useState(8);

  // useEffect(() => {
  //   async function fetchProducts() {
  //     try {
  //       const fetchedProducts = await getProductsFromDb(limit, page);
  //       setProducts(fetchedProducts);
  //     } catch (error) {
  //       console.error("Error searching for products:", error);
  //     }
  //   }
  //   void fetchProducts();
  // }, [page]);

  if (products.length === 0) {
    return <div>No hay productos en esta pagina</div>;
  }

  return (
    <div className="flex flex-col gap-16">
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Destacados y recomendados
        </h2>
        <Carousel images={recommendedGames} />
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Todos los juegos</h2>
        <div className="grid grid-cols-4 gap-16 px-16 columns-2">
          {products?.map((product) => {
            return (
              <Link
                className="hover:scale-[1.05] transition duration-700 ease-in-out"
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
              isActive={page <= 1}
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
