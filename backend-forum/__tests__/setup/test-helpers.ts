import { PrismaClient } from '@prisma/client';
import { Server } from 'http';
import app from '../../src/config/app';
import { prisma } from '../../src/config/database';

export interface TestContext {
  prisma: PrismaClient;
  server: Server;
  baseUrl: string;
}

export const setupTestEnvironment = async (): Promise<TestContext> => {
  // Clean database before tests
  await prisma.$transaction([
    prisma.post.deleteMany(),
    prisma.thread.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  // Start test server
  const server = app.listen(0); // Use random available port
  const address = server.address();
  const port = typeof address === 'string' ? 3001 : address?.port || 3001;
  const baseUrl = `http://localhost:${port}`;

  return {
    prisma,
    server,
    baseUrl,
  };
};

export const teardownTestEnvironment = async (context: TestContext): Promise<void> => {
  await context.server.close();
  await context.prisma.$disconnect();
};

export const createTestUser = async (prisma: PrismaClient, overrides = {}) => {
  return await prisma.user.create({
    data: {
      username: `testuser_${Date.now()}`,
      email: `test${Date.now()}@example.com`,
      password: '$2b$10$hashedpassword', // Pre-hashed password
      ...overrides,
    },
  });
};

export const createTestThread = async (prisma: PrismaClient, userId: string, overrides = {}) => {
  return await prisma.thread.create({
    data: {
      title: `Test Thread ${Date.now()}`,
      content: 'Test thread content',
      authorId: userId,
      ...overrides,
    },
  });
};

export const createTestPost = async (prisma: PrismaClient, threadId: string, userId: string, overrides = {}) => {
  return await prisma.post.create({
    data: {
      content: 'Test post content',
      threadId,
      authorId: userId,
      ...overrides,
    },
  });
};