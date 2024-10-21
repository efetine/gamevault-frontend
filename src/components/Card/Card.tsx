import React from "react";
import type { IProductsCardProps } from "~/interfaces/IProduct";

const Card: React.FC<IProductsCardProps> = ({
  name,
  type,
  price,
  imageUrl,
}) => {
  return (
    <div className="h-full w-full max-w-sm rounded-lg border border-gray-200 bg-white px-4 py-3 shadow dark:border-gray-700 dark:bg-gray-800">
      <img
        className="max-w-xs rounded-t-lg p-8 transition duration-300 ease-in-out hover:scale-110"
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        src={imageUrl}
        alt={name}
      />
      <div className="px-5 pb-5">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h2>

        <p>Type: {type}</p>

        <p className="text-xl font-bold text-gray-900 dark:text-white">
          Price: ${price}
        </p>

        <button className="rounded-lg bg-[#880808] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
          VER DETALLE
        </button>
      </div>
    </div>
  );
};

export default Card;
