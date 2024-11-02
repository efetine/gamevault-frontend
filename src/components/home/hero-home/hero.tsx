"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative flex h-[60vh] w-full items-center justify-center overflow-hidden">
      <img
        src="/horizon.png"
        alt="Hero background"
        className="h-full w-full object-cover"
      />
      <div className="flex h-full items-center bg-gradient-to-tr from-yellow-100/10 to-blue-700/20 px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className=" mb-4 text-3xl font-bold text-gray-700 md:text-4xl lg:text-4xl dark:text-white">
            MORE THAN A HOBBY, IT&apos;S A LIFESTYLE
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-700 md:text-xl lg:text-xl dark:text-white">
            We are the first e-commerce specialist to offer everything related
            to your favorite hobby in one place, from digital games to
            accessories and much more.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
