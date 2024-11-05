import { Gamepad2, Home, Layers } from 'lucide-react';
import Link from 'next/link';

import { Button } from '~/components/ui/button';

export function CategoryNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-purple-500">ERROR 404</h1>
          <h2 className="text-3xl font-semibold">Category Not Found!</h2>
          <p className="text-xl">
            This game genre doesn't exist in our universe.
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <Gamepad2 className="h-24 w-24 animate-bounce text-gray-500 dark:text-gray-300" />
          <Layers className="h-24 w-24 animate-pulse text-gray-500 dark:text-gray-300" />
        </div>

        <p className="text-gray-700 dark:text-gray-100">
          Oops! It seems you've stumbled into an undiscovered game world. This
          category has either been warped to another dimension or is yet to be
          created.
        </p>

        <div className="space-y-4 pt-6">
          <Button
            asChild
            className="inline-flex items-center rounded-full border-white px-4 py-2 font-bold"
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go to the menu
            </Link>
          </Button>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-100">
          Lost in the game? Contact our Game Master support team for assistance.
        </p>
      </div>
    </div>
  );
}
