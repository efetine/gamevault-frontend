import { z } from "zod";
import { productSchema } from "./product-schema";

export const productsSchema = z.array(
  productSchema.omit({ categoryId: true }).extend({
    category: z.object({ id: z.string(), name: z.string() }),
  }),
);

export type Products = z.infer<typeof productsSchema>;
