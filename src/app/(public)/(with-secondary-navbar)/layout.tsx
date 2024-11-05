import '~/styles/globals.css';

import SubNavbar from '~/components/layout/navbar/sub-navbar';

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
