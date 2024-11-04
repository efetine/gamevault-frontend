import { z } from "zod";
import { couponSchema } from "./coupons-schema";

export const createCouponSchema = z.object({
  coupon: couponSchema.pick({
    discountPercentage: true,
    expirationDate: true,
  }),
  emails: z.array(z.string().email()).min(1),
});

export type CreateCoupon = z.infer<typeof createCouponSchema>;
