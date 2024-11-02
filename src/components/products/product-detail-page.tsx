'use client';

import { Separator } from '@radix-ui/react-dropdown-menu';
import {
  CreditCardIcon,
  GamepadIcon,
  PackageIcon,
  ShieldCheckIcon,
  StarIcon,
} from 'lucide-react';
import React from 'react';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';

import { Progress } from '~/components/ui/progress';
import { Product } from '~/schemas/product-schema';
import EmblaCarousel from './slider';
const OPTIONS = {};

export const ProductDetailPage: React.FC<Product> = ({
  price,
  description,
  type,
  stock,
  name,
  imageUrl,
  category,
}) => {
  const stockPercentage = (stock / 100) * 100;
  const lowStock = stockPercentage <= 20;

  //!La imagen se repite mientras se cargan más en el back
  const productImages = Array(10).fill({ src: imageUrl, alt: name });

  return (
    <div
      className={
        'flex h-full w-full flex-row justify-center gap-12 bg-gradient-to-b from-[#0d1117] via-[#212c3f] to-black pb-14 md:flex-col'
      }
    >
      <div className="flex w-[60%] flex-row">
        <div className="w-[60%] p-4">
          <div>
            <h2 className="text-3xl font-bold capitalize">{name}</h2>
            <div className="mb-5 mt-2.5 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <StarIcon className="h-5 w-5 text-yellow-500" />
                <span className="font-semibold">4.8</span>
                <span className="text-muted-foreground">(2,345 reviews)</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="mt-6 flex items-center font-semibold">
                    <PackageIcon className="mr-2 h-4 w-4" />
                    Stock Availability
                  </h3>
                  <Badge variant={lowStock ? 'destructive' : 'secondary'}>
                    {lowStock ? 'Low Stock' : 'In Stock'}
                  </Badge>
                </div>
                <Progress value={stockPercentage} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  {stockPercentage}% of stock remaining.{' '}
                  {lowStock ? 'Order soon!' : ''}
                </p>
              </div>
            </div>
          </div>
          <div className="">
            <EmblaCarousel images={productImages} options={OPTIONS} />
          </div>
          <div>
            <h1 className="mt-6 text-2xl font-bold capitalize">Description:</h1>
            <p className="font-normal text-gray-400 dark:text-gray-400">
              {description}
            </p>
          </div>
        </div>
        <div className="w-[40%] p-4">
          <Card className="sticky top-32 mt-40 w-full">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold capitalize">
                    {name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Category: {category.name}
                  </p>
                </div>
                <div className='focus:ring-offset-2" inline-flex items-center rounded-md border bg-yellow-500 px-2.5 py-0.5 text-xs font-semibold text-black transition-colors focus:outline-none focus:ring-2 focus:ring-ring'>
                  -20% OFF
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">${price}</p>
                  <p className="text-sm text-muted-foreground line-through">
                    ${price + price * 0.2}
                  </p>
                </div>
              </div>

              {/* //!Esto está harcodeado...*/}
              <Separator />
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center space-x-2">
                  <GamepadIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="capitalize">Product: {type}</span>
                </div>
                {/* <div className="flex items-center space-x-2">
                  <DownloadIcon className="h-4 w-4 text-muted-foreground" />
                  <span>Digital Download</span>
                </div> */}
                {/* <div className="flex items-center space-x-2">
                  <ClockIcon className="h-4 w-4 text-muted-foreground" />
                  <span>50+ hours gameplay</span>
                </div> */}
                <div className="flex items-center space-x-2">
                  <ShieldCheckIcon className="h-4 w-4 text-muted-foreground" />
                  <span>14-day refund</span>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-semibold">Key Features:</h3>
                <ul className="list-inside list-disc space-y-1 text-sm">
                  <li>Immersive open world</li>
                  <li>Multiplayer co-op mode</li>
                  <li>Stunning 4K graphics</li>
                  <li>Regular free updates</li>
                </ul>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full bg-yellow-500 font-bold text-black hover:bg-yellow-600">
                <CreditCardIcon className="mr-2 h-5 w-5" />
                Buy with Mercado Pago
              </Button>
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
