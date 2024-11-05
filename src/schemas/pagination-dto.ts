import { z } from 'zod';

export const paginationDtoSchema = z.object({
  cursor: z.string().nullish(),
  limit: z.string().optional(),
});

export type PaginationDto = z.infer<typeof paginationDtoSchema>;
