import { servicesToPreLoad } from "~/helpers/products";
import { Card, CardContent } from "../ui/card";

export function BestSellingAccessories() {    
  
    return (
      <section className="my-12">
        <h2 className="mb-6 text-2xl font-semibold md:text-3xl">Best-Selling Accessories</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {servicesToPreLoad.map((accessory) => (
            <Card key={accessory.id} className="overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <img
                    src={accessory.imageUrl}
                    alt={accessory.name}
                    className="h-full w-full object-cover"
                    
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end">
                    <h3 className="text-xl font-bold">{accessory.name}</h3>
                    <p className="mt-2 text-sm text-gray-300">{accessory.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    )
  }