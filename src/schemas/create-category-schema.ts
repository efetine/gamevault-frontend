import { z } from 'zod';

import { categorySchema } from './category-schema';

export const createCategorySchema = categorySchema.omit({
  id: true,
});

export type CreateCategory = z.infer<typeof createCategorySchema>;
