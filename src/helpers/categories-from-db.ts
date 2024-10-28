import { ICategory } from '~/interfaces/ICategory';
import type { IProduct } from '~/interfaces/IProduct';
//import {z} from 'zod'

const APIURL = process.env.NEXT_PUBLIC_API_URL;

// export async function getCategoriesFromDb(
//   limit: number,
//   cursor: string,
// ): Promise<ICategory[]> {
//   try {
//     const response = await fetch(
//       `${APIURL}/categories?limit=${limit}&page=${cursor}`,
//       {
//         method: "GET",
//         next: { revalidate: 1200 },
//       },
//     );
//     const products: ICategory[] = (await response.json()) as ICategory[];
//     return products;
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       throw new Error(error.message);
//     } else {
//       throw new Error("Se produjo un error desconocido");
//     }
//   }
// }

// export async function getcategoriesById(id: string): Promise<ICategory> {

//   try {
//     const response = await fetch(`${APIURL}${id}`, {
//       method: "GET",
//       next: { revalidate: 1200 },
//     });
//     const product: ICategory = (await response.json()) as ICategory;
//     return product;
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       throw new Error(error.message);
//     } else {
//       throw new Error("Se produjo un error desconocido");
//     }
//   }
// }

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

export async function getCategoriesById(limit: number, cursor?: string, category?: string): Promise<ICategory> {
  try {
    const url = new URL(`/products/category/${category}`, APIURL);

    url.searchParams.append('limit', String(limit));
    url.searchParams.append('category', String(category));
    if (cursor !== undefined) {
      url.searchParams.append('cursor', cursor);
    }

    const response = await fetch(url, {
      method: 'GET',
      next: { revalidate: 1200 },
    });

    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      products: data.products,
      nextCursor: data.nextCursor,
    };
    //return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Se produjo un error desconocido');
    }
  }
}

// export async function getCategoriesById(category: string): Promise<IProduct[]> {
//   try {
//     const response = await getProductsFromDb(8);
//     const products: IProduct[] = response.products;
//     const productsByCategory = products.filter((product) => product.category.name === category);
//     if (productsByCategory.length === 0) throw new Error(`Product not found whit ${category}`);
//     return productsByCategory;
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       throw new Error(error.message);
//     } else {
//       throw new Error('Se produjo un error desconocido');
//     }
//   }
// }
