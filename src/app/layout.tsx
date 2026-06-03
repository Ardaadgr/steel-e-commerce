import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mekanik Spor Sistemleri | Premium Ekipman",
  description: "İzometrik ve mekanik spor sistemleri ile antrenmanlarınızı yeni bir boyuta taşıyın.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Default theme is now Light mode (Professional Blue & Slate)
    <html lang="tr">
      <body className={`${inter.className} bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground`}>
        {children}
      </body>
    </html>
  );
}
