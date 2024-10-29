import { ShoppingCart } from 'lucide-react';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { CardContent, CardFooter, Card as Cards } from '~/components/ui/card';
import type { IProductsCardProps } from '~/interfaces/IProduct';

const Card: React.FC<IProductsCardProps> = ({ name, price, imageUrl, category }) => {
  return (
    <Cards className='w-[300px] overflow-hidden group'>
      <div className='relative overflow-hidden'>
        <img
          src={imageUrl}
          alt={name}
          className='w-full h-[150px] object-cover transition-transform duration-300 group-hover:scale-110'
        />
        <div className='absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
          <Button variant='secondary' className='text-white'>
            Ver detalles
          </Button>
        </div>
      </div>
      <CardContent className='p-4'>
        <h3 className='font-bold text-lg mb-2 truncate'>{name}</h3>
        <div className='flex flex-wrap gap-1 mb-2'>
          <Badge variant='secondary' className='text-xs'>
            {category.name}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className='p-4 pt-0 flex justify-between items-center'>
        <span className='text-lg font-bold'>${price.toFixed(2)}</span>
        <Button className='bg-green-600 hover:bg-green-700'>
          <ShoppingCart className='mr-2 h-4 w-4' />
          Añadir
        </Button>
      </CardFooter>
    </Cards>
  );
};

export default Card;
