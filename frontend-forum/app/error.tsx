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
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log error ke console untuk debugging
    console.error("Error occurred:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-xl text-gray-900">
            Oops! Terjadi Kesalahan
          </CardTitle>
          <CardDescription className="text-gray-600">
            Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-md">
            <strong>Error:</strong> {error.message}
            {error.digest && (
              <div className="mt-1">
                <strong>Digest:</strong> {error.digest}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Button
              onClick={reset}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Coba Lagi
            </Button>

            <Button
              variant="outline"
              onClick={() => (window.location.href = "/")}
              className="w-full"
            >
              <Home className="h-4 w-4 mr-2" />
              Kembali ke Beranda
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
