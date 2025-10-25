import { z } from 'zod';


export const threadSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title cannot exceed 100 characters'),
  content: z
    .string()
    .min(10, 'Content must be at least 10 characters'),
});


export type ThreadInput = z.infer<typeof threadSchema>;