import { env } from "~/env";
import { categoriesSchema } from "~/schemas/categories-schema";
import { Category } from "~/schemas/category-schema";

export async function getCategories(): Promise<Category[]> {
  const url = new URL("/categories", env.NEXT_PUBLIC_API_URL);

  const response = await fetch(url.toString());

  const categories = await response.json();

  const parsedCategories = categoriesSchema.safeParse(categories);

  if (parsedCategories.success === false) {
    throw new Error(parsedCategories.error.message);
  }

  return parsedCategories.data;
}
