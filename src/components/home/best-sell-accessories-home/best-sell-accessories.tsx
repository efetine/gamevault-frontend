"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useMemo } from "react";
import { Loading } from "~/components/layout/loading";
import { Card, CardContent } from "~/components/ui/card";
import { getProducts } from "~/services/products-service";

export function BestSellingAccessories() {
  const { data, status } = useInfiniteQuery({
    queryKey: ["products", "physical"],
    queryFn: ({ pageParam }) =>
      getProducts({
        cursor: pageParam,
        limit: "6",
        type: "physical",
      }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: "",
  });

  const products = useMemo(() => {
    if (data === undefined) return [];

    return data.pages.flatMap((page) => page.data);
  }, [data]);

  if (status === "pending") {
    return <Loading />;
  }

  if (status === "error") {
    return (
      <div className="my-12 text-center text-red-600">
        Error loading accessories. Please try again later.
      </div>
    );
  }

  return (
    <section className="my-12">
      <h2 className="mb-6 text-2xl font-semibold md:text-3xl">
        Top-selling Physical Products
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((accessory) => (
          <Card
            key={accessory.id}
            className="overflow-hidden rounded-lg bg-gradient-to-b from-[#4d5665] via-[#374152] to-[#374152] shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <Link href={`/product/${accessory.id}`}>
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <img
                    src={accessory.imageUrl}
                    alt={accessory.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-transparent p-4">
                    <h3 className="text-xl font-bold text-white">
                      {accessory.name}
                    </h3>
                    <p className="text-md mt-2 text-gray-300">
                      {accessory.description.length > 100
                        ? `${accessory.description.substring(0, 100)}...`
                        : accessory.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
