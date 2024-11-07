import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { ThemeProvider } from "~/components/layout/navbar/theme-provider";
import { ReactQueryProvider } from "~/components/react-query-provider";
import { Toaster } from "~/components/ui/toaster";
import { TooltipProvider } from "~/components/ui/tooltip";
import { getServerAuthSession } from "~/server/auth";
import { CartProvider } from "~/state/cart-state";
import { AuthProvider } from "~/state/token-state";
import "~/styles/globals.css";

export const metadata: Metadata = {
  title: "Game Vault",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="flex min-h-screen flex-col bg-zinc-300 dark:bg-page-gradient">
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            forcedTheme="dark"
            disableTransitionOnChange
          >
            <TooltipProvider>
              <AuthProvider initialToken={session?.user.id}>
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
