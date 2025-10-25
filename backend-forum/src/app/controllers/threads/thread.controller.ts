import type { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import {
  createThread,
  getAllThreads,
  getThreadById,
  updateThread,
  deleteThread
} from '../../services/threads/thread.service.js';
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

// Controller untuk membuat thread baru
export const createThreadController = asyncHandler(async (req: Request, res: Response) => {
    const { title, content } = req.body;
    const userId = req.user!.userId || req.user!.id;

    if (!userId) {
        res.status(400);
        throw new Error('User ID not found in token');
    }

    // Panggil service
    const thread = await createThread({ title, content, userId });

    successResponse(res, {
        thread: {
            id: thread.id,
            title: thread.title,
            content: thread.content,
            createdAt: thread.createdAt,
            user: thread.user,
            _count: thread._count,
        }
    }, 'Thread berhasil dibuat', 201);
});

// Controller untuk mendapatkan semua threads
export const getAllThreadsController = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    // Panggil service
    const result = await getAllThreads(page, limit);

    successResponse(res, {
        threads: result.data.map((thread: any) => ({
            id: thread.id,
            title: thread.title,
            content: thread.content,
            createdAt: thread.createdAt,
            user: thread.user,
            _count: thread._count,
        })),
        pagination: result.pagination,
    }, 'Threads berhasil diambil', 200);
});

// Controller untuk mendapatkan thread berdasarkan ID
export const getThreadByIdController = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.status(400);
        throw new Error('Thread ID is required');
    }

    // Panggil service
    const thread = await getThreadById(id);

    successResponse(res, {
        thread: {
            id: thread.id,
            title: thread.title,
            content: thread.content,
            createdAt: thread.createdAt,
            user: thread.user,
            posts: thread.posts.map((post: any) => ({
                id: post.id,
                content: post.content,
                createdAt: post.createdAt,
                user: post.user,
            })),
            _count: thread._count,
        }
    }, 'Thread berhasil diambil', 200);
});

// Controller untuk update thread
export const updateThreadController = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user!.userId || req.user!.id;

    if (!id) {
        res.status(400);
        throw new Error('Thread ID is required');
    }

    if (!userId) {
        res.status(400);
        throw new Error('User ID not found in token');
    }

    // Panggil service
    const thread = await updateThread(id, userId, { title, content });

    successResponse(res, {
        thread: {
            id: thread.id,
            title: thread.title,
            content: thread.content,
            createdAt: thread.createdAt,
            user: (thread as any).user,
            _count: (thread as any)._count,
        }
    }, 'Thread berhasil diupdate', 200);
});

// Controller untuk delete thread
export const deleteThreadController = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.userId || req.user!.id;

    if (!id) {
        res.status(400);
        throw new Error('Thread ID is required');
    }

    if (!userId) {
        res.status(400);
        throw new Error('User ID not found in token');
    }

    // Panggil service
    const result = await deleteThread(id, userId);

    successResponse(res, result, 'Thread berhasil dihapus', 200);
});