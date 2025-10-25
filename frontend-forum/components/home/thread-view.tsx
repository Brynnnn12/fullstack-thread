"use client";

import { useQuery } from "@tanstack/react-query";
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
} from "lucide-react";
import { fetchThreads } from "@/lib/api/threadApi";
import type { Thread, ThreadPost } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

// Convert Thread data to ThreadPost format for UI
const convertToThreadPost = (
  thread: Thread,
  isMain: boolean = true
): ThreadPost => ({
  id: thread.id,
  content: thread.content,
  createdAt: thread.createdAt,
  user: thread.user,
  isMain,
  likes: 0, // Will be implemented when likes API is available
  replies: thread._count?.posts || 0,
});

export function ThreadView() {
  const {
    data: threads,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["threads"],
    queryFn: fetchThreads,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (error) {
    return (
      <section id="threads" className="py-16 bg-gray-50">
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
      </section>
    );
  }

  return (
    <section
      id="threads"
      className="py-16 bg-linear-to-br from-gray-50 via-blue-50/30 to-purple-50/30"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-linear-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4">
            Diskusi Terbaru
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Temukan topik menarik dan bergabung dalam percakapan yang bermakna.
          </p>
        </div>

        <div className="space-y-6">
          {isLoading
            ? // Loading skeletons
              Array.from({ length: 3 }).map((_, index) => (
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
            : threads?.slice(0, 5).map((thread, index) => {
                const threadPost = convertToThreadPost(thread);
                return (
                  <Card
                    key={thread.id}
                    className="group relative bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-xl border-0 transition-all duration-300 hover:-translate-y-1"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="ring-2 ring-white shadow-lg group-hover:ring-blue-200 transition-all">
                          <AvatarImage
                            src={`/avatars/${thread.user.username}.png`}
                            alt={thread.user.username}
                          />
                          <AvatarFallback className="bg-linear-to-br from-blue-500 to-purple-600 text-white font-semibold">
                            {thread.user.username[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 group-hover:text-blue-900 transition-colors">
                            {thread.user.username}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatDistanceToNow(new Date(thread.createdAt), {
                              addSuffix: true,
                              locale: id,
                            })}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
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
                          >
                            <Heart className="h-4 w-4 mr-2 group-hover:fill-current" />
                            {threadPost.likes}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition-all duration-200 group"
                          >
                            <MessageCircle className="h-4 w-4 mr-2 group-hover:fill-current" />
                            {threadPost.replies}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all duration-200"
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
                );
              })}
        </div>

        {!isLoading && threads && threads.length > 5 && (
          <div className="text-center mt-12">
            <Button
              size="lg"
              className="px-8 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Muat Lebih Banyak Thread
            </Button>
          </div>
        )}

        {!isLoading && threads && threads.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
              <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Belum Ada Diskusi
              </h3>
              <p className="text-gray-600">
                Jadilah yang pertama memulai percakapan menarik!
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
