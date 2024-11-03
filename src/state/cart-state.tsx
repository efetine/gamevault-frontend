"use client";

import { createContext, useContext, useReducer } from "react";

import { Product } from "~/schemas/product-schema";

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
type State = { products: Payload[] };
type CartProviderProps = { children: React.ReactNode };
type Payload = {
  productId: Product["id"];
  category: string;
  qty: number;
  price: Product["price"];
  title: Product["name"];
  image: Product["imageUrl"];
};

const CartStateContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function cartReducer(state: State, action: Action) {
  switch (action.type) {
    case "addProduct": {
      return {
        products: [...state.products, { ...action.payload }],
      };
    }
    case "removeProduct": {
      return {
        products: state.products.filter(
          ({ productId }) => productId !== action.payload.productId,
        ),
      };
    }
  }
}

function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, { products: [] });
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };
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

export { CartProvider, useCart };
