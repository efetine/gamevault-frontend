import { z } from 'zod';

export const mpDataSchema = z.object({
  statusCode: z.number(),
  message: z.string().optional(),
  url: z.string().url().optional(),
});

export type ResponseMpDto = Response & z.infer<typeof mpDataSchema>;
