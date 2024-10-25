'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  }, [images.length]);

  const handleNextClick = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
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
    <div className="w-full  mx-auto py-4 ">
      <div className="flex flex-col md:flex-row gap-6 ">
        <div className="relative w-full md:w-2/3 aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 rounded-md transition-opacity duration-700 ease-in-out ${
                index === activeIndex ? 'opacity-100' : 'opacity-0'
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
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
            onClick={handlePrevClick}
          >
            <ChevronLeft className="w-6 h-6" />
            <span className="sr-only">Anterior</span>
          </button>
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
            onClick={handleNextClick}
          >
            <ChevronRight className="w-6 h-6" />
            <span className="sr-only">Siguiente</span>
          </button>
        </div>
        <div className="w-full md:w-1/3 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{images[activeIndex]?.name}</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {images[activeIndex]?.thumbnails.slice(0, 4).map((thumb, idx) => (
              <div key={idx} className="aspect-square relative overflow-hidden rounded-md shadow">
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
          <p className="text-3xl font-bold text-primary mb-6">${images[activeIndex]?.price.toFixed(2)}</p>
          <button className=" w-[150px] bg-slate-400 text-primary py-3 rounded-lg font-semibold hover:bg-slate-300 transition-colors">
            Lo más vendido
          </button>
        </div>
      </div>
      <div className="flex justify-center mt-6 space-x-2">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            className={`w-3 h-3 rounded-full transition-colors ${
              index === activeIndex ? 'bg-white' : 'bg-gray-500 hover:bg-gray-400'
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