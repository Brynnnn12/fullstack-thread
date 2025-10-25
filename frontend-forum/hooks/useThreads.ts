import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import {
  fetchThreads,
  fetchThreadById,
  createThread,
  updateThread,
  deleteThread,
} from "@/lib/api/threadApi";
import type { Thread, ThreadWithPosts } from "@/types";

// Query Keys
export const threadKeys = {
  all: ["threads"] as const,
  detail: (id: string) => ["threads", id] as const,
};

// Query Hooks
export function useThreads() {
  return useQuery({
    queryKey: threadKeys.all,
    queryFn: fetchThreads,
  });
}

export function useThread(id: string) {
  return useQuery({
    queryKey: threadKeys.detail(id),
    queryFn: () => fetchThreadById(id),
    enabled: !!id,
  });
}

// Mutation Hooks
export function useCreateThread() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: createThread,
    onSuccess: (data) => {
      toast.success("Thread berhasil dibuat!");
      queryClient.invalidateQueries({ queryKey: threadKeys.all });

    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Gagal membuat thread");
    },
  });
}

export function useUpdateThread() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { title: string; content: string } }) =>
      updateThread(id, data),
    onSuccess: () => {
      toast.success("Thread berhasil diperbarui!");
      queryClient.invalidateQueries({ queryKey: threadKeys.all });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Gagal memperbarui thread");
    },
  });
}


export function useDeleteThread() {
  const queryClient = useQueryClient();
  const router = useRouter();
  // 2. Dapatkan pathname dari hook
  const pathname = usePathname();

  return useMutation({
    mutationFn: deleteThread,
    onSuccess: (_, threadId) => {
      toast.success("Thread berhasil dihapus!");
      queryClient.invalidateQueries({ queryKey: threadKeys.all });

      // 3. Gunakan variabel pathname
      if (pathname.includes(`/threads/${threadId}`)) {
        router.push("/threads");
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Gagal menghapus thread");
    },
  });
}