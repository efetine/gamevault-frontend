import Link from "next/link";

import { ConsolePromotion } from "~/components/home/banner-bottom-home/banner-bottom";
import { BestSellingAccessories } from "~/components/home/best-sell-accessories-home/best-sell-accessories";
import { CategoryBrowser } from "~/components/home/browse-category-home/browse-category";
import { FeaturedProducts } from "~/components/home/featured-home/featured";
import { HeroSection } from "~/components/home/hero-home/hero";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";

const HomePage = async () => {
  const session = await getServerAuthSession();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start from-[#0d1117] via-[#1a2332] to-black text-white dark:bg-gradient-to-b lg:mt-20">
      <HeroSection />
      <main className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <FeaturedProducts />
        <CategoryBrowser />
        {session ? null : (
          <div>
            <section className="my-12 rounded-lg bg-gradient-to-r from-purple-950/60 via-cyan-800/60 to-slate-800 p-8 text-center shadow-lg">
              <h2 className="mb-4 text-2xl font-bold">
                Log in to see personalized recommendations
              </h2>
              <Link href="/api/auth/signin">
                <Button className="bg-white px-8 py-2 text-lg font-semibold text-blue-600 transition-colors hover:bg-gray-200">
                  Login
                </Button>
              </Link>
              <p className="mt-4 text-lg">
                or{" "}
                <Link
                  href="/auth/register"
                  className="font-semibold underline hover:text-gray-200"
                >
                  register
                </Link>{" "}
                and see all we offer.
              </p>
            </section>
          </div>
        )}
        <BestSellingAccessories />
        {/* <ExploreButtons /> */}
      </main>
      <ConsolePromotion />
    </div>
  );
};

export default HomePage;
