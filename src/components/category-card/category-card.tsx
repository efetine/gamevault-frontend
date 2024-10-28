import { ICategory } from '~/interfaces/ICategory';

const CategoryCard: React.FC<ICategory> = ({ name }) => {
  return (
    <div className='h-full w-full max-x-sm rounded-lg border border-gray-200 bg-white p-1 shadow transition duration-300 ease-in-out hover:scale-100 dark:border-gray-700 dark:bg-gray-800 overflow-hidden'>
      <div className='px-5 pb-5'>
        <h2 className='text-xl font-medium'>name: {name}</h2>
      </div>
    </div>
  );
};

export default CategoryCard;
