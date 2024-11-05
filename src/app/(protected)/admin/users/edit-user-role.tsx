"use client";

import { useMutation } from "@tanstack/react-query";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { EditUser } from "~/schemas/edit-user-schema";
import type { User } from "~/schemas/user-schema";
import { updateUser } from "~/services/users-service";

type EditUserRoleProps = {
  user: Omit<User, "description" | "username">;
};

export function EditUserRole({ user }: EditUserRoleProps) {
  const updateUserRoleMutation = useMutation<
    unknown,
    unknown,
    Pick<EditUser, "role">
  >({
    mutationFn: (data) => updateUser(user.id, data),
  });

  return (
    <Select
      defaultValue={user.role}
      onValueChange={(role: EditUser["role"]) => {
        updateUserRoleMutation.mutate({ role });
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup defaultValue={user.role}>
          <SelectLabel>Role</SelectLabel>
          <SelectItem value="client">Client</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
