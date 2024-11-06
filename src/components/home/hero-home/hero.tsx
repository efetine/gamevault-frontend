"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative h-full w-full overflow-hidden">
      <div className="flex flex-col lg:h-[60vh] lg:flex-row">
        <div className="relative h-[30vh] w-full lg:h-full lg:w-3/4">
          <img
            src="/horizon.png"
            alt="Hero background"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex w-full items-center justify-center bg-gradient-to-tr from-yellow-100/10 to-blue-700/20 p-8 lg:w-1/4 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="mb-4 text-xl font-bold text-gray-700 dark:text-white sm:text-3xl lg:text-4xl">
              MORE THAN A HOBBY, IT&apos;S A LIFESTYLE
            </h1>
            <p className="mx-auto max-w-2xl text-sm text-gray-700 dark:text-white sm:text-lg lg:mx-0 lg:text-xl">
              We are the first e-commerce specialist to offer everything related
              to your favorite hobby in one place, from digital games to
              accessories and much more.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
