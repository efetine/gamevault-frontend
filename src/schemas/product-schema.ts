import { z } from "zod";

export const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: z.enum(["digital", "physical"], {
    required_error: "Product isn't digital or physical",
  }),
  stock: z.coerce.number().nonnegative(),
  price: z.coerce.number().nonnegative(),
  description: z.string(),
  active: z.boolean(),
  imageUrl: z.string().url(),
  category: z.object({
    id: z.string().uuid(),
    name: z.string(),
  }),
});

export type Product = z.infer<typeof productSchema>;
