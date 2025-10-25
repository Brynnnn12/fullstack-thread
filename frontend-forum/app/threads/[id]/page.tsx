"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  Heart,
  MessageCircle,
  Share,
  MoreHorizontal,
  AlertCircle,
  ArrowLeft,
  Send,
  ThumbsUp,
  Edit,
  Trash2,
} from "lucide-react";
import type { ThreadWithPosts } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ThreadModal } from "@/components/thread/thread-modal";
import { DeleteThreadModal } from "@/components/thread/delete-thread-modal";
import { PostModal } from "@/components/thread/post-modal";
import { DeletePostModal } from "@/components/thread/delete-post-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import { useThread } from "@/hooks";

export default function ThreadDetailPage() {
  const params = useParams();
  const threadId = params.id as string;
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated" && session;

  const { data: thread, isLoading, error, refetch } = useThread(threadId);

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-purple-50/30 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Gagal Memuat Thread
              </h3>
              <p className="text-red-600 mb-4">
                Thread yang Anda cari tidak ditemukan atau terjadi kesalahan.
              </p>
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={() => refetch()}
                  variant="outline"
                  className="border-red-300 text-red-700 hover:bg-red-50"
                >
                  Coba Lagi
                </Button>
                <Link href="/threads">
                  <Button variant="outline">Kembali ke Threads</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/threads">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-gray-900">
                {isLoading ? "Memuat Thread..." : thread?.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Thread Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm shadow-sm border-0">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
              </CardContent>
            </Card>
          </div>
        ) : thread ? (
          <div className="space-y-6">
            {/* Main Thread */}
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="ring-2 ring-white shadow-lg">
                      <AvatarImage
                        src={`/avatars/${
                          thread.user?.username || "default"
                        }.png`}
                        alt={thread.user?.username || "User"}
                      />
                      <AvatarFallback className="bg-linear-to-br from-blue-500 to-purple-600 text-white font-semibold text-lg">
                        {(thread.user?.username || "U")[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">
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
                  </div>
                  <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                    Thread Utama
                  </Badge>
                  {thread && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {isAuthenticated ? (
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
                                  className="text-red-600 focus:text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Hapus Thread
                                </DropdownMenuItem>
                              }
                            />
                          </>
                        ) : (
                          <DropdownMenuItem asChild>
                            <Link href="/login" className="flex items-center">
                              <Edit className="h-4 w-4 mr-2" />
                              Login untuk Edit
                            </Link>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {thread.title || "Untitled Thread"}
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {thread.content || "No content available"}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all duration-200 group"
                    >
                      <Heart className="h-4 w-4 mr-2 group-hover:fill-current" />
                      0
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition-all duration-200 group"
                    >
                      <MessageCircle className="h-4 w-4 mr-2 group-hover:fill-current" />
                      {thread.posts?.length || 0}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all duration-200"
                    >
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Posts/Replies */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                Balasan ({thread.posts?.length || 0})
              </h3>

              {thread.posts?.map((post, index) => (
                <Card
                  key={post.id}
                  className="bg-white/80 backdrop-blur-sm shadow-sm border-0 ml-8 relative"
                >
                  {/* Connection line */}
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-200 -ml-4" />

                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="ring-2 ring-white shadow-md">
                        <AvatarImage
                          src={`/avatars/${
                            post.user?.username || "default"
                          }.png`}
                          alt={post.user?.username || "User"}
                        />
                        <AvatarFallback className="bg-linear-to-br from-green-500 to-blue-500 text-white font-semibold">
                          {(post.user?.username || "U")[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">
                          {post.user?.username || "Unknown User"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {(() => {
                            try {
                              const date = new Date(post.createdAt);
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
                      {isAuthenticated ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <PostModal
                              mode="edit"
                              threadId={threadId}
                              post={{
                                id: post.id,
                                content: post.content,
                              }}
                              trigger={
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Balasan
                                </DropdownMenuItem>
                              }
                            />
                            <DeletePostModal
                              postId={post.id}
                              threadId={threadId}
                              trigger={
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                  className="text-red-600 focus:text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Hapus Balasan
                                </DropdownMenuItem>
                              }
                            />
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : null}
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {post.content}
                    </p>

                    <div className="flex items-center space-x-6">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all duration-200 group"
                      >
                        <ThumbsUp className="h-4 w-4 mr-2 group-hover:fill-current" />
                        {post._count?.likes || 0}
                      </Button>
                      {isAuthenticated && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition-all duration-200 group"
                        >
                          <MessageCircle className="h-4 w-4 mr-2 group-hover:fill-current" />
                          Balas
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {(!thread.posts || thread.posts.length === 0) && (
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Belum Ada Balasan
                  </h4>
                  <p className="text-gray-600">
                    Jadilah yang pertama memberikan tanggapan pada thread ini!
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-center">
              {isAuthenticated ? (
                <PostModal mode="create" threadId={threadId} />
              ) : (
                <Link href="/login">
                  <Button className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Send className="h-4 w-4 mr-2" />
                    Login untuk Membuat Balasan
                  </Button>
                </Link>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
