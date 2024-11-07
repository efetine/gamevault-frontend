import { z } from "zod";

export const cartPayloadObjectSchema = z.object({
  productId: z.string().uuid(),
  category: z.string(),
  qty: z.number().nonnegative(),
  price: z.number().nonnegative(),
  title: z.string(),
  image: z.string(),
  type: z.string().optional(),
  stock: z.number().optional()
});
export const cartPayloadArraySchema = z.array(cartPayloadObjectSchema);

export type ObjectPayload = z.infer<typeof cartPayloadObjectSchema>;
export type ArrayPayload = z.infer<typeof cartPayloadArraySchema>;
