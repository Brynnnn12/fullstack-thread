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
import { Textarea } from "@/components/ui/textarea";
import { postSchema, type PostInput } from "@/schema/post/post.schema";
import { MessageCircle, Edit, Send } from "lucide-react";
import { useCreatePost, useUpdatePost } from "@/hooks";

interface PostModalProps {
  mode: "create" | "edit";
  threadId: string;
  post?: {
    id: string;
    content: string;
  };
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

export function PostModal({ mode, threadId, post, trigger }: PostModalProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<PostInput>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: post?.content || "",
    },
  });

  const createPostMutation = useCreatePost();
  const updatePostMutation = useUpdatePost();

  const onSubmit = (data: PostInput) => {
    if (mode === "create") {
      createPostMutation.mutate({ threadId, data });
    } else {
      updatePostMutation.mutate({ id: post!.id, data });
    }
  };

  const defaultTrigger =
    mode === "create" ? (
      <Button className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
        <MessageCircle className="h-4 w-4 mr-2" />
        Tambah Balasan
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
            {mode === "create" ? "Tambah Balasan" : "Edit Balasan"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Bagikan pemikiran Anda dalam diskusi ini."
              : "Perbarui konten balasan Anda."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konten Balasan</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tulis balasan Anda..."
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
                  createPostMutation.isPending || updatePostMutation.isPending
                }
                className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {createPostMutation.isPending || updatePostMutation.isPending
                  ? "Menyimpan..."
                  : mode === "create"
                  ? "Kirim Balasan"
                  : "Simpan Perubahan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
