import Link from "next/link";
import { Button } from "../../ui/button";

export function ExploreButtons() {
  const categories = ["Games", "Consoles", "Accessories", "Cards"];
  return (
    <section className="my-12">
      <h2 className="mb-6 text-2xl font-semibold md:text-3xl">
        Dive into Pixel Games
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link href={`/category/${category.toLowerCase()}`} key={category}>
            <Button className="h-20 w-full bg-gradient-to-r from-blue-600 to-blue-800 text-lg font-semibold shadow-md shadow-slate-700 transition-all hover:from-blue-500 hover:to-blue-700 hover:text-[#dad9dc] hover:shadow-lg hover:shadow-slate-700">
              {category}
            </Button>
          </Link>
        ))}
      </div>
    </section>
  );
}
