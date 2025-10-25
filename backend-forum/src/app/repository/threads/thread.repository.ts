import { prisma } from "../../../config/database.js";
import type { CreateThreadInput, UpdateThreadInput } from "../../requests/threads/thread.schema.js";
import { getPaginationParams, createPaginationResult } from "../../../utils/pagination/index.js";

type CreateThreadData = CreateThreadInput & { userId: string };

// Fungsi untuk membuat thread baru
export const createThread = async (data: CreateThreadData) => {
  return prisma.thread.create({
    data: {
      title: data.title,
      content: data.content,
      userId: data.userId,
    },
    // Include user info untuk menghindari N+1 query
    include: {
      user: {
        select: {
          // id: true, // Exclude untuk security
          username: true,
          email: true,
          createdAt: true,
        },
      },
      // Include post count
      _count: {
        select: {
          posts: true,
        },
      },
    },
  });
};

// Fungsi untuk mendapatkan semua threads dengan pagination
export const findAllThreads = async (page: number = 1, limit: number = 10) => {
  const { skip, page: validatedPage, limit: validatedLimit } = getPaginationParams({ page, limit });

  const [threads, total] = await Promise.all([
    prisma.thread.findMany({
      skip,
      take: validatedLimit,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            // id: true, // Exclude untuk security
            username: true,
            email: true,
            createdAt: true,
          },
        },
        // Include post count untuk setiap thread
        _count: {
          select: {
            posts: true,
          },
        },
      },
    }),
    prisma.thread.count(),
  ]);

  return createPaginationResult(threads, validatedPage, validatedLimit, total);
};

// Fungsi untuk mendapatkan thread berdasarkan ID dengan semua posts
export const findThreadById = async (id: string) => {
  return prisma.thread.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          // id: true, // Exclude untuk security
          username: true,
          email: true,
          createdAt: true,
        },
      },
      // Include semua posts dengan user info untuk menghindari N+1
      posts: {
        include: {
          user: {
            select: {
              // id: true, // Exclude untuk security
              username: true,
              email: true,
              createdAt: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc', // Posts diurutkan dari yang terlama
        },
      },
      // Include post count
      _count: {
        select: {
          posts: true,
        },
      },
    },
  });
};

// Fungsi untuk update thread
export const updateThread = async (id: string, userId: string, data: UpdateThreadInput) => {
  // Build update data only with defined values
  const updateData: any = {};
  if (data.title !== undefined) updateData.title = data.title;
  if (data.content !== undefined) updateData.content = data.content;

  return prisma.thread.update({
    where: {
      id,
      userId, // Pastikan hanya owner yang bisa update
    },
    data: updateData,
    include: {
      user: {
        select: {
          // id: true, // Exclude untuk security
          username: true,
          email: true,
          createdAt: true,
        },
      },
      _count: {
        select: {
          posts: true,
        },
      },
    },
  });
};

// Fungsi untuk delete thread
export const deleteThread = async (id: string, userId: string) => {
  return prisma.thread.delete({
    where: {
      id,
      userId, // Pastikan hanya owner yang bisa delete
    },
  });
};

// Fungsi untuk cek kepemilikan thread
export const isThreadOwner = async (threadId: string, userId: string) => {
  const thread = await prisma.thread.findUnique({
    where: { id: threadId },
    select: { userId: true },
  });

  return thread?.userId === userId;
};