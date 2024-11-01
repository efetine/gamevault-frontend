import { z } from "zod";
import { productSchema } from "./product-schema";

export const orderDetailsSchema = z.object({
  id: z.string().uuid(),
  quantity: z.number().nonnegative(),
  productId: productSchema.shape.id,
  productPrice: productSchema.shape.price,
});

export type OrderDetails = z.infer<typeof orderDetailsSchema>;
