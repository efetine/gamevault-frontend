'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import { Card, CardContent } from '~/components/ui/card';
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
    <div className="space-y-4">
      <Card className="relative">
        <CardContent className="overflow-hidden p-0">
          <div className="overflow-hidden" ref={emblaMainRef}>
            <div className="flex">
              {images.map((image, index) => (
                <div key={index} className="min-w-0 flex-[0_0_100%]">
                  <div className="relative aspect-video">
                    <img
                      className="h-full w-full object-cover"
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
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 shadow-md transition-colors hover:bg-white"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 shadow-md transition-colors hover:bg-white"
            onClick={scrollNext}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </CardContent>
      </Card>
      <div className="overflow-hidden" ref={emblaThumbsRef}>
        <div className="flex gap-4">
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
        'min-w-0 flex-[0_0_20%] transition-opacity duration-300',
        selected ? 'opacity-100' : 'opacity-50 hover:opacity-75',
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="h-full w-full focus:outline-none"
      >
        <div className="aspect-video overflow-hidden rounded-md">
          <img
            src={image.src}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
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
