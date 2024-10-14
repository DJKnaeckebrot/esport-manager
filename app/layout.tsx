import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { UserProvider } from "@/lib/auth";
import { getUser } from "@/lib/db/queries";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "E-Sports Manager",
  description: "Verwalte deine E-Sports Teams und Spieler",
};

export const viewport: Viewport = {
  maximumScale: 1,
};

const manrope = Manrope({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let userPromise = getUser();

  return (
    <html
      lang="en"
      //className={`bg-white dark:bg-gray-950 text-black dark:text-white ${manrope.className}`}
      className={`${manrope.className}`}
    >
      <body className="min-h-[100dvh]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider userPromise={userPromise}>{children}</UserProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
