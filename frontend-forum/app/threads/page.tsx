"use client";

import React from "react"; // Impor React
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Heart,
  MessageCircle,
  Share,
  MoreHorizontal,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
// REVISI: Pastikan Tipe 'Thread' diimpor dengan benar,
// 'ThreadPost' sepertinya tipe buatan lokal Anda
import type { Thread } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { ThreadModal } from "@/components/thread/thread-modal";
import { DeleteThreadModal } from "@/components/thread/delete-thread-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useThreads } from "@/hooks"; // Asumsi ini dari /hooks/useThreads

// Definisikan tipe ThreadPost jika Anda membutuhkannya secara eksplisit
interface ThreadPost {
  id: string;
  content: string;
  createdAt: string; // atau Date
  user: Thread["user"]; // Asumsi user sama dengan tipe di Thread
  isMain: boolean;
  likes: number;
  replies: number;
}

// Convert Thread data to ThreadPost format for UI
const convertToThreadPost = (
  thread: Thread,
  isMain: boolean = true
): ThreadPost => ({
  id: thread.id,
  // REVISI: Konten utama ada di 'thread.content', bukan 'thread.title'
  // Sesuaikan ini jika 'ThreadPost' harusnya menampilkan 'title'
  content: thread.content,
  createdAt: thread.createdAt,
  user: thread.user,
  isMain,
  likes: 0, // Akan diimplementasikan
  replies: thread._count?.posts || 0,
});

export default function ThreadsPage() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated" && session;
  const { data: threads, isLoading, error, refetch } = useThreads();

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-purple-50/30 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Gagal Memuat Threads
              </h3>
              <p className="text-red-600 mb-4">
                Terjadi kesalahan saat mengambil data diskusi.
              </p>
              <Button
                onClick={() => refetch()}
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-50"
              >
                Coba Lagi
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                Diskusi Forum
              </h1>
              <p className="text-gray-600 mt-1">
                Temukan dan bergabung dalam percakapan menarik
              </p>
            </div>
            {isAuthenticated ? (
              <ThreadModal mode="create" />
            ) : (
              <Link href="/login">
                <Button className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Login untuk Membuat Thread
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Threads Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {isLoading
            ? // Loading skeletons
              Array.from({ length: 5 }).map((_, index) => (
                <Card
                  key={index}
                  className="bg-white/80 backdrop-blur-sm shadow-sm border-0"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-4">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                    <div className="flex items-center space-x-6">
                      <Skeleton className="h-8 w-16" />
                      <Skeleton className="h-8 w-16" />
                      <Skeleton className="h-8 w-16" />
                    </div>
                  </CardContent>
                </Card>
              ))
            : threads?.map((thread, index) => {
                // Hapus `threadPost` jika tidak digunakan
                // const threadPost = convertToThreadPost(thread);
                return (
                  <Link
                    key={`thread-${thread.id}-${index}`}
                    href={`/threads/${thread.id}`}
                  >
                    <Card className="group relative bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-xl border-0 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex items-center space-x-3">
                          <Avatar className="ring-2 ring-white shadow-lg group-hover:ring-blue-200 transition-all">
                            <AvatarImage
                              src={`/avatars/${
                                thread.user?.username || "default"
                              }.png`}
                              alt={thread.user?.username || "User"}
                            />
                            <AvatarFallback className="bg-linear-to-br from-blue-500 to-purple-600 text-white font-semibold">
                              {(thread.user?.username || "U")[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 group-hover:text-blue-900 transition-colors">
                              {thread.user?.username || "Unknown User"}
                            </p>
                            <p className="text-sm text-gray-500">
                              {(() => {
                                try {
                                  const date = new Date(thread.createdAt);
                                  return isNaN(date.getTime())
                                    ? "Tanggal tidak valid"
                                    : formatDistanceToNow(date, {
                                        addSuffix: true,
                                        locale: id,
                                      });
                                } catch {
                                  return "Tanggal tidak valid";
                                }
                              })()}
                            </p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                // Cegah navigasi saat membuka menu
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {isAuthenticated && (
                                <>
                                  <ThreadModal
                                    mode="edit"
                                    thread={{
                                      id: thread.id,
                                      title: thread.title,
                                      content: thread.content,
                                    }}
                                    trigger={
                                      <DropdownMenuItem
                                        onSelect={(e) => e.preventDefault()}
                                        // --- PERBAIKAN ---
                                        // Cegah navigasi saat mengklik item
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit Thread
                                      </DropdownMenuItem>
                                    }
                                  />
                                  <DeleteThreadModal
                                    threadId={thread.id}
                                    threadTitle={thread.title}
                                    trigger={
                                      <DropdownMenuItem
                                        onSelect={(e) => e.preventDefault()}
                                        // --- PERBAIKAN ---
                                        // Cegah navigasi saat mengklik item
                                        onClick={(e) => e.stopPropagation()}
                                        className="text-red-600 focus:text-red-600"
                                      >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Hapus Thread
                                      </DropdownMenuItem>
                                    }
                                  />
                                </>
                              )}
                              {!isAuthenticated && (
                                <DropdownMenuItem asChild>
                                  <Link
                                    href="/login"
                                    className="flex items-center"
                                    // Cegah navigasi ganda
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <Edit className="h-4 w-4 mr-2" />
                                    Login untuk Edit
                                  </Link>
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <div className="mb-4">
                          <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">
                            {thread.title}
                          </h3>
                          <p className="text-gray-700 leading-relaxed line-clamp-3">
                            {thread.content}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all duration-200 group"
                              // Cegah navigasi
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                            >
                              <Heart className="h-4 w-4 mr-2 group-hover:fill-current" />
                              {/* Ganti dengan data like jika ada */}
                              {0}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition-all duration-200 group"
                              // Cegah navigasi
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                            >
                              <MessageCircle className="h-4 w-4 mr-2 group-hover:fill-current" />
                              {thread._count?.posts || 0}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all duration-200"
                              // Cegah navigasi
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                            >
                              <Share className="h-4 w-4" />
                            </Button>
                          </div>

                          <Badge
                            variant="secondary"
                            className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors"
                          >
                            Thread Utama
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
        </div>

        {!isLoading && threads && threads.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
              <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Belum Ada Diskusi
              </h3>
              <p className="text-gray-600 mb-6">
                Jadilah yang pertama memulai percakapan menarik di forum ini!
              </p>
              {/* REVISI: Bungkus Button ini dengan ThreadModal agar berfungsi */}
              <ThreadModal
                mode="create"
                trigger={
                  <Button className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Buat Thread Pertama
                  </Button>
                }
              />
            </div>
          </div>
        )}

        {!isLoading && threads && threads.length > 0 && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="px-8 border-2 hover:bg-gray-50"
            >
              Muat Lebih Banyak Thread
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
