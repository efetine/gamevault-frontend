import { z } from 'zod';

import { productSchema } from './product-schema';

export const editProductSchema = productSchema
  .omit({
    id: true,
    category: true,
  })
  .extend({
    name: z.string().min(1),
    description: z.string().min(1),
    categoryId: z.string().uuid(),
  });

export type EditProduct = z.infer<typeof editProductSchema>;
