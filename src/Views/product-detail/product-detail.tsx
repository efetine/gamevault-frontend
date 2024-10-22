"use client";
import { useRouter } from "next/navigation";
import React from "react";
import type { IProduct } from "~/interfaces/IProduct";

const ProductDetail: React.FC<IProduct> = ({
  price,
  description,
  type,
  stock,
  name,
  imageUrl,
}) => {
  const router = useRouter();

  const handleClick = () => {
    alert("agregar producto al carrito");
  };
  const handleBack = () => {
    router.push("/products");
  };
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="hijo m-8 mt-10 w-full space-y-[14px] rounded-lg border border-gray-200 bg-white px-4 py-3 shadow dark:border-gray-700 dark:bg-gray-800 md:w-1/4">
        <img src={imageUrl} alt={name} />
        <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h2>
        <h2 className="text-wrap font-light">{description}</h2>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400">Type: {type}</span>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            ${price}{" "}
          </p>
          <span className="text-gray-500 dark:text-gray-400">
            Stock: {stock}
          </span>
        </div>
        <div className="flex flex-col justify-between gap-4">
          <button
            className="rounded-lg bg-[#880808] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            onClick={handleClick}
          >
            ADD TO CART
          </button>
          <button
            className="rounded-lg bg-[#880808] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
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
