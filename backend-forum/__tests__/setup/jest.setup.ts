import { PrismaClient } from '@prisma/client';

// Mock environment variables for tests
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret-key-for-testing-only';
process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://test:test@localhost:5432/forum_test';

// Global test database instance
let prisma: PrismaClient;

beforeAll(async () => {
  // Create a new Prisma client for tests
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

  // Connect to test database
  await prisma.$connect();
});

beforeEach(async () => {
  // Clean all tables before each test
  await prisma.$transaction([
    prisma.post.deleteMany(),
    prisma.thread.deleteMany(),
    prisma.user.deleteMany(),
  ]);
});

afterAll(async () => {
  // Disconnect from test database
  await prisma.$disconnect();
});

// Make prisma available globally for tests
(global as any).prisma = prisma;