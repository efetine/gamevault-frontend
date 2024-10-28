'use client';
import { Separator } from '@radix-ui/react-dropdown-menu';
import {
  ClockIcon,
  CreditCardIcon,
  DownloadIcon,
  GamepadIcon,
  PackageIcon,
  ShieldCheckIcon,
  StarIcon,
} from 'lucide-react';
import React from 'react';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Progress } from '~/components/ui/progress';
import type { IProduct } from '~/interfaces/IProduct';
import { cn } from '~/lib/utils';
import EmblaCarousel from './slider';
const OPTIONS = {};
const images = [
  {
    src: 'https://static.wikia.nocookie.net/dota2_gamepedia/images/1/12/Marci_icon.png/revision/latest?cb=20211029000514',
    alt: 'Image 1',
  },
  { src: 'https://sysrqmts.com/images/games/dota-2.jpg', alt: 'Image 2' },
  {
    src: 'https://static.ivory.getloconow.com/games/0aee9f18-58fd-41c9-9c24-35266aa22262/square_cover/94929c57-6130-4108-ac1d-42274fec2092.png',
    alt: 'Image 3',
  },
  {
    src: 'https://static.wikia.nocookie.net/dota2_gamepedia/images/1/12/Marci_icon.png/revision/latest?cb=20211029000514',
    alt: 'Image 4',
  },
  {
    src: 'https://static.wikia.nocookie.net/dota2_gamepedia/images/1/12/Marci_icon.png/revision/latest?cb=20211029000514',
    alt: 'Image 5',
  },
  {
    src: 'https://static.wikia.nocookie.net/dota2_gamepedia/images/1/12/Marci_icon.png/revision/latest?cb=20211029000514',
    alt: 'Image 1',
  },
  { src: 'https://sysrqmts.com/images/games/dota-2.jpg', alt: 'Image 2' },
  {
    src: 'https://static.ivory.getloconow.com/games/0aee9f18-58fd-41c9-9c24-35266aa22262/square_cover/94929c57-6130-4108-ac1d-42274fec2092.png',
    alt: 'Image 3',
  },
  {
    src: 'https://static.wikia.nocookie.net/dota2_gamepedia/images/1/12/Marci_icon.png/revision/latest?cb=20211029000514',
    alt: 'Image 4',
  },
  {
    src: 'https://static.wikia.nocookie.net/dota2_gamepedia/images/1/12/Marci_icon.png/revision/latest?cb=20211029000514',
    alt: 'Image 5',
  },
];

const ProductDetail: React.FC<IProduct> = ({ price, description, type, stock, name, imageUrl }) => {
  console.log(price, description, type, stock, name, imageUrl);

  const stockPercentage = (stock / 100) * 100;
  const lowStock = stockPercentage <= 20;

  return (
    <div className={'flex max-w-[1120px] m-auto gap-12 mt-14 pb-14 md:flex-row flex-col'}>
      <div className='w-[60%]'>
        <div>
          <h2 className='text-3xl font-bold capitalize'>{name}</h2>
          <div className='mb-5 mt-2.5 flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <StarIcon className='w-5 h-5 text-yellow-500' />
              <span className='font-semibold'>4.8</span>
              <span className='text-muted-foreground'>(2,345 reviews)</span>
            </div>
          </div>
        </div>
        <div>
          <EmblaCarousel images={[{ src: imageUrl, alt: name }]} options={{}} />
        </div>
        <div>
          <h1 className='text-2xl font-bold capitalize mt-6'>Description:</h1>
          <p className='font-normal text-gray-700 dark:text-gray-400'>{description}</p>
        </div>
      </div>
      <div className=' pt-[75px]'>
        <Card className='w-full sticky top-10 max-w-md'>
          <CardHeader className='pb-2'>
            <div className='flex justify-between items-start'>
              <div>
                <CardTitle className='text-2xl font-bold capitalize'>{name}</CardTitle>
                <p className='text-sm text-muted-foreground'>Developed by Pixel Games</p>
              </div>
              <div className='inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" bg-yellow-500 text-black'>
                -20% OFF
              </div>
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex justify-between items-center'>
              <div className='text-right'>
                <p className='text-2xl font-bold text-green-600'>${price}</p>
                <p className='text-sm text-muted-foreground line-through'>${price + price * 0.2}</p>
              </div>
            </div>
            <Separator />
            <div className='grid grid-cols-2 gap-2 text-sm'>
              <div className='flex items-center space-x-2'>
                <GamepadIcon className='w-4 h-4 text-muted-foreground' />
                <span className='capitalize'>{type.toLocaleLowerCase()}</span>
              </div>
              <div className='flex items-center space-x-2'>
                <DownloadIcon className='w-4 h-4 text-muted-foreground' />
                <span>Digital Download</span>
              </div>
              <div className='flex items-center space-x-2'>
                <ClockIcon className='w-4 h-4 text-muted-foreground' />
                <span>50+ hours gameplay</span>
              </div>
              <div className='flex items-center space-x-2'>
                <ShieldCheckIcon className='w-4 h-4 text-muted-foreground' />
                <span>14-day refund</span>
              </div>
            </div>
            <Separator />
            <div className='space-y-2'>
              <h3 className='font-semibold'>Key Features:</h3>
              <ul className='list-disc list-inside text-sm space-y-1'>
                <li>Immersive open world</li>
                <li>Multiplayer co-op mode</li>
                <li>Stunning 4K graphics</li>
                <li>Regular free updates</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className='flex flex-col space-y-4'>
            <Button className='w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold'>
              <CreditCardIcon className='w-5 h-5 mr-2' />
              Buy with Mercado Pago
            </Button>
            <p className='text-xs text-center text-muted-foreground'>
              Secure payment processed by Mercado Pago. We dont store your financial information.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;