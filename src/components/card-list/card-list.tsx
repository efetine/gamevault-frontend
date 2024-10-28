"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import Card from "../card/card";
// import ProductsCarousel from "./products-carousel";
import { getProducts } from "~/services/products-service";
import { Loading } from "../layout/loading";
import ProductTypeSelector from "./products-type-selector";

export default function CardList() {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const { data, status, error, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam }) =>
      getProducts({
        cursor: pageParam,
        limit: "8",
      }),
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  console.log({ status, error });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

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
    <div className="flex h-full flex-col items-center justify-center gap-16 bg-gradient-to-b from-[#0d1117] via-[#212c3f] to-black">
      <section className="relative flex flex-col items-center justify-center overflow-hidden">
        <div className="w-full items-center">
          <h2 className="mb-4 text-2xl font-semibold">
            Featured & Recommended
          </h2>
        </div>
        <div className="w-full">
          {/* <ProductsCarousel images={featuredGames} /> */}
        </div>
      </section>
      <section className="relative flex flex-col items-center justify-center overflow-hidden">
        <ProductTypeSelector />
        <div className="grid w-full grid-cols-4 gap-7 py-5 sm:justify-items-center">
          {/* {data.pages[currentPage]?.products.map((product) => {
            return (
              <Link
                className="transition duration-700 ease-in-out hover:scale-[1.05]"
                href={`/product/${product.id}`}
                key={product.id}
              >
                <Card product={product} />
              </Link>
            )
          }) */}
          {products.map((product) => (
            <Link
              className="transition duration-700 ease-in-out hover:scale-[1.05]"
              href={`/product/${product.id}`}
              key={product.id}
            >
              <Card product={product} />
            </Link>
          ))}
        </div>
      </section>
      <div ref={ref}>
        {hasNextPage === true ? "Loading more products..." : null}
      </div>
    </div>
  );
}
