import "~/styles/globals.css";

import { ChatButton } from "~/components/home/chat-home/chat-home";
import { Footer } from "~/components/layout/footer";
import { Navbar } from "~/components/layout/navbar/navbar";
import { getServerAuthSession } from "~/server/auth";

export default async function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();

  if (session === null) {
    return (
      <>
        <Navbar />
        {children}
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <ChatButton user={session.user} />
      {children}
      <Footer />
    </>
  );
}
