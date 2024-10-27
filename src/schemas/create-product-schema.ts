import { z } from "zod";

import { editProductSchema } from "./edit-product-schema";

export const createProductSchema = editProductSchema.omit({
  active: true,
});

export type CreateProduct = z.infer<typeof createProductSchema>;
