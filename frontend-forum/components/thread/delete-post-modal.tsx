"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { useDeletePost } from "@/hooks";

interface DeletePostModalProps {
  postId: string;
  threadId: string;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

export function DeletePostModal({
  postId,
  threadId,
  trigger,
  onSuccess,
}: DeletePostModalProps) {
  const deletePostMutation = useDeletePost();

  const handleDelete = () => {
    deletePostMutation.mutate(postId);
  };

  const defaultTrigger = (
    <Button
      variant="ghost"
      size="sm"
      className="text-red-600 hover:text-red-700 hover:bg-red-50"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger || defaultTrigger}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Balasan</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah Anda yakin ingin menghapus balasan ini? Tindakan ini tidak
            dapat dibatalkan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deletePostMutation.isPending}
            className="bg-red-600 hover:bg-red-700"
          >
            {deletePostMutation.isPending ? "Menghapus..." : "Hapus Balasan"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
