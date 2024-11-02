import { z } from 'zod';

export const paginationDtoSchema = z.object({
  prevCursor: z.string().optional(),
  cursor: z.string().optional(),
});

export type PaginationDto = z.infer<typeof paginationDtoSchema>;
