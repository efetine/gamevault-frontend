import "~/styles/globals.css";

import Footer from "~/components/footer/footer";
import Navbar from "~/components/navbar/navbar";

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
