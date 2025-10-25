import { z } from 'zod';

// Skema untuk form Login
export const loginSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email'),
  password: z
    .string()
    .min(1, 'Password cannot be empty'),
});

// Skema untuk form Register
export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Please enter a valid email'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters'),
    passwordConfirmation: z.string(),
  })
  // Cek kustom untuk memastikan password sama
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ['passwordConfirmation'], // Tunjukkan error di field konfirmasi
  });

// Ekstrak Tipe TypeScript-nya untuk dipakai di react-hook-form
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;