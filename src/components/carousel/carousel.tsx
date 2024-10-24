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
    }, 3500);

    return () => {
      clearInterval(timer);
    };
  }, [handleNextClick]);

  return (
    <div id='default-carousel' className='relative w-full sm:mb-8 md:mb-12' data-carousel='slide'>
      <div className='flex flex-col md:flex-row'>
        <div className='relative h-56 w-full overflow-hidden rounded-lg md:h-96 md:w-[70%]'>
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute h-full w-full transition-opacity duration-700 ease-in-out ${
                index === activeIndex ? 'opacity-100' : 'opacity-0'
              }`}
              data-carousel-item
            >
              <Image
                src={img.imageUrl}
                className='absolute block h-full w-full object-cover'
                alt={img.name}
                width={1000}
                height={1000}
              />
            </div>
          ))}
          <button
            type='button'
            className='group absolute start-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none'
            data-carousel-prev
            onClick={handlePrevClick}
          >
            <span className='group-hover:bg-tertiary/50 dark:group-hover:bg-secondary-800/60 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-focus:ring-gray-800/70'>
              <svg
                className='dark:text-tertiary h-4 w-4 text-white rtl:rotate-180'
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
        </div>
        <button
          type='button'
          className='group absolute end-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none'
          data-carousel-next
          onClick={handleNextClick}
        >
          <span className='group-hover:bg-tertiary/50 dark:group-hover:bg-secondary-800/60 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-focus:ring-gray-800/70'>
            <svg
              className='dark:text-tertiary h-4 w-4 text-white rtl:rotate-180'
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
        <div className='w-full bg-gray-100 p-4 dark:bg-gray-800 md:w-[30%]'>
          <h2 className='mb-2 text-2xl font-bold'>{images[activeIndex]?.name}</h2>

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
                  className='h-auto w-full rounded object-cover'
                />
              ))}
          </div>
          <p className='mb-4 text-xl font-semibold'>${images[activeIndex]?.price.toFixed(2)}</p>
        </div>
      </div>
      <div className='absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse'>
        {images.map((image, index) => (
          <button
            key={image.id}
            type='button'
            className={`h-3 w-3 rounded-full ${index === activeIndex ? 'bg-tertiary' : 'bg-primary'}`}
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
