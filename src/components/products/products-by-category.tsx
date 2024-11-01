"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductCard } from "~/components/products/product-card";
import type { PaginationDto } from "~/schemas/pagination-dto";
import type { Product } from "~/schemas/product-schema";
import { getProductsByCategory } from "~/services/categories-service";

type CardListProps = PaginationDto & { categoryId: string };

export default function ProductsByCategory({ categoryId }: CardListProps) {
  const [products, setProducts] = useState<Product[]>([]);

  const [nextCursor, setNextCursor] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const cursor = searchParams.get("cursor");

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { products: fetchedProducts, nextCursor: fetchedNextCursor } =
          await getProductsByCategory(categoryId, undefined, cursor);
        setProducts(fetchedProducts);
        setNextCursor(fetchedNextCursor);
      } catch (err) {
        setError("Error fetching products. Please try again later.");
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    };
    void fetchProducts();
  }, [cursor, categoryId]);

  return (
    <div className="mt-36 w-full content-center items-center justify-center">
      <div className="flex h-full flex-row items-center justify-center gap-16 bg-gradient-to-b from-[#0d1117] via-[#212c3f] to-black">
        <section className="relative flex flex-col items-center justify-center overflow-hidden ">
          <div className="grid w-full grid-cols-4 gap-7 py-5 sm:justify-items-center">
            {isLoading ? (
              <p>Loading products...</p>
            ) : error ? (
              <p>{error}</p>
            ) : products && products.length > 0 ? (
              products?.map((product) => (
                <Link
                  className=""
                  href={`/product/${product.id}`}
                  key={product.id}
                >
                  <ProductCard product={product} />
                </Link>
              ))
            ) : (
              <p>No products of this category available</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
