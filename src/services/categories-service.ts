import { z } from "zod";

import { env } from "~/env";
import { categorySchema } from "~/schemas/category-schema";
import { paginatedResultSchema } from "~/schemas/paginated-result";
import { PaginationDto } from "~/schemas/pagination-dto";
import { productWithCategorySchema } from "~/schemas/product-schema";

const paginatedCategories = paginatedResultSchema(categorySchema);

export type PaginatedCategories = z.infer<typeof paginatedCategories>;

export async function getCategories({
  cursor,
  limit,
}: PaginationDto): Promise<PaginatedCategories> {
  const url = new URL("/categories", env.NEXT_PUBLIC_API_URL);

  const response = await fetch(url.toString(), {
    method: "GET",
    next: { revalidate: 1200 },
  });

  if (!response.ok) {
    throw new Error(`Error fetching categories: ${response.statusText}`);
  }

  const categories = await response.json();

  const parsedCategories = paginatedCategories.safeParse(categories);

  if (!parsedCategories.success) {
    throw new Error(`Validation error: ${parsedCategories.error.message}`);
  }

  return parsedCategories.data;
}

const paginatedProductsWithCategories = paginatedResultSchema(
  productWithCategorySchema,
);

export type PaginatedProductsWithCategories = z.infer<
  typeof paginatedProductsWithCategories
>;

export async function getProductsByCategory(
  categoryId: string,
  limit: number | undefined = 4,
  cursor: string | null,
): Promise<PaginatedProductsWithCategories> {
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

    const body = await response.json();

    console.log({ body });

    const validated = paginatedProductsWithCategories.safeParse(body);

    if (!validated.success) {
      throw new Error(`Validation error: ${validated.error.message}`);
    }

    return validated.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("an unknown error occurred");
    }
  }
}

interface IApiResponse {
  data: Product[];
  cursor: string | undefined;
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
    console.log("data: ", data);
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