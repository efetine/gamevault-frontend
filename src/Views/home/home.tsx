"use client";

import * as React from "react";

import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "~/components/ui/card";
import { servicesToPreLoad } from "~/helpers/products";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

const categoryColors = {
  1: "from-red-800",
  2: "from-blue-800",
  3: "from-green-800",
  4: "from-yellow-800",
};

const HomeView = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  );
  return (
    <div className="flex h-screen w-full flex-col items-center justify-start gap-20">
      <div className="relative flex w-full items-center justify-center bg-[url('https://external-preview.redd.it/-tdsH0dYAyxmliFvvlrqfSQ-9i_Nqsqobi9c7Zwgznc.jpg?auto=webp&s=5dc0d71cdcd8dcca22d9eeee3ce500f45a66403c')] bg-cover bg-no-repeat p-4 md:h-[40%] md:w-full lg:h-[40%]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 to-black/60"></div>
        <p className="relative z-10 flex flex-col gap-10 text-center text-lg text-white md:text-2xl lg:text-2xl">
          <span className="text-3xl font-bold lg:text-6xl">
            MORE THAN A HOBBY, IT&apos;S A LIFESTYLE
          </span>
          <span>
            WE ARE THE FIRST E-COMMERCE SPECIALIST TO OFFER EVERYTHING RELATED
            TO YOUR FAVORITE HOBBY IN ONE PLACE, FROM DIGITAL GAMES TO
            ACCESSORIES AND MUCH MORE.
          </span>
        </p>
      </div>
      <div className="mb-10 flex w-[60%] items-center justify-center p-2">
        <Carousel className="w-full" plugins={[plugin.current]}>
          <CarouselContent>
            {servicesToPreLoad.map((product) => (
              <CarouselItem
                className="md:basis-1/2 lg:basis-1/3"
                key={product.id}
              >
                <Card className="overflow-hidden">
                  <CardContent className="relative aspect-[4/3] p-0">
                    <img
                      className="h-full w-full object-cover"
                      src={product.imageUrl}
                      alt={product.name}
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-tr ${categoryColors[product.id as keyof typeof categoryColors]} flex items-end to-black/35 p-4`}
                    >
                      <h2 className="text-xl font-bold text-white">
                        {product.name}
                      </h2>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default HomeView;
