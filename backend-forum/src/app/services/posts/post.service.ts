import type { CreatePostInput } from '../../requests/posts/post.schema.js';
import {
  createPost as createPostRepo,
  findPostsByThreadId as findPostsByThreadIdRepo,
  updatePost as updatePostRepo,
  deletePost as deletePostRepo,
  isPostOwner,
  findPostById,
} from '../../repository/posts/post.repository.js';
import { findThreadById } from '../../repository/threads/thread.repository.js';

type CreatePostData = CreatePostInput & { userId: string; threadId: string };

// Service untuk membuat post baru (balasan)
export const createPost = async (input: CreatePostData) => {
  // Validasi: pastikan thread ada
  const thread = await findThreadById(input.threadId);
  if (!thread) {
    throw new Error('Thread tidak ditemukan');
  }

  const newPost = await createPostRepo(input);
  return newPost;
};

// Service untuk mendapatkan posts berdasarkan thread ID
export const getPostsByThreadId = async (threadId: string, page: number = 1, limit: number = 20) => {
  // Validasi: pastikan thread ada
  const thread = await findThreadById(threadId);
  if (!thread) {
    throw new Error('Thread tidak ditemukan');
  }

  // Validasi pagination
  if (page < 1) page = 1;
  if (limit < 1 || limit > 100) limit = 20; // Max 100 per page untuk posts

  const result = await findPostsByThreadIdRepo(threadId, page, limit);
  return result;
};

// Service untuk update post
export const updatePost = async (id: string, userId: string, input: { content: string }) => {
  // Cek apakah user adalah owner post
  const isOwner = await isPostOwner(id, userId);
  if (!isOwner) {
    throw new Error('Anda tidak memiliki izin untuk mengubah post ini');
  }

  // Cek apakah post ada
  const existingPost = await findPostById(id);
  if (!existingPost) {
    throw new Error('Post tidak ditemukan');
  }

  const updatedPost = await updatePostRepo(id, userId, input);
  return updatedPost;
};

// Service untuk delete post
export const deletePost = async (id: string, userId: string) => {
  // Cek apakah user adalah owner post
  const isOwner = await isPostOwner(id, userId);
  if (!isOwner) {
    throw new Error('Anda tidak memiliki izin untuk menghapus post ini');
  }

  // Cek apakah post ada
  const existingPost = await findPostById(id);
  if (!existingPost) {
    throw new Error('Post tidak ditemukan');
  }

  await deletePostRepo(id, userId);
  return { message: 'Post berhasil dihapus' };
};