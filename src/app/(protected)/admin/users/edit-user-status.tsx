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

type EditUserStatusProps = {
  user: Omit<User, "description" | "username">;
};

export function EditUserStatus({ user }: EditUserStatusProps) {
  const updateUserStatusMutation = useMutation<
    unknown,
    unknown,
    Pick<EditUser, "status">
  >({
    mutationFn: (data) => updateUser(user.id, data),
  });

  return (
    <Select
      defaultValue={user.status}
      onValueChange={(status: EditUser["status"]) => {
        updateUserStatusMutation.mutate({ status });
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup defaultValue={user.status}>
          <SelectLabel>Status</SelectLabel>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
          <SelectItem value="banned">Banned</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
