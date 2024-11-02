import { z } from 'zod';
import { couponSchema } from './coupons-schema';

export const editCouponSchema = couponSchema
  .omit({
    id: true,
  })
  .extend({
    discountPercentage: z.number().min(0).optional(),
  });

export type EditCoupon = z.infer<typeof editCouponSchema>;
