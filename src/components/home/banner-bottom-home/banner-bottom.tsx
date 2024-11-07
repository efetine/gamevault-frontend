import Link from "next/link";
import { Button } from "~/components/ui/button";
import { getCategories } from "~/services/categories-service";

export async function ConsolePromotion() {
  const fetchedCategories = await getCategories({ cursor: null, limit: "20" });

  const consoleCategory = fetchedCategories.data.find(
    (category) => category.name.toLowerCase() === "console",
  );

  if (!consoleCategory) {
    console.error("No products found");
    return null;
  }

  return (
    <section className="relative flex h-[60vh] w-full items-center justify-center overflow-hidden bg-slate-400 dark:bg-transparent sm:h-[40vh] md:h-[60vh]">
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 via-[#4d00993c] to-black/50 opacity-80" />
      <div className="relative z-10 px-4 text-center sm:px-8">
        <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">
          GOT YOUR HANDS ON ONE OF THESE YET?
        </h2>
        <p className="mx-auto mb-8 max-w-lg text-sm text-gray-200 sm:text-base md:text-lg lg:text-xl">
          Discover ultimate power: Explore the most powerful consoles on the
          market and elevate your gaming experience to the next level!
        </p>
        <Link href={`/categories/${consoleCategory.id}`}>
          <Button className="bg-white px-6 py-2 text-sm font-semibold text-blue-600 transition-colors hover:bg-gray-100 sm:px-8 sm:py-3 sm:text-lg">
            Shop Consoles
          </Button>
        </Link>
      </div>
      <img
        src="https://gamerstyle.com.mx/wp-content/uploads/2020/04/Consolas-de-videojuegos.jpg"
        alt="Video game consoles"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
    </section>
  );
}
