"use client";

import Link from "next/link";
import { ConsolePromotion } from "~/components/banner-bottom-home/banner-bottom";
import { BestSellingAccessories } from "~/components/best-sell-accessories-home/best-sell-accessories";
import { CategoryBrowser } from "~/components/browse-category-home/browse-category";
import { ExploreButtons } from "~/components/explore-buttons-home/explore-buttons";
import { FeaturedProducts } from "~/components/featured-home/featured";
import { HeroSection } from "~/components/hero-home/hero";
import { Button } from "~/components/ui/button";

export default function HomeView() {
  
return (
  <div className="flex min-h-screen w-full flex-col items-center justify-start bg-gradient-to-b from-[#0d1117] via-[#1a2332] to-black text-white">
    <HeroSection />
    <main className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <FeaturedProducts />
      <CategoryBrowser />
      <div>
      <section className="my-12 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center shadow-lg">
      <h2 className="mb-4 text-2xl font-bold">Log in to see personalized recommendations</h2>
      <Link href="/api/auth/signin">
        <Button className="bg-white px-8 py-2 text-lg font-semibold text-blue-600 transition-colors hover:bg-gray-100">
          Login
        </Button>
      </Link>
      <p className="mt-4 text-lg">
        or{" "}
        <Link href="/auth/register" className="font-bold underline hover:text-gray-200">
          register
        </Link>{" "}
        and see all we offer.
      </p>
    </section>
      </div>
      <BestSellingAccessories />
      <ExploreButtons />
    </main>
    <ConsolePromotion />
  </div>
)
}

