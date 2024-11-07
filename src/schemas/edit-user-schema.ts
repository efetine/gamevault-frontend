import { z } from "zod";

import { userSchema } from "./user-schema";

export const editUserSchema = userSchema.pick({ status: true, role: true });

export type EditUser = z.infer<typeof editUserSchema>;

export const editUserFormSchema = userSchema
  .omit({
    id: true,
    description: true,
    status: true,
    bannedReason: true,
    role: true,
  })
  .extend({
    profileImage: z.union([z.string(), z.instanceof(File)]).optional(),
    oldPassword: z.string().optional(),
    newPassword: z.string().min(6).max(20).optional(),
    confirmNewPassword: z.string().optional(),
    name: z.string().optional(),
    email: z.string().email().optional(),
    username: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.newPassword || data.confirmNewPassword) {
        return data.newPassword === data.confirmNewPassword;
      }
      return true;
    },
    {
      message: "New passwords do not match",
      path: ["confirmNewPassword"],
    },
  );

export type EditUserForm = z.infer<typeof editUserFormSchema>;
