import { env } from "~/env";
import type { IProduct } from "~/interfaces/IProduct";
//import {z} from 'zod'

// const APIURL = process.env.API_URL;

export async function getProductsFromDb(
  limit: number,
  page: number,
): Promise<IProduct[]> {
  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/products?limit=${limit}&page=${page}`,
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
