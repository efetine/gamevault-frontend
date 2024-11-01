"use client";

import useEmblaCarousel from "embla-carousel-react";
import * as React from "react";
import { Card, CardContent } from "~/components/ui/card";
import { cn } from "~/lib/utils";

type CarouselProps = {
  images: { src: string; alt: string }[];
  options?: any;
};

export default function EmblaCarousel({ images, options }: CarouselProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  

  const onSelect = React.useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  React.useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    return () => {
      emblaMainApi.off("select", onSelect);
    };
  }, [emblaMainApi, onSelect]);  

  return (
    <div className="space-y-4 ">
      <Card className="relative ">
        <CardContent className="overflow-hidden p-0">
          <div className="overflow-hidden rounded-lg" ref={emblaMainRef}>
            <div className="flex ">
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
        </CardContent>
      </Card>
    </div>
  );
}


