import { z } from "zod";
import { orderDetailsSchema } from "./order-details-schema";
import { userSchema } from "./user-schema";

export const orderSchema = z.object({
  id: z.string().uuid(),
  userId: userSchema.shape.id,
  total: z.number().nonnegative(),
  orderDetails: z.array(orderDetailsSchema),
});

export type order = z.infer<typeof orderSchema>;
