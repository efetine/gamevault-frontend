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
        {data.data.map((product) => (
          <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
            <Link href={`/product/${product.id}`}>
              <div className="overflow-hidden rounded-lg">
                <Card className="transform transition-transform duration-300 hover:scale-105">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-48 w-full object-cover"
                      />
                    </div>
                    <div className="bg-gradient-to-t from-black/80 to-transparent p-4 h-[150px] flex flex-col justify-end">
                      <h3 className="text-lg font-bold line-clamp-1">{product.name}</h3>
                      <p className="mt-2 text-sm text-gray-300 line-clamp-2">
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
