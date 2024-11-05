import { z } from 'zod';

export function paginatedResultSchema<T>(item: z.ZodType<T>) {
  return z.object({
    data: z.array(item),
    nextCursor: z.string().nullable(),
  });
}
