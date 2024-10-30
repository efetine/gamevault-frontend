"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Card from "~/components/card/card";

import { getProductsByCategory } from "~/helpers/categories-from-db";
import { IProduct } from "~/interfaces/IProduct";
import { PaginationDto } from "~/schemas/pagination-dto";

type CardListProps = PaginationDto & { categoryId: string };

export default function CardListByCategory({ categoryId }: CardListProps) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [nextCursor, setNextCursor] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
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

  const handleCategoryChange = (newCategory: string | undefined) => {
    const params = new URLSearchParams(searchParams);
    if (newCategory) {
      params.set("category", newCategory);
    } else {
      params.delete("category");
    }
    params.delete("cursor");
    router.push(`/products/category?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="flex">
      {/* <ProductCategorySelector initialCategory={category} onCategoryChange={handleCategoryChange} /> */}

      <div className="grid w-full grid-cols-4 gap-7 py-5 sm:justify-items-center">
        {isLoading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p>{error}</p>
        ) : products && products.length > 0 ? (
          products?.map((product) => (
            <Link className="" href={`/product/${product.id}`} key={product.id}>
              <Card {...product} />
            </Link>
          ))
        ) : (
          <p>No products of this category available</p>
        )}
      </div>
    </div>
  );
}
