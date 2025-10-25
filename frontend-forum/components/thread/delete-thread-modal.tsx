"use client";

import React, { useState } from "react";
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
import { useDeleteThread } from "@/hooks";

interface DeleteThreadModalProps {
  threadId: string;
  threadTitle: string;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

export function DeleteThreadModal({
  threadId,
  threadTitle,
  trigger,
  onSuccess,
}: DeleteThreadModalProps) {
  const [open, setOpen] = useState(false);
  const deleteThreadMutation = useDeleteThread();

  const handleDelete = () => {
    deleteThreadMutation.mutate(threadId);
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
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {trigger || defaultTrigger}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Thread</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah Anda yakin ingin menghapus thread{" "}
            <strong>"{threadTitle}"</strong>? Tindakan ini tidak dapat
            dibatalkan dan akan menghapus semua balasan yang terkait.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteThreadMutation.isPending}
            className="bg-red-600 hover:bg-red-700"
          >
            {deleteThreadMutation.isPending ? "Menghapus..." : "Hapus Thread"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
