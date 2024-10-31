import { env } from "~/env";
import { categoriesSchema } from "~/schemas/categories-schema";
import type { Category } from "~/schemas/category-schema";
import type { Product } from "~/schemas/product-schema";

// export async function getCategories(): Promise<Category[]> {
//   const url = new URL("/categories", env.NEXT_PUBLIC_API_URL);

//   const response = await fetch(url.toString());

//   const categories = await response.json();

//   const parsedCategories = categoriesSchema.safeParse(categories);

//   if (parsedCategories.success === false) {
//     throw new Error(parsedCategories.error.message);
//   }

//   return parsedCategories.data;
// }

interface IApiResponse {
  data: Product[];
  cursor: string | undefined;
}

export async function getCategories(): Promise<Category[]> {
  const url = new URL("/categories", env.NEXT_PUBLIC_API_URL);

  const response = await fetch(url.toString(), {
    method: "GET",
    next: { revalidate: 1200 },
  });

  if (!response.ok) {
    throw new Error(`Error fetching categories: ${response.statusText}`);
  }

  const categories = await response.json();

  const parsedCategories = categoriesSchema.safeParse(categories);

  if (!parsedCategories.success) {
    throw new Error(`Validation error: ${parsedCategories.error.message}`);
  }

  return parsedCategories.data;
}

export async function getProductsByCategory(
  categoryId: string,
  limit: number | undefined = 4,
  cursor: string | null,
): Promise<{ products: Product[]; nextCursor: string | undefined }> {
  try {
    const url = new URL(`/products/category/`, env.NEXT_PUBLIC_API_URL);

    url.searchParams.append("limit", String(limit));
    if (cursor != undefined) {
      url.searchParams.append("cursor", cursor);
    }

    if (categoryId !== undefined) {
      url.searchParams.append("category", categoryId);
    }

    const response = await fetch(url, {
      method: "GET",
      next: { revalidate: 1200 },
    });

    const data: IApiResponse = (await response.json()) as IApiResponse;
    console.log(data, "dataaaa");
    return {
      products: data.data ?? [],
      nextCursor: data.cursor,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("an unknown error occurred");
    }
  }
}
