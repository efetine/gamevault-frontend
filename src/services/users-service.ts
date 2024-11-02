import { z } from 'zod';

import { env } from '~/env';
import { paginationDtoSchema } from '~/schemas/pagination-dto';
import { userSchema } from '~/schemas/user-schema';

export const getUserSchema = userSchema.omit({
  description: true,
  username: true,
});

export type GetUser = z.infer<typeof getUserSchema>;

export const getUsersInputSchemma = paginationDtoSchema;

export type GetUsersInput = z.infer<typeof getUsersInputSchemma>;

const getUsersOutputSchema = z.object({
  data: z.array(getUserSchema),
  nextCursor: z.string().nullable(),
});

export type GetUsersOutput = z.infer<typeof getUsersOutputSchema>;

export async function getUsers(input: GetUsersInput): Promise<GetUsersOutput> {
  const { cursor, limit = '10' } = getUsersInputSchemma.parse(input);
  const url = new URL('/users', env.NEXT_PUBLIC_API_URL);

  if (cursor) {
    url.searchParams.append('cursor', cursor);
  }

  url.searchParams.append('limit', limit);

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const body = await response.json();

  const parsedUsers = getUsersOutputSchema.safeParse(body);

  if (parsedUsers.success === false) {
    throw new Error(parsedUsers.error.message);
  }

  return parsedUsers.data;
}
