import { prisma } from "../../../config/database.js";
import type { RegisterInput } from "../../requests/auth/auth.schema.js";

type CreateUserData = Omit<RegisterInput, 'passwordConfirmation'>;

// Fungsi untuk membuat user baru di DB
export const createUser = async (data: CreateUserData) => {
  return prisma.user.create({
    data: {
      username: data.username,
      email: data.email,
      password: data.password, // Password di sini SUDAH di-hash oleh service
    },
    // Hanya mengembalikan data yang aman
    select: {
      // id: true, // ← Exclude untuk security
      username: true,
      email: true,
      createdAt: true,
    },
  });
};

// Fungsi untuk mencari user berdasarkan email
export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

// Fungsi untuk mencari user berdasarkan ID (untuk profil)
export const findUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      // id: true, // ← Exclude untuk security (jangan tampilkan internal ID)
      username: true,
      email: true,
      createdAt: true,
    },
  });
};