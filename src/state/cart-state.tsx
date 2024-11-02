'use client';

import { createContext, useContext, useReducer } from 'react';

import { Product } from '~/schemas/product-schema';

type Action = { type: 'addProduct'; payload: { productId: Product['id'] } };
type Dispatch = (action: Action) => void;
type State = { products: Product['id'][] };
type CartProviderProps = { children: React.ReactNode };

const CartStateContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function cartReducer(state: State, action: Action) {
  switch (action.type) {
    case 'addProduct': {
      return {
        products: [...state.products, action.payload.productId],
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
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
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export { CartProvider, useCart };
