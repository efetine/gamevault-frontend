import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative flex lg:flex-row flex-col lg:h-[60vh] h-full w-full items-center justify-center overflow-hidden">
      <img
        src="/horizon.png"
        alt="Hero background"
        className="h-full w-full object-cover"
      />
      <div className="flex h-full items-center bg-gradient-to-tr from-[#292e30] to-[#101d3d] p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="mb-4 text-3xl font-bold md:text-5xl lg:text-3xl">
            MORE THAN A HOBBY, IT&apos;S A LIFESTYLE
          </h1>
          <p className="mx-auto max-w-2xl lg:text-base xl:text-lg">
            We are the first e-commerce specialist to offer everything related
            to your favorite hobby in one place, from digital games to
            accessories and much more.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
