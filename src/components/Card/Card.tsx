import Image from "next/image";
import React from "react";
import type { IProductsCardProps } from "~/interfaces/IProduct";
// px-4 py-3
const Card: React.FC<IProductsCardProps> = ({ name, price, imageUrl }) => {
  return (
    <div className="h-full min-h-[315px] w-[200px] max-w-[200px] rounded-lg border border-gray-200 bg-white shadow transition duration-300 ease-in-out hover:scale-100 dark:border-gray-700 dark:bg-gray-800">
      <div className="max-h-[200px] max-w-[200px]">
        <Image
          className="w-full rounded-t-lg object-cover"
          src={imageUrl}
          alt={name}
          width={500}
          height={300}
        />
      </div>
      <div className="flex h-[calc(100%-200px)] flex-col px-3 py-4">
        <h2 className="text-base tracking-tight text-gray-900 dark:text-white">
          {name}
        </h2>
        <p className="mt-auto text-[20px] font-semibold text-gray-900 dark:text-white">
          Price: ${price}
        </p>
      </div>
    </div>
  );
};

export default Card;
