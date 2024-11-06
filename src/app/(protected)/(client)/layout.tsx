import "~/styles/globals.css";

import { redirect } from "next/navigation";
import { Footer } from "~/components/layout/footer";
import { Navbar } from "~/components/layout/navbar/navbar";
import { getServerAuthSession } from "~/server/auth";

export default async function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();

  if (session === null) {
    redirect("/api/auth/signin");
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
