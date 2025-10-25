import { z } from 'zod';

// Skema untuk registrasi
export const registerSchema = z
  .object({
    body: z.object({
      username: z
        .string()
        .min(3, 'Username must be at least 3 characters long'),
      email: z.string().email('Not a valid email'),
      password: z
        .string()
        .min(8, 'Password must be at least 8 characters long'),
      passwordConfirmation: z.string(),
    }),
  })
  // Memastikan password dan konfirmasinya sama
  .refine((data) => data.body.password === data.body.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["body", "passwordConfirmation"], // Menunjuk field yang error
  });

// Skema untuk login
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Not a valid email'),
    password: z.string(),
  }),
});

// Mengekstrak Tipe TypeScript dari skema Zod untuk digunakan di service
export type RegisterInput = z.infer<typeof registerSchema>['body'];
export type LoginInput = z.infer<typeof loginSchema>['body'];