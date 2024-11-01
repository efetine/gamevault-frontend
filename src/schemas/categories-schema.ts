import { z } from "zod";
import { categorySchema } from "./category-schema";

export const categoriesSchema = z.array(categorySchema);

export type Categories = z.infer<typeof categoriesSchema>;
