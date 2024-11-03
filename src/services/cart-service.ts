"use client";

import { env } from "~/env";
import {
  type CartQuerySchema,
  cartQuerySchema,
} from "~/schemas/cart-fetch-schema";
import {
  cartPayloadArraySchema,
  type ArrayPayload,
  type ObjectPayload,
} from "~/schemas/cart-payload-schema";
import { type Product } from "~/schemas/product-schema";

export async function addProductToLocalStorage(product: ObjectPayload) {
  const cart =
    (JSON.parse(localStorage.getItem("cart") ?? "[]") as ArrayPayload) || [];

  const existingProductIndex = cart.findIndex(
    (item) => item.productId === product.productId,
  );

  if (cart[existingProductIndex] && existingProductIndex !== -1) {
    cart[existingProductIndex].qty += product.qty;
  } else {
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  return cart;
}

export async function addProductToCartAPI(product: {
  productId: Product["id"];
  qty: number;
  authToken: string;
}) {
  const response = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/carts?product=${product.productId}&quantity=${product.qty}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${product.authToken}`,
      },
    },
  );
  if (!response.ok) {
    throw new Error("Failed to add product to cart");
  }
  return response.json();
}

export const getLocalStorageCart = (): CartQuerySchema => {
  let products: ArrayPayload | [] = [];

  const getLocalProducts = JSON.parse(
    window.localStorage.getItem("cart") ?? " ",
  ) as ArrayPayload;
  const { data, error } = cartPayloadArraySchema.safeParse(getLocalProducts);
  if (data) products = data;
  if (error) console.log(error);
  return { data: products, nextCursor: null };
};

export const fetchProductsCart = async (
  authToken: string,
): Promise<CartQuerySchema> => {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/carts`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  const data = (await response.json()) as CartQuerySchema;

  const validation = cartQuerySchema.safeParse(data);

  if (!validation.success) {
    return {
      data: [],
      nextCursor: null,
    };
  }
  return validation.data;
};

export async function deleteProductFromCartAPI(
  token: string,
  productId: string,
) {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/carts?product=${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete product from cart");
  }
}

export async function deleteProductFromLocalStorage(productId: string) {
  const cart =
    (JSON.parse(localStorage.getItem("cart") ?? "[]") as ArrayPayload) || [];

  const updatedCart = cart.filter(
    (item: { productId: string }) => item.productId !== productId,
  );

  localStorage.setItem("cart", JSON.stringify(updatedCart));
}

export async function updateProductQuantityAPI(token: string, productId: string, qty: number) {
  const response = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/carts?product=${productId}&quantity=${qty}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ qty }),
    },
  );
  if (!response.ok) {
    console.log(response)
  }
}

export async function updateProductQuantityInLocalStorage(productId: string, qty: number) {
  const cart =
    (JSON.parse(localStorage.getItem("cart") ?? "[]") as ArrayPayload) || [];
  const updatedCart = cart.map((item: { productId: string; qty: number }) => {
    if (item.productId === productId) {
      return { ...item, qty };
    }
    return item;
  });
  localStorage.setItem("cart", JSON.stringify(updatedCart));
}