import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  name: z.string().nullable(),
  email: z.string().email(),
  profileImage: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(["active", "inactive", "banned"]),
  bannedReason: z.string().nullable(),
  role: z.enum(["client", "admin"]),
});

export type User = z.infer<typeof userSchema>;
