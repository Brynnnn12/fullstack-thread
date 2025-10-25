import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 1. Impor semua provider Anda
import { Providers } from "./provider"; // (Kita akan buat file ini)
import { MainLayout } from "@/components/_layouts/main-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ThreadIn",
  description: "Forum dibuat dengan Next.js",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 2. Bungkus 'children' dengan Provider Anda */}
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
