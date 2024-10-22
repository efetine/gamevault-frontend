import type { IProduct } from "~/Interfaces/IProduct";
//import {z} from 'zod'

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export async function getProductsFromDb(
  limit: number,
  page: number,
): Promise<IProduct[]> {
  try {
    const response = await fetch(
      `${APIURL}/products?limit=${limit}&page=${page}`,
      {
        method: "GET",
        next: { revalidate: 1200 },
      },
    );
    const products: IProduct[] = (await response.json()) as IProduct[];
    console.log(products, "products");
    return products;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("unknown error");
    }
  }
}

export async function getProductsById(id: string): Promise<IProduct> {
  try {
    const response = await fetch(`${APIURL}/products/${id}`, {
      method: "GET",
      next: { revalidate: 1200 },
    });
    const product: IProduct = (await response.json()) as IProduct;
    //console.log(product);
    if (!product) {
      throw new Error("Product not found");
    }
    if (product.id.toString() !== id) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("unknown error");
    }
  }
}
