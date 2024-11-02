"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { z } from "zod";

import { Loading } from "~/components/layout/loading";
import { ProductCard } from "~/components/products/product-card";
import ProductTypeSelector from "~/components/products/products-type-selector";
import { getProducts } from "~/services/products-service";

const paramsSchema = z.object({
  type: z.enum(["digital", "physical"]).optional(),
});

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type") ?? undefined;
  const { type } = paramsSchema.parse({ type: typeParam });

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const { data, status, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["products", type],
    queryFn: ({ pageParam }) =>
      getProducts({
        cursor: pageParam,
        limit: "8",
        type,
      }),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      void fetchNextPage();
    }
  }, [inView, hasNextPage]);

  const products = useMemo(() => {
    if (!data) return [];

    return data.pages.flatMap((page) => page.data);
  }, [data]);

  if (status === "error") {
    return <div>Cannot show products</div>;
  }

  if (status === "pending") {
    return <Loading />;
  }

  return (
    <div className="mt-36 w-full content-center items-center justify-center">
      <div className="flex h-full flex-col items-center justify-center gap-16 bg-gradient-to-b from-[#0d1117] via-[#212c3f] to-black ">
        
        <section className="relative flex flex-col items-center justify-center overflow-hidden ">
          <ProductTypeSelector />
          <div className="grid w-full grid-cols-4 gap-7 py-5 sm:justify-items-center">            
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
        <div ref={ref}>
          {hasNextPage === true ? "Loading more products..." : null}
        </div>
      </div>
    </div>
  );
}
