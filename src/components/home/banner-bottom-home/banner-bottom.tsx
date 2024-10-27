import Link from "next/link";
import { Button } from "../../ui/button";

export function ConsolePromotion() {
  return (
    <section className="relative flex w-full items-center justify-center overflow-hidden flex-col-reverse lg:flex-row">
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 via-[#4d00993c] to-black/50" />
      <div className="relative text-center lg:p-2 p-8 ">
        <h2 className="mb-4 text-4xl font-bold text-3xl text-gray-800 dark:text-gray-300">
          GOT YOUR HANDS ON ONE OF THESE YET?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg md:text-lg text-gray-700 dark:text-gray-300">
          Discover ultimate power: Explore the most powerful consoles on the
          market and elevate your gaming experience to the next level!
        </p>
        <Link href="/products">
          <Button className="bg-white px-8 py-3 text-lg font-semibold text-blue-600 transition-colors hover:bg-gray-100">
            Shop Consoles
          </Button>
        </Link>
      </div>
      <img
        src="https://gamerstyle.com.mx/wp-content/uploads/2020/04/Consolas-de-videojuegos.jpg"
        alt="Video game consoles"
      />
    </section>
  );
}
