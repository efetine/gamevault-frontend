"use client";

import { createContext, useContext, useEffect, useReducer } from "react";

import { ToastAction } from "@radix-ui/react-toast";
import {
  useMutation,
  useQuery,
  type UseQueryResult,
} from "@tanstack/react-query";
import { useToast } from "~/hooks/use-toast";
import { type ObjectPayload } from "~/schemas/cart-payload-schema";
import { type Product } from "~/schemas/product-schema";
import {
  addProductToCartAPI,
  addProductToLocalStorage,
  deleteProductFromCartAPI,
  deleteProductFromLocalStorage,
  fetchProductsCart,
  getLocalStorageCart,
  mixedCartProductsLocalWithServer,
  updateProductQuantityAPI,
  updateProductQuantityInLocalStorage,
} from "~/services/cart-service";
import { useAuth } from "./token-state";

type Action =
  | {
      type: "addProduct";
      payload: Payload;
    }
  | {
      type: "removeProduct";
      payload: { productId: Product["id"] };
    };
type Dispatch = (action: Action) => void;
type State = { data: Payload[] | []; nextCursor: number | null };
type CartProviderProps = { children: React.ReactNode };
type Payload = {
  productId: Product["id"];
  category: string;
  qty: number;
  price: Product["price"];
  title: Product["name"];
  image: Product["imageUrl"];
};
type CartQuery = UseQueryResult<
  {
    data: {
      price: number;
      productId: string;
      category: string;
      qty: number;
      title: string;
      image: string;
    }[];
    nextCursor: number | null;
  },
  Error
>;

const CartStateContext = createContext<
  { state: State; dispatch: Dispatch; cartQuery: CartQuery } | undefined
>(undefined);

function cartReducer(state: State, action: Action) {
  switch (action.type) {
    case "addProduct": {
      return {
        data: [...state.data, { ...action.payload }],
        nextCursor: state.nextCursor,
      };
    }
    case "removeProduct": {
      return {
        data: state.data.filter(
          ({ productId }) => productId !== action.payload.productId,
        ),
        nextCursor: state.nextCursor,
      };
    }
  }
}

function CartProvider({ children }: CartProviderProps) {
  const { toast } = useToast();
  const { state: authState } = useAuth();
  const [state, dispatch] = useReducer(cartReducer, {
    data: [],
    nextCursor: null,
  });

  const cartQuery = useQuery({
    queryKey: ["cart", authState.token],
    queryFn: async () => {
      if (authState.token) {
        return fetchProductsCart(authState.token);
      } else {
        return getLocalStorageCart();
      }
    },
  });

  useEffect(() => {
    if (authState.token && window.localStorage.getItem("cart")) {
      setTimeout(() => {
        toast({
          title: "Products added to cart",
          description:
            "You have products in your local cart. Would you like to add them to your account cart?",
          action: (
            <ToastAction
              altText="Get Cart"
              onClick={async () => {
                await mixedCartProductsLocalWithServer(authState.token).then(
                  () => cartQuery.refetch(),
                );
              }}
            >
              Get Local Cart
            </ToastAction>
          ),
        });
      }, 100);
    }
  }, [authState.token]);

  const value = { state, dispatch, cartQuery };

  return (
    <CartStateContext.Provider value={value}>
      {children}
    </CartStateContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartStateContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

function useAddProductToCart() {
  const { toast } = useToast();
  const { state: authState } = useAuth();
  const { cartQuery } = useCart();
  const { refetch } = cartQuery;

  return useMutation({
    mutationFn: (product: ObjectPayload) => {
      if (authState.token) {
        return addProductToCartAPI({ ...product, authToken: authState.token });
      } else {
        return addProductToLocalStorage(product);
      }
    },
    onSuccess: () => {
      void refetch();
      toast({
        title: "Product add to cart",
        description: "The product has been added to the cart",
        color: "green",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "An error occurred while adding the product to the cart",
        color: "red",
      });
    },
  });
}

function useDeleteProductFromCart() {
  const { toast } = useToast();
  const { state: authState } = useAuth();
  const { cartQuery } = useCart();
  const { refetch } = cartQuery;

  return useMutation({
    mutationFn: (productId: string) => {
      if (authState.token) {
        return deleteProductFromCartAPI(authState.token, productId);
      } else {
        return deleteProductFromLocalStorage(productId);
      }
    },
    onSuccess: () => {
      void refetch();
      toast({
        title: "Product removed from cart",
        description: "The product has been removed from the cart",
        color: "green",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          "An error occurred while removing the product from the cart",
        color: "red",
      });
    },
  });
}

function useUpdateProductQuantity() {
  const { toast } = useToast();
  const { state: authState } = useAuth();
  const { cartQuery } = useCart();
  const { refetch } = cartQuery;

  return useMutation({
    mutationFn: ({ productId, qty }: { productId: string; qty: number }) => {
      if (authState.token) {
        return updateProductQuantityAPI(authState.token, productId, qty);
      } else {
        return updateProductQuantityInLocalStorage(productId, qty);
      }
    },
    onSuccess: () => {
      void refetch();
      toast({
        title: "Product quantity updated",
        description: "The product quantity has been updated",
        color: "green",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "An error occurred while updating the product quantity",
        color: "red",
      });
    },
  });
}

function useMixedLocalWithServer() {
  const { toast } = useToast();
  const { state: authState } = useAuth();
  const { cartQuery } = useCart();
  const { refetch } = cartQuery;

  return useMutation({
    mutationFn: () => mixedCartProductsLocalWithServer(authState.token),
    onSuccess: () => {
      void refetch();
      toast({
        title: "Cart updated",
        description: "The cart has been updated",
        color: "green",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "An error occurred while updating the cart",
        color: "red",
      });
    },
  });
}

export {
  CartProvider,
  useAddProductToCart,
  useCart,
  useDeleteProductFromCart,
  useUpdateProductQuantity,
};
