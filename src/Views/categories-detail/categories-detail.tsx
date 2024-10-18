import React from 'react';
import type { IProduct } from '~/interfaces/IProduct';

const CategoriesDetail: React.FC<IProduct> = ({ name }) => {
  return (
    <div className='h-full w-full max-w-sm rounded-lg border border-gray-200 bg-white p-1 shadow dark:border-gray-700 dark:bg-red-400'>
      <div className='px-5 pb-5'>
        <h2 className='text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'>name: {name}</h2>
      </div>
    </div>
  );
};

export default CategoriesDetail;
