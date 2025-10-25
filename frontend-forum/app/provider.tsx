"use client"; // File ini WAJIB 'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import React, { useState } from "react";

// Komponen ini menggabungkan SEMUA provider
export function Providers({ children }: { children: React.ReactNode }) {
  // Buat instance QueryClient (cukup sekali)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 menit cache
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster position="top-right" richColors />
      </QueryClientProvider>
    </SessionProvider>
  );
}
