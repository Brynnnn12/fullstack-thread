"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <FileQuestion className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle className="text-xl text-gray-900">
            Halaman Tidak Ditemukan
          </CardTitle>
          <CardDescription className="text-gray-600">
            Maaf, halaman yang Anda cari tidak dapat ditemukan.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-md text-center">
            404 - Page Not Found
          </div>

          <div className="flex flex-col gap-2">
            <Link href="/" className="w-full">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Home className="h-4 w-4 mr-2" />
                Kembali ke Beranda
              </Button>
            </Link>

            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="w-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Jika Anda merasa ini adalah kesalahan, silakan{" "}
              <Link href="/contact" className="text-blue-600 hover:underline">
                hubungi kami
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
