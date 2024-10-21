"use client";

import * as React from "react";

import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "~/components/ui/card";
import { productsToPreLoad, servicesToPreLoad } from "~/helpers/products";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";

const categoryColors = {
  1: "from-blue-800/50",
  2: "from-red-800/50",
  3: "from-green-800/50",
  4: "from-yellow-800/50",
};

const HomeView = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true }),
  );
  return (
    <div className="flex h-full w-full flex-col items-center justify-start">
      <div className="relative flex w-full items-center justify-center bg-[url('https://external-preview.redd.it/-tdsH0dYAyxmliFvvlrqfSQ-9i_Nqsqobi9c7Zwgznc.jpg?auto=webp&s=5dc0d71cdcd8dcca22d9eeee3ce500f45a66403c')] bg-cover bg-no-repeat p-4 md:h-[40%] md:w-full lg:h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-500/90 to-black/80"></div>
        <p className="text-md relative z-10 flex flex-col gap-10 text-center text-white md:text-2xl lg:text-xl">
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

      {/*//!Recomendados y destacados */}
      <div className="my-20 flex w-full flex-col items-center justify-center md:w-full">
        <div className="mb-20 flex w-full flex-col items-center justify-center p-2 lg:w-[60%]">
          <div className="w-full pb-3">
            <h1 className="text-xl font-semibold lg:mb-2 lg:text-2xl">
              Recomendados y destacados
            </h1>
          </div>

          <Carousel className="w-full">
            <CarouselContent>
              {productsToPreLoad.map((product) => (
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
                      <div className="absolute inset-0 flex items-end bg-gradient-to-tr from-black/50 to-slate-400/40 p-4">
                        <h2 className="text-xl font-bold text-white">
                          {product.name}
                        </h2>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/*//!Explorar por categoría */}
        <div className="mb-5 flex w-full flex-col items-center justify-center p-2 lg:w-[60%]">
          <div className="w-full pb-3">
            <h1 className="text-xl font-semibold lg:mb-2 lg:text-2xl">
              Explorar por categoría
            </h1>
          </div>
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
                        className={`absolute inset-0 bg-gradient-to-tr ${categoryColors[product.id as keyof typeof categoryColors]} flex items-end to-black/40 p-4`}
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
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
