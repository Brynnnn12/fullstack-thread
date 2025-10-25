import { z } from 'zod';


export const postSchema = z.object({
  content: z
    .string()
    .min(1, 'Post content cannot be empty')
    .max(1000, 'Post content cannot exceed 1000 characters'),
});

export type PostInput = z.infer<typeof postSchema>;