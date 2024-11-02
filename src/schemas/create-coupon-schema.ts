import { z } from 'zod';
import { editCouponSchema } from './edit-coupon-schema';

export const createCouponSchema = editCouponSchema
  .omit({
    isActive: true,
  })
  .extend({
    isActive: z.boolean().default(true),
  });

export type CreateCoupon = z.infer<typeof createCouponSchema>;
