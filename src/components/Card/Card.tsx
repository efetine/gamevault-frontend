import { Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import type { IProductsCardProps } from '~/interfaces/IProduct';
import { cn } from '~/lib/utils';

const Card: React.FC<IProductsCardProps> = ({ name, price, imageUrl }) => {
  const calification = 4;
  return (
    <div className='h-full shadow-lg w-full rounded-lg border border-gray-200 bg-white shadow transition duration-300 ease-in-out hover:scale-100 dark:border-gray-700 dark:bg-gray-800 overflow-hidden'>
      <div className=''>
        <Image className='w-full rounded-t-lg object-cover' src={imageUrl} alt={name} width={500} height={300} />
      </div>
      <div className='p-4'>
        <h3 className='text-lg font-semibold mb-2 tracking-tight text-gray-900 dark:text-white'>{name}</h3>
        <div className='flex items-center justify-between mb-2'>
          <span className='text-sm'>deportivo</span>
          <div className='flex items-center'>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn('w-4 h-4', i < calification ? 'text-yellow-400 fill-current' : ' text-gray-600')}
              />
            ))}
          </div>
        </div>
        <div className='flex items-center justify-between mb-2'>
          <span className='text-lg font-bold'>
            {price.toLocaleString('es-US', {
              currency: 'USD',
              style: 'currency',
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
