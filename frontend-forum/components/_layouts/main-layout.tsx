"use client";

import { Header } from "@/components/home/header";
import { Footer } from "@/components/home/footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-gray-50 to-blue-50">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
