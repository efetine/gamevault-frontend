'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

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

export default function Component({ images }: ICarouselProps) {
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
    }, 2500);

    return () => {
      clearInterval(timer);
    };
  }, [handleNextClick]);

  return (
    <div id='default-carousel' className='relative w-full sm:mb-8 md:mb-12' data-carousel='slide'>
      <div className='flex flex-col md:flex-row'>
        <div className='relative w-full md:w-[70%] h-56 md:h-96 overflow-hidden rounded-lg'>
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
                index === activeIndex ? 'opacity-100' : 'opacity-0'
              }`}
              data-carousel-item
            >
              <Image
                src={img.imageUrl}
                className='absolute block w-full h-full object-cover'
                alt={img.name}
                width={1000}
                height={1000}
              />
            </div>
          ))}
          <button
            type='button'
            className='absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none'
            data-carousel-prev
            onClick={handlePrevClick}
          >
            <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-tertiary/50 dark:group-hover:bg-secondary-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none'>
              <svg
                className='w-4 h-4 text-white dark:text-tertiary rtl:rotate-180'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 6 10'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M5 1 1 5l4 4'
                />
              </svg>
              <span className='sr-only'>Previous</span>
            </span>
          </button>
          <button
            type='button'
            className='absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none'
            data-carousel-next
            onClick={handleNextClick}
          >
            <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-tertiary/50 dark:group-hover:bg-secondary-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none'>
              <svg
                className='w-4 h-4 text-white dark:text-tertiary rtl:rotate-180'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 6 10'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m1 9 4-4-4-4'
                />
              </svg>
              <span className='sr-only'>Next</span>
            </span>
          </button>
        </div>
        <div className='w-full md:w-[30%] p-4 bg-gray-100 dark:bg-gray-800'>
          <h2 className='text-2xl font-bold mb-2'>{images[activeIndex]?.name}</h2>
          <p className='text-xl font-semibold mb-4'>${images[activeIndex]?.price.toFixed(2)}</p>
          <div className='grid grid-cols-2 gap-2'>
            {images[activeIndex]?.thumbnails
              .slice(0, 4)
              .map((thumb, idx) => (
                <Image
                  key={idx}
                  src={thumb}
                  alt={`Thumbnail ${idx + 1}`}
                  width={100}
                  height={100}
                  className='w-full h-auto object-cover rounded'
                />
              ))}
          </div>
        </div>
      </div>
      <div className='absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse'>
        {images.map((image, index) => (
          <button
            key={image.id}
            type='button'
            className={`w-3 h-3 rounded-full ${index === activeIndex ? 'bg-tertiary' : 'bg-primary'}`}
            aria-current={index === activeIndex}
            aria-label={`Slide ${index + 1}`}
            data-carousel-slide-to={index}
            onClick={() => handleButtonClick(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}
