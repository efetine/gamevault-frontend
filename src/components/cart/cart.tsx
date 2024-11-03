"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { useCart, useDeleteProductFromCart } from "~/state/cart-state";

export function Cart() {
  const { cartQuery } = useCart();
  const {isLoading, data, isError} = cartQuery

  const { mutate: deleteProduct } = useDeleteProductFromCart();


  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <ShoppingCart className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : isError || !data?.data?.length ? (
          <div className="text-center">No products in the cart</div>
        ) : (
          <ul role="list" className="-my-6 divide-y divide-gray-500">
            {data.data.map((product) => (
              <li key={product.productId} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    alt={product.title}
                    src={product.image}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-300">
                      <h3>
                        <a href="#">{product.title}</a>
                      </h3>
                      <p className="ml-4">${product.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.category}
                    </p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Qty {product.qty}</p>
                    <div className="flex">
                      <button
                        type="button"
                        className="font-medium text-blue-600 hover:text-indigo-500"
                        onClick={() => deleteProduct(product.productId)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="flex w-full justify-center pt-3">
          <Link href="/cart" className="font-medium text-gray-400">
            {"See more details >"}
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
