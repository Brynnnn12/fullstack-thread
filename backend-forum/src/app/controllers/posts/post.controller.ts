import type { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import {
  createPost,
  getPostsByThreadId,
  updatePost,
  deletePost
} from '../../services/posts/post.service.js';
import type { JWTPayload } from '../../../config/jwt.js';
import { successResponse } from '../../../utils/response/response.js';

// Extend Request untuk menambah user property
declare global {
    namespace Express {
        interface Request {
            user?: JWTPayload;
        }
    }
}

// Controller untuk membuat post baru (balasan)
export const createPostController = asyncHandler(async (req: Request, res: Response) => {
    const { threadId, content } = req.body;
    const userId = req.user!.userId || req.user!.id;

    if (!userId) {
        res.status(400);
        throw new Error('User ID not found in token');
    }

    // Panggil service
    const post = await createPost({ content, threadId, userId });

    successResponse(res, {
        post: {
            id: post.id,
            content: post.content,
            createdAt: post.createdAt,
            user: post.user,
            thread: post.thread,
        }
    }, 'Post berhasil dibuat', 201);
});

// Controller untuk mendapatkan posts berdasarkan thread ID
export const getPostsByThreadIdController = asyncHandler(async (req: Request, res: Response) => {
    const { threadId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    if (!threadId) {
        res.status(400);
        throw new Error('Thread ID is required');
    }

    // Panggil service
    const result = await getPostsByThreadId(threadId, page, limit);

    successResponse(res, {
        posts: result.data.map((post: any) => ({
            id: post.id,
            content: post.content,
            createdAt: post.createdAt,
            user: post.user,
        })),
        pagination: result.pagination,
    }, 'Posts berhasil diambil', 200);
});

// Controller untuk update post
export const updatePostController = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user!.userId || req.user!.id;

    if (!id) {
        res.status(400);
        throw new Error('Post ID is required');
    }

    if (!userId) {
        res.status(400);
        throw new Error('User ID not found in token');
    }

    // Panggil service
    const post = await updatePost(id, userId, { content });
    successResponse(res, {
        post: {
            id: post.id,
            content: post.content,
            createdAt: post.createdAt,
            user: post.user,
            thread: post.thread,
        }
    }, 'Post berhasil diupdate', 200);
});

// Controller untuk delete post
export const deletePostController = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.userId || req.user!.id;

    if (!id) {
        res.status(400);
        throw new Error('Post ID is required');
    }

    if (!userId) {
        res.status(400);
        throw new Error('User ID not found in token');
    }

    // Panggil service
    const result = await deletePost(id, userId);

    successResponse(res, result, 'Post berhasil dihapus', 200);
});