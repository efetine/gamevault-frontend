import type { ICategory } from "~/interfaces/ICategory";
//import {z} from 'zod'

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export async function getCategoriesFromDb(
  limit: number,
  cursor: string,
): Promise<ICategory[]> {
  try {
    const response = await fetch(
      `${APIURL}/categories?limit=${limit}&page=${cursor}`,
      {
        method: "GET",
        next: { revalidate: 1200 },
      },
    );
    const products: ICategory[] = (await response.json()) as ICategory[];
    return products;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Se produjo un error desconocido");
    }
  }
}

export async function getcategoriesById(id: string): Promise<ICategory> {

  try {
    const response = await fetch(`${APIURL}${id}`, {
      method: "GET",
      next: { revalidate: 1200 },
    });
    const product: ICategory = (await response.json()) as ICategory;
    return product;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Se produjo un error desconocido");
    }
  }
}