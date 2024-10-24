'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import * as React from 'react';
import { Card, CardContent } from '~/components/ui/card';

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

  return (
    <div className='space-y-4'>
      <Card>
        <CardContent className='p-0 overflow-hidden'>
          <div className='overflow-hidden' ref={emblaMainRef}>
            <div className='flex'>
              {images.map((image, index) => (
                <div key={index} className='flex-[0_0_100%] min-w-0'>
                  <div className='relative aspect-video'>
                    <Image fill className='object-cover' src={image.src} alt={image.alt} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      <div className='overflow-hidden' ref={emblaThumbsRef}>
        <div className='flex gap-8 '>
          {images.map((image, index) => (
            <Thumb key={index} onClick={() => onThumbClick(index)} selected={index === selectedIndex} image={image} />
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
    <div className={'flex-[0_0_15%] min-w-0 '.concat(selected ? ' embla-thumbs__slide--selected' : '')}>
      <button onClick={onClick} type='button' className=' w-full h-full'>
        <Image src={image.src} className='object-cover w-full h-full' width={100} height={100} alt={image.alt} />
      </button>
    </div>
  );
}
