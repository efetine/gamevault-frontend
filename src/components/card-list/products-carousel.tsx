"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export interface ICarouselImageProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  thumbnails: string[];
}

export interface ICarouselProps {
  images: ICarouselImageProps[];
}

export default function ProductsCarousel({ images }: ICarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleButtonClick = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handlePrevClick = useCallback(() => {
    setActiveIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1,
    );
  }, [images.length]);

  const handleNextClick = useCallback(() => {
    setActiveIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0,
    );
  }, [images.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextClick();
    }, 8000);

    return () => {
      clearInterval(timer);
    };
  }, [handleNextClick]);

  return (
    <div className="mx-auto w-full py-4">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-lg md:w-2/3">
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 rounded-md transition-opacity duration-700 ease-in-out ${
                index === activeIndex ? "opacity-100" : "opacity-0"
              }`}
              data-carousel-item
            >
              <Image
                src={img.imageUrl}
                alt={img.name}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
          <button
            type="button"
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/75"
            onClick={handlePrevClick}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Anterior</span>
          </button>
          <button
            type="button"
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/75"
            onClick={handleNextClick}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Siguiente</span>
          </button>
        </div>
        <div className="w-full rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 md:w-1/3">
          <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">
            {images[activeIndex]?.name}
          </h2>
          <div className="mb-6 grid grid-cols-2 gap-4">
            {images[activeIndex]?.thumbnails.slice(0, 4).map((thumb, idx) => (
              <div
                key={idx}
                className="relative aspect-square overflow-hidden rounded-md shadow"
              >
                <Image
                  src={thumb}
                  alt={`Miniatura ${idx + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-110"
                />
              </div>
            ))}
          </div>
          <p className="mb-6 text-3xl font-bold text-primary">
            ${images[activeIndex]?.price.toFixed(2)}
          </p>
          <button className="w-[150px] rounded-lg bg-slate-400 py-3 font-semibold text-primary transition-colors hover:bg-slate-300">
            Lo más vendido
          </button>
        </div>
      </div>
      <div className="mt-6 flex justify-center space-x-2">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            className={`h-3 w-3 rounded-full transition-colors ${
              index === activeIndex
                ? "bg-white"
                : "bg-gray-500 hover:bg-gray-400"
            }`}
            aria-current={index === activeIndex}
            aria-label={`Diapositiva ${index + 1}`}
            onClick={() => handleButtonClick(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}
