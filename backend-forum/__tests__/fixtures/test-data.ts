import { PrismaClient } from '@prisma/client';

export const createTestUsers = async (prisma: PrismaClient) => {
  const users = await Promise.all([
    prisma.user.create({
      data: {
        username: 'testuser1',
        email: 'testuser1@example.com',
        password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: password
      },
    }),
    prisma.user.create({
      data: {
        username: 'testuser2',
        email: 'testuser2@example.com',
        password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: password
      },
    }),
    prisma.user.create({
      data: {
        username: 'moderator',
        email: 'moderator@example.com',
        password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: password
        role: 'MODERATOR',
      },
    }),
  ]);

  return users;
};

export const createTestThreads = async (prisma: PrismaClient, users: any[]) => {
  const threads = await Promise.all([
    prisma.thread.create({
      data: {
        title: 'First Test Thread',
        content: 'This is the content of the first test thread',
        authorId: users[0].id,
      },
    }),
    prisma.thread.create({
      data: {
        title: 'Second Test Thread',
        content: 'This is the content of the second test thread',
        authorId: users[1].id,
      },
    }),
    prisma.thread.create({
      data: {
        title: 'Locked Thread',
        content: 'This thread is locked for testing',
        authorId: users[0].id,
        isLocked: true,
      },
    }),
  ]);

  return threads;
};

export const createTestPosts = async (prisma: PrismaClient, threads: any[], users: any[]) => {
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        content: 'First reply to first thread',
        threadId: threads[0].id,
        authorId: users[1].id,
      },
    }),
    prisma.post.create({
      data: {
        content: 'Second reply to first thread',
        threadId: threads[0].id,
        authorId: users[2].id,
      },
    }),
    prisma.post.create({
      data: {
        content: 'Reply to second thread',
        threadId: threads[1].id,
        authorId: users[0].id,
      },
    }),
  ]);

  return posts;
};

export const testData = {
  validUser: {
    username: 'validuser',
    email: 'valid@example.com',
    password: 'password123',
  },
  invalidUser: {
    username: '',
    email: 'invalid-email',
    password: '123',
  },
  validThread: {
    title: 'Valid Thread Title',
    content: 'Valid thread content with sufficient length',
  },
  invalidThread: {
    title: '',
    content: 'Short',
  },
  validPost: {
    content: 'Valid post content with sufficient length for testing',
  },
  invalidPost: {
    content: 'Too short',
  },
};