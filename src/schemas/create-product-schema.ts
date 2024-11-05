import { z } from 'zod';

import { editProductSchema } from './edit-product-schema';

export const createProductSchema = editProductSchema
  .omit({
    active: true,
  })
  .extend({
    imageUrl: z.instanceof(File),
  });

export type CreateProduct = z.infer<typeof createProductSchema>;
