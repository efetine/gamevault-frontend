'use client';

import React from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Separator } from '~/components/ui/separator';
import { useMercadopago } from '~/hooks/use-mercadopago';
import { BuyAProductProps } from '~/services/products-service';
import { useCart } from '~/state/cart-state';

type CartPageProps = {
  authToken?: string;
};

export const CartPage: React.FC<CartPageProps> = ({ authToken }) => {
  const { state, dispatch } = useCart();

  const buyProductProp: BuyAProductProps = {
    products: state.products.map((product) => {
      return {
        id: product.productId,
        quantity: product.qty,
      };
    }),
    authToken,
  };

  const { mutate, isPending } = useMercadopago(buyProductProp);

  return (
    <div className="grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[1fr_300px] md:px-6">
      <div className="grid gap-6">
        <div className="grid gap-4">
          <h1 className="text-2xl font-bold">Shopping Cart</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Review the items in your cart and proceed to checkout.
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-4 overflow-hidden rounded-lg border">
            {state.products.map((product) => {
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
                    style={{ aspectRatio: '100/100', objectFit: 'cover' }}
                  />
                  <div className="grid gap-1">
                    <h3 className="font-medium">{product.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      60% /40% polyester jersey tee.
                    </p>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <span className="font-medium">${product.price}.00</span>
                    <Select defaultValue="1">
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
                      onClick={() => {
                        dispatch({
                          type: 'removeProduct',
                          payload: { productId: product.productId },
                        });
                      }}
                    >
                      <FaRegTrashCan />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-medium">
                $
                {state.products.reduce(
                  (reducer, product) => reducer + product.price,
                  0,
                )}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span className="font-medium">FREE</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-lg font-medium">
              <span>Total</span>
              <span>
                $
                {state.products.reduce(
                  (reducer, product) => reducer + product.price,
                  0,
                )}
              </span>
            </div>
          </CardContent>
          <CardFooter>
            <Button size="lg" className="w-full" onClick={() => mutate()}>
              {isPending ? 'Loading...' : 'Proceed to Checkout'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
