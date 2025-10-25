import { PrismaClient } from "@prisma/client";

// Tentukan level log berdasarkan lingkungan
const logLevel = process.env.NODE_ENV === 'development' 
  ? ['query', 'info', 'warn', 'error'] 
  : ['info', 'warn', 'error']; // Hapus 'query' di production

export const prisma = new PrismaClient({
  log: logLevel as any,
});