import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import Aside from "~/components/aside";
import { getServerAuthSession } from "~/server/auth";

interface AdminProps {
  children: ReactNode;
}

export default async function Admin({ children }: AdminProps) {
  const session = await getServerAuthSession();

  if (session === null) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="flex h-full">
      <Aside />
      <div className="p-6 w-full">{children}</div>
    </div>
  );
}
