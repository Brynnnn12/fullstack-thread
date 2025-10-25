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
import {
  AlertTriangle,
  RefreshCw,
  Home,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ThreadDetailErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  const params = useParams();
  const threadId = params.id as string;

  useEffect(() => {
    // Log error ke console untuk debugging
    console.error("Thread detail error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-xl text-gray-900">
            Gagal Memuat Thread
          </CardTitle>
          <CardDescription className="text-gray-600">
            Terjadi kesalahan saat memuat detail diskusi. Thread mungkin tidak
            tersedia atau telah dihapus.
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
            {threadId && (
              <div className="mt-1">
                <strong>Thread ID:</strong> {threadId}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Button
              onClick={reset}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Coba Muat Ulang
            </Button>

            <Link href="/threads" className="w-full">
              <Button variant="outline" className="w-full">
                <MessageSquare className="h-4 w-4 mr-2" />
                Kembali ke Threads
              </Button>
            </Link>

            <Link href="/" className="w-full">
              <Button variant="outline" className="w-full">
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
              Jika thread telah dihapus, Anda akan diarahkan ke halaman threads.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
