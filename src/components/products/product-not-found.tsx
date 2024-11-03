import { Gamepad2, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export function ProductNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-purple-500">ERROR 404</h1>
          <h2 className="text-3xl font-semibold text-white">Game Over!</h2>
          <p className="text-xl text-gray-300">
            The product you're looking for is not on this level.
          </p>
        </div>

        <div className="flex justify-center">
          <Gamepad2 className="h-32 w-32 animate-pulse text-gray-500" />
        </div>

        <p className="text-gray-400">
          Looks like you've found a glitch in the matrix. This product has
          teleported to another dimension or never existed.
        </p>

        <div className="pt-6">
          <Button
            asChild
            className="inline-flex items-center rounded-full px-4 py-2 font-bold"
          >
            <Link href="/products">
              <Home className="mr-2 h-4 w-4" />
              Go to products
            </Link>
          </Button>
        </div>

        <p className="text-sm text-gray-500">
          Need help? Contact our player support team.
        </p>
      </div>
    </div>
  );
}
