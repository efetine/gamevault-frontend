import Link from 'next/link';
import { Card, CardContent } from '~/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '~/components/ui/carousel';
import { getCategories } from '~/services/categories-service';

export async function CategoryBrowser() {
  const fetchedCategories = await getCategories({ cursor: null, limit: '10' });

  return (
    <section className="my-12">
      <div className="mb-6 flex w-full items-center justify-between">
        <h2 className="text-2xl font-semibold md:text-3xl">
          Browse by category
        </h2>
      </div>
      <Carousel
        className="w-full"
        opts={{
          loop: true,
          align: 'start',
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {fetchedCategories.data.map((category) => (
            <CarouselItem
              key={category.id}
              className="pl-2 sm:basis-1/2 md:basis-1/3 md:pl-4 lg:basis-1/4 xl:basis-1/5"
            >
              <Link href={`/categories/${category.id}`}>
                <Card className="overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-primary hover:shadow-lg">
                  <CardContent className="p-0">
                    <div className="group relative flex h-24 w-full items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 to-blue-700 p-4 sm:h-32 md:h-40">
                      <h3 className="z-10 text-center text-sm font-medium capitalize text-white transition-transform duration-300 group-hover:scale-110 sm:text-base md:text-lg">
                        {category.name}
                      </h3>
                      <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-4 flex justify-center sm:justify-end">
          <CarouselPrevious className="mr-2" />
          <CarouselNext />
        </div>
      </Carousel>
    </section>
  );
}
