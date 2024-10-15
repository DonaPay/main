import type { Metadata } from "next";
import type { ReactNode } from "react";
import { WalletProvider } from "@/components/WalletProvider";
import { Toaster } from "sonner";
import { WrongNetworkAlert } from "@/components/WrongNetworkAlert";
import { ThemeProvider } from "next-themes";

import "./globals.css";
import { GlobalProvider } from "@/GlobalProvider";

export const metadata: Metadata = {
  title: "Donapay",
  description: "Group Expenses. With a Twist!",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <WalletProvider>
            <GlobalProvider>
              <div id="root">{children}</div>
              <WrongNetworkAlert />
              <Toaster />
            </GlobalProvider>
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
