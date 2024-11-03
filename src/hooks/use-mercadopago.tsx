"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ToastAction } from "~/components/ui/toast";
import { useToast } from "~/hooks/use-toast";
import { mpDataSchema } from "~/schemas/mercado-pago-dto";
import {
  buyAProduct,
  type BuyAProductProps,
} from "~/services/products-service";

export function useMercadopago({ products, authToken }: BuyAProductProps) {
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => buyAProduct({ products, authToken }),
    onSuccess: (response) => {
      const validation = mpDataSchema.safeParse(response);

      if (
        validation.success &&
        validation.data?.url &&
        validation.data?.statusCode === 201
      ) {
        window.location.href = validation.data.url;
      } else if (validation.success && validation.data?.statusCode === 401) {
        toast({
          title: "ho, ho",
          description: "You must be logged in to buy a product",
          action: (
            <ToastAction
              altText="Sing In"
              onClick={() => router.push("/api/auth/signin")}
            >
              Sing In
            </ToastAction>
          ),
        });
      } else if (validation.success && validation.data?.statusCode === 404) {
        toast({
          title: "ho, ho",
          description: "Sorry, this product not found",
          variant: "destructive",
        });
      } else {
        toast({
          title: "ho, ho",
          description:
            "Sorry, there was a problem with your purchase. Please try again later.",
          variant: "destructive",
        });
      }
    },
    onError: () => {
      toast({
        title: "ho, ho",
        description:
          "Sorry, there was a problem with your purchase. Please try again later.",
        variant: "destructive",
      });
    },
    retry: false,
  });
}
