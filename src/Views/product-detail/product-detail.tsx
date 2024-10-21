'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IProduct } from '~/interfaces/IProduct';

const ProductDetail: React.FC<IProduct> = ({ price, description, type, stock, name, imageUrl }) => {
  const router = useRouter();

  const handleClick = () => {
    alert('agregar producto al carrito');
  };
  const handleBack = () => {
    router.push('/products');
  };
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div
        className='px-4 py-3  w-full md:w-1/4 m-8 hijo
 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 space-y-[14px] mt-10'
      >
        <img src={imageUrl} alt={name} />
        <h2 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>{name}</h2>
        <h2 className='text-wrap font-light'>{description}</h2>
        <div className='flex justify-between items-center'>
          <span className='text-gray-500 dark:text-gray-400'>Type: {type}</span>
          <p className='text-3xl font-bold text-gray-900 dark:text-white'>${price} </p>
          <span className='text-gray-500 dark:text-gray-400'>Stock: {stock}</span>
        </div>
        <div className='flex flex-col justify-between gap-4'>
          <button
            className='text-white bg-[#880808] hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
            onClick={handleClick}
          >
            ADD TO CART
          </button>
          <button
            className='text-white bg-[#880808] hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
            onClick={handleBack}
          >
            GO BACK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
