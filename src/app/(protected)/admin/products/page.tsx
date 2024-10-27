"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { useMemo } from "react";
import { Loading } from "~/components/layout/loading";
import { getProducts } from "~/services/products-service";
import { ProductsTable } from "./products-table";

export default function AdminProducts() {
  const { data, status, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam }) =>
      getProducts({
        cursor: pageParam,
      }),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const products = useMemo(() => {
    if (!data) return [];

    return data.pages.flatMap((page) => page.products);
  }, [data]);

  if (status === "error") {
    return <div>Cannot show products</div>;
  }

  if (status === "pending") {
    return <Loading />;
  }

  return (
    <ProductsTable
      products={products}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
}
