import { z } from "zod";
import { productSchema } from "./product-schema";

export const orderDetailsSchema = z.object({
  id: z.number(),
  quantity: z.number().nonnegative(),
  productId: productSchema.shape.id,
  price: productSchema.shape.price,
  product: productSchema,
});

export type OrderDetails = z.infer<typeof orderDetailsSchema>;
