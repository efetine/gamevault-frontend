import Image from 'next/image';
import type { IProductsCardProps } from '~/interfaces/IProduct';

// interface ICategory {
//   id: number;
//   name: string;
// }
const CategoryCard: React.FC<IProductsCardProps> = ({ name, price, imageUrl }) => {
  return (
    <div className='h-full w-full max-w-sm rounded-lg border border-gray-200 bg-white p-1 shadow dark:border-gray-700 dark:bg-gray-800'>
      <div className=''>
        <Image className='w-full rounded-t-lg object-cover' src={imageUrl} alt={name} width={500} height={300} />
      </div>
      <div className='px-5 pb-5'>
        <h2 className='text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'>name: {name}</h2>
      </div>
      <div className='flex items-center justify-between mb-2'>
        <span className='text-lg font-bold'>{price}</span>
      </div>
    </div>
  );
};

export default CategoryCard;
