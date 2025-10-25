"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { threadSchema, type ThreadInput } from "@/schema/thread/thread.schema";
import { Plus, Edit } from "lucide-react";
import { useCreateThread, useUpdateThread } from "@/hooks";

interface ThreadModalProps {
  mode: "create" | "edit";
  thread?: {
    id: string;
    title: string;
    content: string;
  };
  trigger?: React.ReactNode;
}

export function ThreadModal({ mode, thread, trigger }: ThreadModalProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<ThreadInput>({
    resolver: zodResolver(threadSchema),
    defaultValues: {
      title: thread?.title || "",
      content: thread?.content || "",
    },
  });

  const createThreadMutation = useCreateThread();
  const updateThreadMutation = useUpdateThread();

  // --- PERUBAHAN DI SINI ---
  const onSubmit = (data: ThreadInput) => {
    if (mode === "create") {
      // Tambahkan callback onSuccess untuk logika UI
      createThreadMutation.mutate(data, {
        onSuccess: () => {
          setOpen(false); // 1. Tutup modal
          form.reset(); // 2. Reset form
        },
      });
    } else {
      // Tambahkan juga untuk mode edit agar modal tertutup
      updateThreadMutation.mutate(
        { id: thread!.id, data },
        {
          onSuccess: () => {
            setOpen(false); // 1. Tutup modal
          },
        }
      );
    }
  };
  // --- AKHIR PERUBAHAN ---

  const defaultTrigger =
    mode === "create" ? (
      <Button className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
        <Plus className="h-4 w-4 mr-2" />
        Buat Thread Baru
      </Button>
    ) : (
      <Button variant="ghost" size="sm">
        <Edit className="h-4 w-4" />
      </Button>
    );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Buat Thread Baru" : "Edit Thread"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Bagikan pemikiran Anda dengan komunitas."
              : "Perbarui konten thread Anda."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul Thread</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan judul thread..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konten</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tulis konten thread Anda..."
                      className="min-h-[120px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={
                  createThreadMutation.isPending ||
                  updateThreadMutation.isPending
                }
                className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {createThreadMutation.isPending ||
                updateThreadMutation.isPending
                  ? "Menyimpan..."
                  : mode === "create"
                  ? "Buat Thread"
                  : "Simpan Perubahan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
