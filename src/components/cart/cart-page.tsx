"use client";

import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import { useMercadopago } from "~/hooks/use-mercadopago";
import { type BuyAProductProps } from "~/services/products-service";
import {
  useCart,
  useDeleteProductFromCart,
  useUpdateProductQuantity,
} from "~/state/cart-state";

type CartPageProps = {
  authToken?: string;
};

export const CartPage: React.FC<CartPageProps> = ({ authToken }) => {
  const { cartQuery } = useCart();

  const { data, isLoading, isError } = cartQuery;

  const buyProductProp: BuyAProductProps = {
    products:
      data?.data?.map((product) => {
        return {
          id: product.productId,
          quantity: product.qty,
        };
      }) ?? [],
    authToken,
  };

  const totalAmount =
    data?.data?.reduce(
      (reducer, product) => reducer + product.price * product.qty,
      0,
    ) ?? 0;

  const { mutate: deleteProduct } = useDeleteProductFromCart();

  const { mutate: updateQuantity } = useUpdateProductQuantity();

  const { mutate, isPending } = useMercadopago(buyProductProp);

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="mx-2 grid w-full gap-8 py-8 md:mx-24 md:grid-cols-4 md:px-6 md:py-12">
        <div className="col-span-3 grid gap-6">
          <div className="grid gap-4">
            <h1 className="text-2xl font-bold">Shopping Cart</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Review the items in your cart and proceed to checkout.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-4 overflow-hidden rounded-lg border">
              {isLoading ? (
                <div className="text-center">Loading...</div>
              ) : isError || !data?.data?.length ? (
                <div className="text-center">No products in the cart</div>
              ) : (
                data.data.map((product) => {
                  return (
                    <div
                      key={product.productId}
                      className="grid grid-cols-[100px_1fr_100px] items-center gap-4 border-t px-4 py-3 dark:border-gray-500"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        width={100}
                        height={100}
                        className="rounded-md object-cover"
                        style={{ aspectRatio: "100/100", objectFit: "cover" }}
                      />
                      <div className="grid gap-1">
                        <h3 className="font-medium">{product.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          60% /40% polyester jersey tee.
                        </p>
                      </div>
                      <div className="flex items-center justify-end gap-2">
                        <span className="font-medium">${product.price}.00</span>
                        <Select
                          onValueChange={(qty) => {
                            updateQuantity({
                              qty: Number(qty),
                              productId: product.productId,
                            });
                          }}
                          defaultValue={`${product.qty}`}
                        >
                          <SelectTrigger>
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
                        <Button
                          type="button"
                          className="border bg-transparent text-red-400"
                          onClick={() => deleteProduct(product.productId)}
                        >
                          <FaRegTrashCan />
                        </Button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
        <div className="grid h-min gap-4">
          <Card className="stiky top-17 lg:top-22">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-medium">${totalAmount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span className="font-medium">FREE</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-lg font-medium">
                <span>Total</span>
                <span>${totalAmount}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button size="lg" className="w-full" onClick={() => mutate()}>
                {isPending ? "Loading..." : "Proceed to Checkout"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
