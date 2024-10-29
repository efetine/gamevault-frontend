"use client";

import { useQuery } from "@tanstack/react-query";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

import { Card, CardContent } from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import { getProducts } from "~/services/products-service";

export function FeaturedProducts() {
  const { data, status } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      getProducts({
        limit: "8",
      }),
  });

  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  if (status === "error") {
    return <div>Error...</div>;
  }

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  return (
    <section className="my-12">
      <h2 className="mb-6 text-2xl font-semibold md:text-3xl">
        Featured & Recommended
      </h2>
      <Carousel className="w-full" plugins={[plugin.current]}>
        <CarouselContent>
          {data.products.map((product) => (
            <CarouselItem
              key={product.id}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card className="overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                <CardContent className="p-0">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-48 w-full object-cover object-center"
                  />
                  <div className="bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-lg font-bold">{product.name}</h3>
                    <p className="mt-2 text-sm text-gray-300">
                      {product.description.substring(0, 100)}...
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
