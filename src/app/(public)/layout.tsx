import '~/styles/globals.css';

import Footer from '~/components/layout/footer';
import Navbar from '~/components/layout/navbar/navbar';

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
