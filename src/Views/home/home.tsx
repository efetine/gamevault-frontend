"use client"

import { productsToPreLoad } from "~/helpers/products";


import { Card, CardContent } from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

const HomeView = () => {
  return (
    <div className="w-screen h-screen flex flex-col gap-20 justify-start items-center">
      <div className="w-full flex md:w-full md:h-[40%] lg:h-[40%] p-4 justify-center items-center bg-cover bg-no-repeat bg-[url('https://external-preview.redd.it/-tdsH0dYAyxmliFvvlrqfSQ-9i_Nqsqobi9c7Zwgznc.jpg?auto=webp&s=5dc0d71cdcd8dcca22d9eeee3ce500f45a66403c')] relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 to-black/60"></div>
        <p className="flex flex-col gap-10 text-lg md:text-2xl lg:text-2xl text-center text-white z-10 relative">
          <span className="text-3xl font-bold lg:text-6xl">
            MORE THAN A HOBBY, IT&apos;S A LIFESTYLE
          </span>
          <span>
            We are the first e-commerce specialist to offer everything related
            to your favorite hobby in one place, from digital games to
            accessories and much more.
          </span>
        </p>
      </div>
      <div className="flex w-[60%] justify-center items-center  mb-10 ">
        <Carousel className="w-full">
          <CarouselContent>
            {productsToPreLoad.map((product) => (
              <CarouselItem key={product.id}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-auto items-center justify-center p-6">
                      <div>
                        <img 
                        className="max-h-[300px] rounded-sm" 
                        src={product.imageUrl} 
                        alt={product.name} />

                      </div>
                    </CardContent>
                  </Card>
                </div>
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
