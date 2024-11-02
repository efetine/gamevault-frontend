import Link from 'next/link';

import { Card, CardContent } from '~/components/ui/card';

export const categoriesBrowser = [
  {
    id: 1,
    name: 'Action',
    imageUrl:
      'https://sm.ign.com/t/ign_es/screenshot/default/wallpapersden_rasy.1200.jpg?height=300&width=400',
  },
  {
    id: 2,
    name: 'Adventure',
    imageUrl:
      'https://media.revistagq.com/photos/645dde361c98f4b147443172/16:9/w_2560%2Cc_limit/100%2520mejores%2520videojuegos%2520gq.png?height=300&width=400',
  },
  {
    id: 3,
    name: 'RPG',
    imageUrl:
      'https://intef.es/wp-content/uploads/2021/05/03_RPG.jpg?height=300&width=400',
  },
  {
    id: 4,
    name: 'Strategy',
    imageUrl:
      'https://e.rpp-noticias.io/xlarge/2020/04/14/265926_927757.jpg?height=300&width=400',
  },
];

const categoryColors = {
  1: 'from-blue-800/70',
  2: 'from-red-800/70',
  3: 'from-green-800/70',
  4: 'from-yellow-800/70',
};

export function CategoryBrowser() {
  return (
    <section className="my-12">
      <h2 className="mb-6 text-2xl font-semibold md:text-3xl">
        Browse by category
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categoriesBrowser.map((category) => (
          <Link href={`/category/${category.id}`} key={category.id}>
            <Card className="overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="h-full w-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-tr ${categoryColors[category.id as keyof typeof categoryColors]} flex items-end to-black/40 p-4`}
                  >
                    <h3 className="text-xl font-bold">{category.name}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
