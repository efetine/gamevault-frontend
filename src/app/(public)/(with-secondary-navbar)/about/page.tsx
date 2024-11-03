"use client";

import { Award, Gamepad2, Globe, Users } from "lucide-react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1117] via-[#1a2332] to-black text-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden pt-5">
          <div className="absolute inset-0 z-0">
            <div className="h-[700px] w-full">
              <Image
                src="/fondo-about.jpg"
                alt="Background"
                layout="fill"
                objectFit="cover"
              />
              <div
                className="absolute inset-0 bg-blue-600 bg-opacity-50"
                aria-hidden="true"
              ></div>
            </div>
          </div>
          <div className="container relative mx-auto px-4 pb-24 pt-40">
            <div className="max-w-2xl">
              <h2 className="mb-6 text-xl font-extrabold uppercase leading-8 tracking-wider">
                ABOUT GAME VAULT
              </h2>
              <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                Your Ultimate Source for Digital Entertainment
              </h1>
              <p className="mb-8 max-w-lg text-lg font-normal leading-relaxed text-gray-300 md:text-xl">
                Let's discover the joy of gaming together! Whether on PC,
                consoles, or mobile devices, we've got you covered with the best
                products at affordable prices.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12 grid gap-6 pt-9 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <Gamepad2 className="mb-2 h-10 w-10 text-primary" />
              <CardTitle>Games</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Enjoy your games with affordable deals on over 10,000 available
                games.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Users className="mb-2 h-10 w-10 text-primary" />
              <CardTitle>Active Community</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Join millions of players in our global community.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Globe className="mb-2 h-10 w-10 text-primary" />
              <CardTitle>Global Delivery</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Instant delivery of game codes anywhere in the world.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Award className="mb-2 h-10 w-10 text-primary" />
              <CardTitle>Quality Guarantee</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                All our products are 100% original and guaranteed.
              </CardDescription>
            </CardContent>
          </Card>
        </section>
        <section className="mb-12 flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex max-w-xl flex-col justify-center">
            <h2 className="mb-4 text-3xl font-bold">Who We Are</h2>
            <p className="text-justify text-lg text-muted-foreground">
              At Game Vault, we are passionate about video games and technology.
              Our mission is to provide players worldwide with easy, fast access
              to the best titles on the market. With years of experience in the
              industry, our team is committed to delivering exceptional service
              and a seamless shopping experience.
            </p>
            <p className="mt-4 text-justify text-lg text-muted-foreground">
              We take pride in being more than just an online store; we are a
              community of gamers who share the same passion. Our deep knowledge
              of the gaming world allows us to offer personalized
              recommendations and stay at the forefront of the latest trends and
              releases.
            </p>
          </div>
          <div className="relative h-[300px] w-full max-w-[300px] overflow-hidden">
            <div className="absolute inset-0 overflow-hidden rounded-bl-[40%] rounded-br-3xl rounded-tl-3xl rounded-tr-[40%] bg-black">
              <Image
                src="/logo.jpg"
                alt="Game Vault Team"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
