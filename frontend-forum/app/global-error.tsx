"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log error ke console untuk debugging
    console.error("Global error occurred:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-linear-to-br from-gray-50 via-red-50/30 to-orange-50/30 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <Bug className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle className="text-xl text-gray-900">
                Aplikasi Error
              </CardTitle>
              <CardDescription className="text-gray-600">
                Terjadi kesalahan kritis pada aplikasi. Ini mungkin masalah
                sementara.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-md">
                <strong>Global Error:</strong> {error.message}
                {error.digest && (
                  <div className="mt-1">
                    <strong>Error ID:</strong> {error.digest}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  onClick={reset}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Restart Aplikasi
                </Button>

                <Button
                  onClick={() => (window.location.href = "/")}
                  className="w-full"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Kembali ke Beranda
                </Button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Jika masalah berlanjut, silakan refresh browser atau hubungi
                  support.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </body>
    </html>
  );
}
