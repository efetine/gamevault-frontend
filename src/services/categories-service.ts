import { z } from "zod";

import { env } from "~/env";
import { Category, categorySchema } from "~/schemas/category-schema";
import { CreateCategory } from "~/schemas/create-category-schema";
import { paginatedResultSchema } from "~/schemas/paginated-result";
import { type PaginationDto } from "~/schemas/pagination-dto";
import { productWithCategorySchema } from "~/schemas/product-schema";

const paginatedCategories = paginatedResultSchema(categorySchema);

type PaginatedCategories = z.infer<typeof paginatedCategories>;

export async function getCategories({
  cursor,
  limit,
}: PaginationDto): Promise<PaginatedCategories> {
  const url = new URL("/categories", env.NEXT_PUBLIC_API_URL);

  if (cursor !== null && cursor !== undefined) {
    url.searchParams.set("cursor", cursor.toString());
  }

  if (limit !== null && limit !== undefined) {
    url.searchParams.set("limit", limit.toString());
  }

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

export async function getCategoryById(id: string) {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/categories/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching category: ${response.statusText}`);
  }

  const body = await response.json();

  const parsedCategory = categorySchema.safeParse(body);

  if (!parsedCategory.success) {
    throw new Error(`Validation error: ${parsedCategory.error.message}`);
  }

  return parsedCategory.data;
}

export async function createCategory(input: CreateCategory): Promise<Category> {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const body = await response.json();

  const createdCategory = categorySchema.safeParse(body);

  if (!createdCategory.success) {
    throw new Error(`Validation error: ${createdCategory.error.message}`);
  }

  return createdCategory.data;
}

export async function updateCategory(
  categoryId: Category["id"],
  input: CreateCategory,
): Promise<Category> {
  const response = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/categories/${categoryId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    },
  );

  const body = await response.json();

  const createdCategory = categorySchema.safeParse(body);

  if (!createdCategory.success) {
    throw new Error(`Validation error: ${createdCategory.error.message}`);
  }

  return createdCategory.data;
}
