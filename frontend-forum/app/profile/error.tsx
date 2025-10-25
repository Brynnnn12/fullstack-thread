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
import { AlertTriangle, RefreshCw, Home, User, LogOut } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProfileErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log error ke console untuk debugging
    console.error("Profile page error:", error);
  }, [error]);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-xl text-gray-900">
            Gagal Memuat Profil
          </CardTitle>
          <CardDescription className="text-gray-600">
            Terjadi kesalahan saat memuat informasi profil Anda. Silakan coba
            lagi.
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
              Muat Ulang Profil
            </Button>

            <Link href="/" className="w-full">
              <Button variant="outline" className="w-full">
                <Home className="h-4 w-4 mr-2" />
                Kembali ke Beranda
              </Button>
            </Link>

            <Link href="/profile" className="w-full">
              <Button variant="outline" className="w-full">
                <User className="h-4 w-4 mr-2" />
                Halaman Profil
              </Button>
            </Link>

            <Button
              variant="outline"
              onClick={handleLogout}
              className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout & Login Ulang
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Jika masalah berlanjut, coba logout dan login kembali.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
