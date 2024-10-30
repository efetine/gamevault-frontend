import { z } from "zod";

import { productSchema } from "./product-schema";

export const editProductSchema = productSchema
  .omit({
    id: true,
    categoryId: true,
  })
  .extend({
    name: z.string().min(1),
    description: z.string().min(1),
    categoryId: z.string().uuid(),
    imageUrl: z.union([z.string(), z.instanceof(File)]),
    active: z.enum(["active", "inactive"]),
  });

export type EditProduct = z.infer<typeof editProductSchema>;
