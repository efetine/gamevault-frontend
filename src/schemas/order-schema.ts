import { z } from "zod";
// import { orderDetailsSchema } from "./order-details-schema";
import { userSchema } from "./user-schema";

export const orderSchema = z.object({
  id: z.number(),
  userId: userSchema.shape.id,
  amount: z.number().nonnegative(),
  orderEstatus: z.enum(["pending", "paid", "cancelled", "refound"]),
  shippingStatus: z.enum(["none", "pending", "shipped", "delivered"]),
  shippingAddress: z.string().nullable(),
  createdAt: z.coerce.date(),
});

export type Order = z.infer<typeof orderSchema>;
