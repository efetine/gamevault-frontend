import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ThemeProvider } from "~/components/Navbar/theme-provider";
import Navbar from "~/components/Navbar/Navbar";
import Footer from "~/components/Footer/Footer";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <SidebarProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          >
          <Navbar />
          <SidebarTrigger />
          {children}
          <Footer />
        </ThemeProvider>
          </SidebarProvider>
      </body>
    </html>
  );
}
