import { z } from "zod";

import { userSchema } from "./user-schema";

export const editUserSchema = userSchema.pick({ status: true, role: true });

export type EditUser = z.infer<typeof editUserSchema>;
