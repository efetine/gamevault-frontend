"use client";

import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { signOut } from "next-auth/react";

export function LogoutButton() {
  return <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>;
}
