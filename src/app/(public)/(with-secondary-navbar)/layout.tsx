import "~/styles/globals.css";

import SubNavbar from "~/components/navbar/sub-navbar";

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SubNavbar />
      {children}
    </>
  );
}
