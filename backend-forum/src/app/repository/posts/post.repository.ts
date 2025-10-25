import { prisma } from "../../../config/database.js";
import type { CreatePostInput } from "../../requests/posts/post.schema.js";
import { getPaginationParams, createPaginationResult } from "../../../utils/pagination/index.js";

type CreatePostData = CreatePostInput & { userId: string; threadId: string };

// Fungsi untuk membuat post baru (balasan)
export const createPost = async (data: CreatePostData) => {
  return prisma.post.create({
    data: {
      content: data.content,
      userId: data.userId,
      threadId: data.threadId,
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
      // Include thread info untuk context
      thread: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
};

// Fungsi untuk mendapatkan posts berdasarkan thread ID
export const findPostsByThreadId = async (threadId: string, page: number = 1, limit: number = 20) => {
  const { skip, page: validatedPage, limit: validatedLimit } = getPaginationParams({ page, limit });

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { threadId },
      skip,
      take: validatedLimit,
      orderBy: {
        createdAt: 'asc', // Posts di thread diurutkan dari yang terlama
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
      },
    }),
    prisma.post.count({
      where: { threadId },
    }),
  ]);

  return createPaginationResult(posts, validatedPage, validatedLimit, total);
};

// Fungsi untuk update post
export const updatePost = async (id: string, userId: string, data: { content: string }) => {
  return prisma.post.update({
    where: {
      id,
      userId, // Pastikan hanya owner yang bisa update
    },
    data,
    include: {
      user: {
        select: {
          // id: true, // Exclude untuk security
          username: true,
          email: true,
          createdAt: true,
        },
      },
      thread: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
};

// Fungsi untuk delete post
export const deletePost = async (id: string, userId: string) => {
  return prisma.post.delete({
    where: {
      id,
      userId, // Pastikan hanya owner yang bisa delete
    },
  });
};

// Fungsi untuk cek kepemilikan post
export const isPostOwner = async (postId: string, userId: string) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { userId: true },
  });

  return post?.userId === userId;
};

// Fungsi untuk mendapatkan post berdasarkan ID
export const findPostById = async (id: string) => {
  return prisma.post.findUnique({
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
      thread: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
};