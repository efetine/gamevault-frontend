"use client";

import { useQuery } from "@tanstack/react-query";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
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
        limit: "10",
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
    <section className="my-12 overflow-hidden">
      <h2 className="mb-6 text-2xl font-semibold md:text-3xl">
        Featured & Recommended
      </h2>
      <Carousel className="w-full" plugins={[plugin.current]}>
        <CarouselContent className="-ml-2 md:-ml-4">
          {data.data.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3"
            >
              <Link href={`/product/${product.id}`}>
                <div className="overflow-visible p-1">
                  <Card className="transform bg-gradient-to-b from-[#4d5665] via-[#374152] to-[#374152] transition-transform duration-300 hover:scale-105">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-48 w-full rounded-t-lg object-cover"
                        />
                      </div>
                      <div className="flex h-[150px] flex-col justify-end rounded-b-lg bg-gradient-to-t from-black/80 to-transparent p-4">
                        <h3 className="line-clamp-1 text-lg font-bold">
                          {product.name}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-sm text-gray-300">
                          {product.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
