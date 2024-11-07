import { z } from "zod";

import { env } from "~/env";
import type { CreateProduct } from "~/schemas/create-product-schema";
import type { EditProduct } from "~/schemas/edit-product-schema";
import { type ResponseMpDto } from "~/schemas/mercado-pago-dto";
import { paginatedResultSchema } from "~/schemas/paginated-result";
import { paginationDtoSchema } from "~/schemas/pagination-dto";
import {
  Product,
  productSchema,
  productWithCategorySchema,
} from "~/schemas/product-schema";

export async function createProduct(
  values: Omit<CreateProduct, "imageUrl">,
): Promise<Product> {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/products/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  const body = await response.json();

  const createdProduct = productSchema.safeParse(body);

  if (createdProduct.success === false) {
    throw new Error(createdProduct.error.message);
  }

  return createdProduct.data;
}

const paginatedProducts = paginatedResultSchema(productWithCategorySchema);

export type PaginatedProducts = z.infer<typeof paginatedProducts>;

export const getProductsInputSchema = paginationDtoSchema.extend({
  type: z.enum(["digital", "physical"]).optional(),
});

export type GetProductsInput = z.infer<typeof getProductsInputSchema>;

export async function getProducts(
  params: GetProductsInput,
): Promise<PaginatedProducts> {
  const { cursor, limit = "10", type } = getProductsInputSchema.parse(params);
  const url = new URL("/products", env.NEXT_PUBLIC_API_URL);

  if (cursor) {
    url.searchParams.append("cursor", cursor);
  }

  if (type === "digital" || type === "physical") {
    url.searchParams.append("type", type);
  }

  url.searchParams.append("limit", limit);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const body = await response.json();

  const parsedProducts = paginatedProducts.safeParse(body);

  if (parsedProducts.success === false) {
    console.log(parsedProducts.error.message);
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
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  const result = response.json();

  return result;
}

export async function uploadImage(uuid: Product["id"], file: File) {
  const blob = new Blob([file], { type: file.type });
  const formData = new FormData();

  formData.append("image", blob);

  const response = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/products/uploadImage/${uuid}`,
    {
      method: "PATCH",
      body: formData,
    },
  );

  const body = await response.json();

  return body;
}

export type ProductsData = {
  id: string;
  quantity: number;
};

export type BuyAProductProps = {
  products: ProductsData[];
  authToken?: string;
  shippingAddress?: string;
  couponCode?: string;
};

export async function buyAProduct({
  products,
  authToken,
  shippingAddress,
  couponCode,
}: BuyAProductProps) {
  return await fetch(`${env.NEXT_PUBLIC_API_URL}/mercadopago`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({ products, shippingAddress, couponCode }),
  })
    .then(async (res) => {
      return (await res.json()) as ResponseMpDto;
    })
    .then((data) => data as object)
    .catch((err) => console.log(err));
}
