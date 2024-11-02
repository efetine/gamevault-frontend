import { z } from 'zod';

const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;

export const couponSchema = z.object({
  id: z.string().uuid().optional(),
  couponCode: z
    .string()
    .min(1, { message: 'Coupon code cannot be empty' })
    .max(50, { message: 'Coupon code must be 50 characters or less' }),
  discountPercentage: z.coerce
    .number()
    .int()
    .min(1, { message: 'Discount must be at least 1%' })
    .max(100, { message: 'Discount cannot exceed 100%' }),
  expirationDate: z
    .string()
    .regex(dateRegex, { message: 'The date format must be YYYY/MM/DD' }),
  isActive: z.boolean().default(true),
});
export type Coupon = z.infer<typeof couponSchema>;
