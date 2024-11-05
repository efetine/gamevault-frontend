import { z } from "zod";

export const couponSchema = z.object({
  id: z.string().uuid(),
  couponCode: z
    .string()
    .min(1, { message: "Coupon code cannot be empty" })
    .max(50, { message: "Coupon code must be 50 characters or less" }),
  discountPercentage: z.coerce
    .number()
    .int()
    .min(1, { message: "Discount must be at least 1%" })
    .max(100, { message: "Discount cannot exceed 100%" }),
  expirationDate: z.coerce.date(),
  isActive: z.boolean(),
});

export type Coupon = z.infer<typeof couponSchema>;
