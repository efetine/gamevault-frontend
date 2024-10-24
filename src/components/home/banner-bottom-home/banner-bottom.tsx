import Link from "next/link";
import { Button } from "../../ui/button";

export function ConsolePromotion() {
  return (
    <section className="relative flex h-[60vh] w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 via-[#4d00993c] to-black/50" />
      <div className="relative z-10 text-center">
        <h2 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
          GOT YOUR HANDS ON ONE OF THESE YET?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg md:text-xl lg:text-2xl">
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
