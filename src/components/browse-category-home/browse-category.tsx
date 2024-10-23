import Link from "next/link";
import { categoriesBrowser } from "~/helpers/products";
import { Card, CardContent } from "../ui/card";

const categoryColors = {
    1: "from-blue-800/50",
    2: "from-red-800/50",
    3: "from-green-800/50",
    4: "from-yellow-800/50",
  }

export function CategoryBrowser() {
      
    return (
      <section className="my-12">
        <h2 className="mb-6 text-2xl font-semibold md:text-3xl">Browse by category</h2>
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
                    <div className={`absolute inset-0 bg-gradient-to-tr ${categoryColors[category.id as keyof typeof categoryColors]} to-black/40 p-4 flex items-end`}>
                      <h3 className="text-xl font-bold">{category.name}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    )
  }