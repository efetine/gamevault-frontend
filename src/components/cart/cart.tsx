"use client";

import { useQuery } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { useCart } from "~/state/cart-state";

export function Cart() {
  const { state, dispatch } = useCart();

  const { data } = useQuery({
    queryKey: ["products"],
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <ShoppingCart className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        {state.products.length === 0 ? (
          <div className="text-center">No products in the cart</div>
        ) : (
          <ul role="list" className="-my-6 divide-y divide-gray-500">
            {state.products.map((product) => {
              return (
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
                          <a href={"#"}>{product.title}</a>
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
                          onClick={() => {
                            dispatch({
                              type: "removeProduct",
                              payload: { productId: product.productId },
                            });
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
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
