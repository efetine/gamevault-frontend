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
  active: z.enum(["active", "inactive"]),
  imageUrl: z.string().optional(),
  categoryId: z.string().uuid(),
});

export type Product = z.infer<typeof productSchema>;
