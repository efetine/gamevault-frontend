import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import Aside from "~/components/aside";
import { getServerAuthSession } from "~/server/auth";

interface AdminProps {
  children: ReactNode;
}

export default async function ProtectedLayout({ children }: AdminProps) {
  const session = await getServerAuthSession();

  if (session === null) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="flex flex-1">
      <Aside />
      <div className="size-full p-6">{children}</div>
    </div>
  );
}
