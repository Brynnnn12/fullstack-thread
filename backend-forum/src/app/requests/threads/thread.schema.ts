import { z } from 'zod';

// Skema untuk membuat thread baru
export const createThreadSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(5, 'Title must be at least 5 characters long')
      .max(200, 'Title must not exceed 200 characters'),
    content: z
      .string()
      .min(10, 'Content must be at least 10 characters long')
      .max(5000, 'Content must not exceed 5000 characters'),
  }),
});

// Skema untuk update thread
export const updateThreadSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(5, 'Title must be at least 5 characters long')
      .max(200, 'Title must not exceed 200 characters')
      .optional(),
    content: z
      .string()
      .min(10, 'Content must be at least 10 characters long')
      .max(5000, 'Content must not exceed 5000 characters')
      .optional(),
  }),
  params: z.object({
    id: z.string().uuid('Invalid thread ID format'),
  }),
});

// Mengekstrak Tipe TypeScript dari skema Zod untuk digunakan di service
export type CreateThreadInput = z.infer<typeof createThreadSchema>['body'];
export type UpdateThreadInput = z.infer<typeof updateThreadSchema>['body'];
export type ThreadParams = z.infer<typeof updateThreadSchema>['params'];