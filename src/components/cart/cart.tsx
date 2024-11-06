"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { useCart, useDeleteProductFromCart, useUpdateProductQuantity } from "~/state/cart-state";
import { ScrollArea } from "../ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

export function Cart() {
  const [open, setOpen] = useState<boolean>(false);
  const { cartQuery } = useCart();
  const { isLoading, data, isError } = cartQuery;

  const { mutate: updateQuantity } = useUpdateProductQuantity();


  const { mutate: deleteProduct } = useDeleteProductFromCart();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <ShoppingCart className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <ScrollArea className="lg:h-72 xl:h-80 2xl:h-96">
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
                    <div className="flex items-betwen justify-between gap-2">
                      <Select
                        onValueChange={(qty) => {
                          updateQuantity({
                            qty: Number(qty),
                            productId: product.productId,
                          });
                        }}
                        defaultValue={`${product.qty}`}
                      >
                        <SelectTrigger className='w-fit'>
                          <SelectValue placeholder="Qty" />
                        </SelectTrigger>
                        <SelectContent defaultValue={product.qty}>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5</SelectItem>
                        </SelectContent>
                      </Select>
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
        </ScrollArea>
        <div className="flex w-full justify-center pt-3">
          <Link
            href="/cart"
            className="font-medium text-gray-400"
            onClick={() => setOpen(false)}
          >
            <Button>Go to checkout</Button>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
