import type { CreateThreadInput, UpdateThreadInput } from '../../requests/threads/thread.schema.js';
import {
  createThread as createThreadRepo,
  findAllThreads as findAllThreadsRepo,
  findThreadById as findThreadByIdRepo,
  updateThread as updateThreadRepo,
  deleteThread as deleteThreadRepo,
  isThreadOwner,
} from '../../repository/threads/thread.repository.js';

type CreateThreadData = CreateThreadInput & { userId: string };

// Service untuk membuat thread baru
export const createThread = async (input: CreateThreadData) => {
  // Business logic bisa ditambahkan di sini jika diperlukan
  // Misalnya: validasi konten, rate limiting, dll.

  const newThread = await createThreadRepo(input);
  return newThread;
};

// Service untuk mendapatkan semua threads dengan pagination
export const getAllThreads = async (page: number = 1, limit: number = 10) => {
  // Validasi pagination
  if (page < 1) page = 1;
  if (limit < 1 || limit > 50) limit = 10; // Max 50 per page

  const result = await findAllThreadsRepo(page, limit);
  return result;
};

// Service untuk mendapatkan thread berdasarkan ID
export const getThreadById = async (id: string) => {
  const thread = await findThreadByIdRepo(id);

  if (!thread) {
    throw new Error('Thread tidak ditemukan');
  }

  return thread;
};

// Service untuk update thread
export const updateThread = async (id: string, userId: string, input: UpdateThreadInput) => {
  // Cek apakah user adalah owner thread
  const isOwner = await isThreadOwner(id, userId);
  if (!isOwner) {
    throw new Error('Anda tidak memiliki izin untuk mengubah thread ini');
  }

  // Cek apakah thread ada
  const existingThread = await findThreadByIdRepo(id);
  if (!existingThread) {
    throw new Error('Thread tidak ditemukan');
  }

  // Business logic: pastikan ada minimal satu field yang diupdate
  if (!input.title && !input.content) {
    throw new Error('Minimal satu field harus diisi untuk update');
  }

  const updatedThread = await updateThreadRepo(id, userId, input);
  return updatedThread;
};

// Service untuk delete thread
export const deleteThread = async (id: string, userId: string) => {
  // Cek apakah user adalah owner thread
  const isOwner = await isThreadOwner(id, userId);
  if (!isOwner) {
    throw new Error('Anda tidak memiliki izin untuk menghapus thread ini');
  }

  // Cek apakah thread ada
  const existingThread = await findThreadByIdRepo(id);
  if (!existingThread) {
    throw new Error('Thread tidak ditemukan');
  }

  await deleteThreadRepo(id, userId);
  return { message: 'Thread berhasil dihapus' };
};
