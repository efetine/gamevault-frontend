"use client";

import * as React from "react";

import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "~/components/ui/card";
import { productsToPreLoad, servicesToPreLoad } from "~/helpers/products";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
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
    <div className="w-full h-full flex flex-col justify-start items-center ">
      <div className="w-full flex md:w-full md:h-[40%] lg:h-[400px] p-4 justify-center items-center bg-cover bg-no-repeat bg-[url('https://external-preview.redd.it/-tdsH0dYAyxmliFvvlrqfSQ-9i_Nqsqobi9c7Zwgznc.jpg?auto=webp&s=5dc0d71cdcd8dcca22d9eeee3ce500f45a66403c')] relative ">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-500/90 to-black/80"></div>
        <p className="flex flex-col gap-10 text-md md:text-2xl lg:text-xl text-center text-white z-10 relative">
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
      <div className=" w-full md:w-full flex flex-col  my-20 justify-center items-center ">
        <div className="w-full flex flex-col lg:w-[60%] justify-center items-center  mb-20 p-2">
          <div className="w-full pb-3 ">
            <h1 className="text-xl font-semibold lg:text-2xl lg:mb-2">
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
                    <CardContent className="p-0 relative aspect-[4/3]">
                      <img
                        className=" w-full h-full object-cover"
                        src={product.imageUrl}
                        alt={product.name}
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-tr from-black/50 to-slate-400/40 flex items-end p-4"
                      >
                        <h2 className="text-white text-xl font-bold">
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
        <div className="w-full flex flex-col lg:w-[60%] justify-center items-center  mb-5 p-2 ">
          <div className="w-full pb-3 ">
            <h1 className="text-xl font-semibold lg:text-2xl lg:mb-2">
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
                    <CardContent className="p-0 relative aspect-[4/3]">
                      <img
                        className=" w-full h-full object-cover"
                        src={product.imageUrl}
                        alt={product.name}
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-tr ${categoryColors[product.id as keyof typeof categoryColors]} to-black/40 flex items-end p-4`}
                      >
                        <h2 className="text-white text-xl font-bold">
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
