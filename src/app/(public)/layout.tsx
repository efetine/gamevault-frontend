import "~/styles/globals.css";

import Footer from "~/components/footer/footer";
import Navbar from "~/components/navbar/navbar";
import SubNavbar from "~/components/navbar/sub-navbar";

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <div className="pt-[80px]">
        <SubNavbar />
        {children}
      </div>
      <Footer />
    </>
  );
}
