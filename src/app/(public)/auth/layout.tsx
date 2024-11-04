import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { getServerAuthSession } from "~/server/auth";

interface AdminProps {
  children: ReactNode;
}

export default async function LoginLayout({ children }: AdminProps) {
  const session = await getServerAuthSession();

  if (session !== null) {
    redirect("/");
  }

  return children;
}
