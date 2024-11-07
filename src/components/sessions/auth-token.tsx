import React from "react";
import { getServerAuthSession } from "~/server/auth";

interface ServerComponentProps {
  children: React.ReactNode;
}

export default async function SessionComponent({
  children,
}: ServerComponentProps) {
  const session = await getServerAuthSession();

  return React.cloneElement(children as React.ReactElement, {
    authToken: session?.user.id,
  });
}
