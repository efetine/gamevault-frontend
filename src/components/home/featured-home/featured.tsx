import * as React from "react";

import Autoplay from "embla-carousel-autoplay";
import { productsToPreLoad } from "~/helpers/products";
import { Card, CardContent } from "../../ui/card";
import { Carousel, CarouselContent, CarouselItem } from "../../ui/carousel";

export function FeaturedProducts() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  );
  return (
    <section className="my-12">
      <h2 className="mb-6 text-2xl font-semibold md:text-3xl text-gray-800 dark:text-gray-300	">
        Featured & Recommended
      </h2>
      <Carousel className="w-full" plugins={[plugin.current]}>
        <CarouselContent>
          {productsToPreLoad.map((product) => (
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
