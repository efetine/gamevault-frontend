"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useMemo } from "react";
import { Loading } from "~/components/layout/loading";
import { ProductCard } from "~/components/products/product-card";
import type { PaginationDto } from "~/schemas/pagination-dto";
import { getProductsByCategory } from "~/services/categories-service";

type CardListProps = PaginationDto & { categoryId: string };

export default function ProductsByCategory({ categoryId }: CardListProps) {
  const { data, status, error } = useInfiniteQuery({
    queryKey: ["products", categoryId],
    queryFn: ({ pageParam }) => getProductsByCategory(categoryId, 8, pageParam),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const products = useMemo(() => {
    if (!data) return [];

    return data.pages.flatMap((page) => page.data);
  }, [data]);

  if (status === "error") {
    notFound();
  }

  if (status === "pending") {
    return <Loading />;
  }

  return (
    <div className="flex">
      <div className="grid w-full grid-cols-4 gap-7 py-5 sm:justify-items-center">
        {products.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}
