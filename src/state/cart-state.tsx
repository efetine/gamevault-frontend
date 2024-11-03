"use client";

import { createContext, useContext, useReducer } from "react";

import { type Product } from "~/schemas/product-schema";
import { useAuth } from "./token-state";
import { useMutation, useQuery, type UseQueryResult } from "@tanstack/react-query";
import { addProductToCartAPI, addProductToLocalStorage, deleteProductFromCartAPI, deleteProductFromLocalStorage, fetchProductsCart, getLocalStorageCart, updateProductQuantityAPI, updateProductQuantityInLocalStorage } from "~/services/cart-service";
import { type ObjectPayload } from "~/schemas/cart-payload-schema";

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
type State = { data: Payload[] | [], nextCursor: number | null };
type CartProviderProps = { children: React.ReactNode };
type Payload = {
  productId: Product["id"];
  category: string;
  qty: number;
  price: Product["price"];
  title: Product["name"];
  image: Product["imageUrl"];
};
type CartQuery = UseQueryResult<{
  data: {
    price: number;
    productId: string;
    category: string;
    qty: number;
    title: string;
    image: string;
  }[];
  nextCursor: number | null;
}, Error>


const CartStateContext = createContext<
  { state: State; dispatch: Dispatch, cartQuery: CartQuery } | undefined
>(undefined);

function cartReducer(state: State, action: Action) {
  switch (action.type) {
    case "addProduct": {
      return {
        data: [...state.data, { ...action.payload }],
        nextCursor: state.nextCursor
      };
    }
    case "removeProduct": {
      return {
        data: state.data.filter(
          ({ productId }) => productId !== action.payload.productId,
        ),
        nextCursor: state.nextCursor
      };
    }
  }
}

function CartProvider({ children }: CartProviderProps) {
  const { state: authState } = useAuth();
  const [state, dispatch] = useReducer(cartReducer, { data: [], nextCursor: null });
  const cartQuery = useQuery({
    queryKey: ["cart", authState.token],
    queryFn: async () => {
      if (authState.token) {
        return fetchProductsCart(authState.token);
      } else {
        return getLocalStorageCart();
      }
    }
  });

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
  const { state: authState } = useAuth();

  return useMutation({
    mutationFn: (product: ObjectPayload) => {
      if (authState.token) {
        return addProductToCartAPI({ ...product, authToken: authState.token });
      } else {
        return addProductToLocalStorage(product);
      }
    },
    onSuccess: () => {
      console.log("Producto agregado al carrito");
    },
    onError: (error) => {
      console.error("Error al agregar producto al carrito:", error);
    }
  });
}

function useDeleteProductFromCart() {
  const { state: authState } = useAuth();

  return useMutation({
    mutationFn: (productId: string) => {
      if (authState.token) {
        return deleteProductFromCartAPI(authState.token, productId);
      } else {
        return deleteProductFromLocalStorage(productId);
      }
    },
    onSuccess: () => {
      console.log("Producto eliminado del carrito");
    },
    onError: (error) => {
      console.error("Error al eliminar el producto del carrito:", error);
    }
  });
}

function useUpdateProductQuantity() {
  const { state: authState } = useAuth();

  return useMutation({
    mutationFn: ({ productId, qty }: { productId: string; qty: number }) => {
      if (authState.token) {
        return updateProductQuantityAPI(authState.token, productId, qty);
      } else {
        return updateProductQuantityInLocalStorage(productId, qty);
      }
    },
    onSuccess: () => {
      console.log("Cantidad actualizada en el carrito");
    },
    onError: (error) => {
      console.error("Error al actualizar la cantidad:", error);
    }
  });
}

export {
  CartProvider, useCart, useAddProductToCart, useDeleteProductFromCart, useUpdateProductQuantity
};
