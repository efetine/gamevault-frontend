import type { IProduct } from "~/interfaces/IProduct";
//import {z} from 'zod'

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export async function getProductsFromDb(
  limit: number,
  cursor: string,
): Promise<IProduct[]> {
  try {
    const response = await fetch(
      `${APIURL}/products?limit=${limit}&cursor=${cursor}`,
      {
        method: "GET",
        next: { revalidate: 1200 },
      },
    );
    const products: IProduct[] = (await response.json()) as IProduct[];
    return products;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Se produjo un error desconocido");
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
    return product;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Se produjo un error desconocido");
    }
  }
}
