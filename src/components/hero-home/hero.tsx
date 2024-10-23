
import { motion } from "framer-motion"
import Image from "next/image"

export function HeroSection() {
    return (
      <section className="relative flex h-[60vh] w-full items-center justify-center overflow-hidden">
        <img
          src="https://external-preview.redd.it/-tdsH0dYAyxmliFvvlrqfSQ-9i_Nqsqobi9c7Zwgznc.jpg?auto=webp&s=5dc0d71cdcd8dcca22d9eeee3ce500f45a66403c"
          alt="Hero background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/90 to-slate-700/90" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            MORE THAN A HOBBY, IT&apos;S A LIFESTYLE
          </h1>
          <p className="mx-auto max-w-2xl text-lg md:text-xl lg:text-2xl">
            WE ARE THE FIRST E-COMMERCE SPECIALIST TO OFFER EVERYTHING RELATED TO YOUR FAVORITE HOBBY IN ONE PLACE, FROM DIGITAL GAMES TO ACCESSORIES AND MUCH MORE.
          </p>
        </motion.div>
      </section>
    )
  }