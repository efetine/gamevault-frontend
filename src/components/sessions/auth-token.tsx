import { cookies } from "next/headers";
import React from "react";

interface ServerComponentProps {
  children: React.ReactNode;
}

export default function SessionComponent({ children }: ServerComponentProps) {
  const cookieStore = cookies();
  const authToken =
    cookieStore
      .getAll()
      .find((cookie) => cookie.name === "next-auth.session-token")?.value ??
    "default";

  return React.cloneElement(children as React.ReactElement, { authToken });
}
