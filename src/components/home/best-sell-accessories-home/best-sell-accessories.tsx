import { useQuery } from "@tanstack/react-query";

import { Card, CardContent } from "~/components/ui/card";
import { getProducts } from "~/services/products-service";

const servicesToPreLoad = [
  {
    id: 1,
    name: "Video Games",
    price: 25,
    description:
      "Wide variety of video games from digital copies to great classics in physical.",
    imageUrl:
      "https://preview.redd.it/your-favorite-game-from-2011-v0-t2cheorxu5ic1.jpeg?width=640&crop=smart&auto=webp&s=42c11a4521b601562b3afa41e8f77b90a767c0ac",
  },
  {
    id: 2,
    name: "Consoles",
    price: 19,
    description: "Wide range of consoles",
    imageUrl:
      "https://erikstore.com/blog/wp-content/uploads/2024/04/BannerBlog_CONSOLAS_EVOLUCION.webp",
  },
  {
    id: 3,
    name: "Accessories",
    price: 21,
    description:
      "Large selection of accessories that enhance the gaming experience on any platform.",
    imageUrl:
      "https://www.gamerpoint.com.mx/cdn/shop/collections/accesorios_y_consolas.webp?v=1655923939&width=2048",
  },
  {
    id: 4,
    name: "Cards",
    price: 21,
    description:
      "Large selection of accessories that enhance the gaming experience on any platform.",
    imageUrl: "https://gameflip.com/img/front/overview_giftcards_header.webp",
  },
];

export function BestSellingAccessories() {
  const { data, status } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      getProducts({
        limit: "8",
      }),
  });

  if (status === "error") {
    return <div>Error...</div>;
  }

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  return (
    <section className="my-12">
      <h2 className="mb-6 text-2xl font-semibold md:text-3xl">
        Best-Selling Accessories
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {servicesToPreLoad.map((accessory) => (
          <Card
            key={accessory.id}
            className="overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <CardContent className="p-0">
              <div className="relative aspect-square">
                <img
                  src={accessory.imageUrl}
                  alt={accessory.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-transparent p-4">
                  <h3 className="text-xl font-bold">{accessory.name}</h3>
                  <p className="text-md mt-2 text-gray-300">
                    {accessory.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
