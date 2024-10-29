import type { IProduct } from '~/interfaces/IProduct';
//import {z} from 'zod'

const APIURL = process.env.NEXT_PUBLIC_API_URL;

interface IApiResponse {
  data: IProduct[];
  cursor: string | undefined;
}

export async function getCategories(): Promise<IProduct[]> {
  try {
    const categories = await fetch(`${APIURL}/categories`, {
      method: 'GET',
      next: { revalidate: 1200 },
    });
    const products: IProduct[] = (await categories.json()) as IProduct[];

    return products;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

export async function getProductsByCategory(
  categoryId: string,
  limit: number | undefined = 4,
  cursor: string | null,
): Promise<{ products: IProduct[]; nextCursor: string | undefined }> {
  try {
    const url = new URL(`/products/category/`, APIURL);

    url.searchParams.append('limit', String(limit));
    if (cursor != undefined) {
      url.searchParams.append('cursor', cursor);
    }
    if (categoryId !== undefined) {
      url.searchParams.append('category', categoryId);
    }

    const response = await fetch(url, {
      method: 'GET',
      next: { revalidate: 1200 },
    });

    const data: IApiResponse = await response.json();
    return {
      products: data.data ?? [],
      nextCursor: data.cursor,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('an unknown error occurred');
    }
  }
}
