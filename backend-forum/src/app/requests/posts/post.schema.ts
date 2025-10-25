import { z } from 'zod';

// Skema untuk membuat post baru (balasan)
export const createPostSchema = z.object({
  body: z.object({
    threadId: z.string().uuid('Thread ID harus berupa UUID yang valid'),
    content: z
      .string()
      .min(1, 'Content tidak boleh kosong')
      .max(2000, 'Content maksimal 2000 karakter'),
  }),
});

// Skema untuk mendapatkan posts berdasarkan thread ID
export const getPostsByThreadSchema = z.object({
  params: z.object({
    threadId: z.string().uuid('Thread ID harus berupa UUID yang valid'),
  }),
  query: z.object({
    page: z.string().optional().transform(val => val ? parseInt(val) : 1),
    limit: z.string().optional().transform(val => val ? parseInt(val) : 20),
  }),
});

// Skema untuk update post
export const updatePostSchema = z.object({
  body: z.object({
    content: z
      .string()
      .min(1, 'Content tidak boleh kosong')
      .max(2000, 'Content maksimal 2000 karakter'),
  }),
  params: z.object({
    id: z.string().uuid('Post ID harus berupa UUID yang valid'),
  }),
});

// Skema untuk delete post
export const deletePostSchema = z.object({
  params: z.object({
    id: z.string().uuid('Post ID harus berupa UUID yang valid'),
  }),
});

// Mengekstrak Tipe TypeScript dari skema Zod untuk digunakan di service
export type CreatePostInput = z.infer<typeof createPostSchema>['body'];
export type UpdatePostInput = z.infer<typeof updatePostSchema>['body'];
export type PostParams = z.infer<typeof updatePostSchema>['params'];
export type GetPostsByThreadParams = z.infer<typeof getPostsByThreadSchema>['params'];
export type GetPostsByThreadQuery = z.infer<typeof getPostsByThreadSchema>['query'];