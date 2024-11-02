'use client';

import {
  GamepadIcon,
  ShieldCheckIcon,
  ShoppingBasket,
  ShoppingCart,
} from 'lucide-react';
import React from 'react';

import { Separator } from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import { Product } from '~/schemas/product-schema';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import EmblaCarousel from './slider';

const OPTIONS = {};

export const ProductDetailPage: React.FC<Product> = ({
  price,
  description,
  type,
  name,
  imageUrl,
  categoryId,
}) => {
  const productImages = Array(1).fill({ src: imageUrl, alt: name });

  return (
    <div className="mx-auto w-full bg-gradient-to-b from-[#0d1117] via-[#212c3f] to-black px-4 py-8">
      <div className="m-auto mt-32 flex w-[70%] flex-col gap-8 md:flex-row">
        <div className="w-full md:w-3/5">
          <h2 className="mb-4 text-2xl font-bold capitalize">{name}</h2>
          <div className="mb-6">
            <EmblaCarousel images={productImages} options={OPTIONS} />
          </div>
          <div>
            <h3 className="mb-2 text-2xl font-bold capitalize">Description:</h3>
            <p className="text-gray-600 dark:text-gray-400">{description}</p>
          </div>
        </div>
        <div className="w-full pt-[52px] md:w-2/5">
          <Card className="bg-gradient-to-t from-[#161616] to-[#1a1a1a]">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold capitalize">
                    {name}
                  </CardTitle>
                  {/* <p className="text-sm text-muted-foreground">
                    Category: {categoryId}
                  </p> */}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-right">
                  <p className="text-2xl font-bold text-emerald-600">
                    ${price.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground line-through">
                    ${(price + price * 0.2).toFixed(2)}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center space-x-2">
                  <GamepadIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="capitalize">Product: {type}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheckIcon className="h-4 w-4 text-muted-foreground" />
                  <span>14-day refund</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full bg-gradient-to-b from-emerald-700 to-emerald-800 text-white hover:from-emerald-800 hover:to-emerald-900">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to cart
              </Button>
              <Link href="/">
                <Button className="w-full bg-gradient-to-b from-emerald-700 to-emerald-800 text-white hover:from-emerald-800 hover:to-emerald-900">
                  <ShoppingBasket className="mr-2 h-5 w-5" />
                  Continue shopping
                </Button>
              </Link>
              <p className="text-center text-xs text-muted-foreground">
                Secure payment processed by Mercado Pago. We don&apos;t store
                your financial information.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
