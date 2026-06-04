import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { CartDrawer } from "@/components/CartDrawer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mekanik Spor Sistemleri | Premium Ekipman",
  description: "İzometrik ve mekanik spor sistemleri ile antrenmanlarınızı yeni bir boyuta taşıyın.",
};

import { cookies } from "next/headers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('customer_session')?.value;
  const isLoggedIn = !!sessionCookie;

  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground transition-colors duration-300`}>
        <SiteHeader isLoggedIn={isLoggedIn} />
        <CartDrawer />
        {children}
      </body>
    </html>
  );
}
