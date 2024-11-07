import { cookies } from "next/headers";
import React from "react";
import { getServerAuthSession } from "~/server/auth";

interface ServerComponentProps {
  children: React.ReactNode;
}

export default async function SessionComponent({ children }: ServerComponentProps) {
  const session = await getServerAuthSession()
  console.log(session?.user.id)
/*   const session = ses
  const cookieStore = cookies();
  const authToken =
    cookieStore
      .getAll()
      .find((cookie) => cookie.name === "next-auth.session-token")?.value ??
    "default"; */

  return React.cloneElement(children as React.ReactElement, { authToken:  session?.user.id});
}
