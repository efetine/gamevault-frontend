import { z } from "zod";

import { env } from "~/env";
import { CreateProduct } from "~/schemas/create-product-schema";
import { EditProduct } from "~/schemas/edit-product-schema";
import { Product, productSchema } from "~/schemas/product-schema";
import { productsSchema } from "~/schemas/products-schema";

export async function createProduct(values: CreateProduct) {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/products/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return await response.json();
}

const getProductsSchema = z.object({
  products: productsSchema,
  nextCursor: z.string().nullable(),
});

export type GetProducts = z.infer<typeof getProductsSchema>;

export const paginationDtoSchema = z.object({
  cursor: z.string().nullish(),
  limit: z.string().optional(),
});

export type PaginationDto = z.infer<typeof paginationDtoSchema>;

export async function getProducts(params: PaginationDto): Promise<GetProducts> {
  const { cursor, limit = "10" } = paginationDtoSchema.parse(params);
  const url = new URL("/products", env.NEXT_PUBLIC_API_URL);

  if (cursor) {
    url.searchParams.append("cursor", cursor);
  }

  url.searchParams.append("limit", limit);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const body = await response.json();

  const parsedProducts = getProductsSchema.safeParse(body);

  if (parsedProducts.success === false) {
    console.log(parsedProducts.error);
    throw new Error(parsedProducts.error.message);
  }

  return parsedProducts.data;
}

export async function getProductById(id: Product["id"]): Promise<Product> {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/products/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const body = await response.json();

  const parsedProduct = productSchema.safeParse(body);

  if (parsedProduct.success === false) {
    throw new Error(parsedProduct.error.message);
  }

  return parsedProduct.data;
}

export async function updateProduct(id: Product["id"], values: EditProduct) {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  const result = response.json();

  return result;
}