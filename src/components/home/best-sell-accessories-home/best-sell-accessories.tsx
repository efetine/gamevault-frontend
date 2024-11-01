"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Card, CardContent } from "~/components/ui/card";
import { getProducts } from "~/services/products-service";

export function BestSellingAccessories() {
  const { data, status } = useQuery({
    queryKey: ["products", "physical"],
    queryFn: () =>
      getProducts({
        limit: "16",
        type: "physical",
      }),
  });

  console.log("API Response:", data);

  const physicalProducts = data?.data
    .filter((product) => product.type === "physical")
    .slice(0, 8);

  if (status === "error") {
    return <div>Error...</div>;
  }

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  return (
    <section className="my-12">
      <h2 className="mb-6 text-2xl font-semibold md:text-3xl">
        Best-Selling Accessories
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {physicalProducts?.map((accessory) => (
          <Card
            key={accessory.id}
            className="overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
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
                    <h3 className="text-xl font-bold">{accessory.name}</h3>
                    <p className="text-md mt-2 text-gray-300">
                      {accessory.description}
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
