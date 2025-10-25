import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createPost,
  updatePost,
  deletePost
} from "@/lib/api/postApi";
import type { Post, ThreadWithPosts } from "@/types";
import { threadKeys } from "./useThreads";

// Query Keys
export const postKeys = {
  all: ["posts"] as const,
  byThread: (threadId: string) => ["posts", "thread", threadId] as const,
  detail: (id: string) => ["posts", id] as const,
};

// Mutation Hooks for Posts
export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ threadId, data }: { threadId: string; data: { content: string } }) =>
      createPost(threadId, data),
    onSuccess: () => {
      toast.success("Balasan berhasil dibuat!");
      queryClient.invalidateQueries({ queryKey: threadKeys.all });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Gagal membuat balasan");
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { content: string } }) =>
      updatePost(id, data),
    onSuccess: () => {
      toast.success("Balasan berhasil diperbarui!");
      queryClient.invalidateQueries({ queryKey: threadKeys.all });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Gagal memperbarui balasan");
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    onSuccess: () => {
      toast.success("Balasan berhasil dihapus!");
      queryClient.invalidateQueries({ queryKey: threadKeys.all });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Gagal menghapus balasan");
    },
  });
}