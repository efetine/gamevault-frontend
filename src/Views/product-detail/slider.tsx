'use client';

import useEmblaCarousel from 'embla-carousel-react';
import * as React from 'react';
import { Card, CardContent } from '~/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '~/lib/utils';

type CarouselProps = {
  images: { src: string; alt: string }[];
  options?: any;
};

export default function EmblaCarousel({ images, options }: CarouselProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const onThumbClick = React.useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = React.useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  React.useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on('select', onSelect);
    return () => {
      emblaMainApi.off('select', onSelect);
    };
  }, [emblaMainApi, onSelect]);

  const scrollPrev = React.useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollPrev();
  }, [emblaMainApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollNext();
  }, [emblaMainApi]);

  return (
    <div className='space-y-4'>
      <Card className="relative">
        <CardContent className='p-0 overflow-hidden'>
          <div className='overflow-hidden' ref={emblaMainRef}>
            <div className='flex'>
              {images.map((image, index) => (
                <div key={index} className='flex-[0_0_100%] min-w-0'>
                  <div className='relative aspect-video'>
                    <img 
                      className='object-cover w-full h-full' 
                      src={image.src} 
                      alt={image.alt}
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 p-2 rounded-full shadow-md hover:bg-white transition-colors"
            onClick={scrollPrev}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 p-2 rounded-full shadow-md hover:bg-white transition-colors"
            onClick={scrollNext}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </CardContent>
      </Card>
      <div className='overflow-hidden' ref={emblaThumbsRef}>
        <div className='flex gap-4'>
          {images.map((image, index) => (
            <Thumb 
              key={index} 
              onClick={() => onThumbClick(index)} 
              selected={index === selectedIndex} 
              image={image} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

type ThumbProps = {
  selected: boolean;
  image: { src: string; alt: string };
  onClick: () => void;
};

function Thumb({ selected, image, onClick }: ThumbProps) {
  return (
    <div 
      className={cn(
        'flex-[0_0_20%] min-w-0 transition-opacity duration-300',
        selected ? 'opacity-100' : 'opacity-50 hover:opacity-75'
      )}
    >
      <button 
        onClick={onClick} 
        type='button' 
        className='w-full h-full focus:outline-none'
      >
        <div className="aspect-video rounded-md overflow-hidden">
          <img 
            src={image.src} 
            className='object-cover w-full h-full transition-transform duration-300 hover:scale-110' 
            width={100} 
            height={100} 
            alt={image.alt}
            loading="lazy"
          />
        </div>
      </button>
    </div>
  );
}