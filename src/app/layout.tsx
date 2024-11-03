import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { AuthProvider } from "~/state/token-state";
import { cookies } from "next/headers";

import { ThemeProvider } from "~/components/layout/navbar/theme-provider";
import { ReactQueryProvider } from "~/components/react-query-provider";
import { Toaster } from "~/components/ui/toaster";
import { TooltipProvider } from "~/components/ui/tooltip";
import { CartProvider } from "~/state/cart-state";
import "~/styles/globals.css";



export const metadata: Metadata = {
  title: "Game Vault",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const initialToken = cookies().get("next-auth.session-token")?.value ?? null;

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="flex min-h-screen flex-col bg-zinc-300 dark:bg-page-gradient">
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>

              <AuthProvider initialToken={initialToken}>
              <CartProvider>{children}</CartProvider>
              </AuthProvider>
            </TooltipProvider>
            <Toaster />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
