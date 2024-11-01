"use client";

import {
  CreditCardIcon,
  GamepadIcon,
  ShieldCheckIcon,
} from "lucide-react";
import React from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { useMercadopago } from "~/hooks/use-mercadopago";
import { type ProductDetailPageProps } from "~/schemas/product-details-schema";
import { type BuyAProductProps } from "~/services/products-service";
import EmblaCarousel from "./slider";
import { Separator } from "@radix-ui/react-dropdown-menu";

const OPTIONS = {};

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  price,
  description,
  type,
  name,
  imageUrl,
  authToken,
  id,
}) => {
  const buyProductProp: BuyAProductProps = {
    products: [
      {
        id,
        quantity: 1,
      },
    ],
    authToken,
  };
  const { isPending, mutate } = useMercadopago(buyProductProp);

  const productImages = Array(1).fill({ src: imageUrl, alt: name });

  return (
    <div className="w-full  mx-auto px-4 py-8 bg-gradient-to-b from-[#0d1117] via-[#212c3f] to-black">
      <div className="flex flex-col w-[70%] m-auto mt-32 md:flex-row gap-8 ">
        <div className="w-full md:w-3/5 ">
          <h2 className="text-2xl font-bold capitalize mb-4">{name}</h2>
          <div className="mb-6 ">
            <EmblaCarousel images={productImages} options={OPTIONS} />
          </div>
          <div>
            <h3 className="text-2xl font-bold capitalize mb-2">Description:</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {description}
            </p>
          </div>
        </div>
        <div className="w-full  md:w-2/5 pt-[52px] ">
          <Card className="bg-gradient-to-t from-[#161616] to-[#1a1a1a]">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold capitalize">
                    {name}
                  </CardTitle>
                  
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-right">
                  <p className="text-2xl font-bold text-emerald-600">${price.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground line-through">
                    ${(price + price * 0.2).toFixed(2)}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center space-x-2">
                  <GamepadIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="capitalize">Product: {type}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheckIcon className="h-4 w-4 text-muted-foreground" />
                  <span>14-day refund</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                onClick={() => mutate()}
                className="w-full bg-gradient-to-b from-emerald-700 to-emerald-800 text-white hover:from-emerald-800 hover:to-emerald-900"
              >
                <CreditCardIcon className="mr-2 h-5 w-5" />
                {isPending ? "Loading..." : "Buy with Mercado Pago"}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Secure payment processed by Mercado Pago. We don&apos;t store
                your financial information.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};