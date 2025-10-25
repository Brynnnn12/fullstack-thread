import express from 'express';
import {
    createPostController,
    getPostsByThreadIdController,
    updatePostController,
    deletePostController
} from '../app/controllers/posts/post.controller.js';
import { createPostSchema, getPostsByThreadSchema, updatePostSchema, deletePostSchema } from '../app/requests/posts/post.schema.js';
import { validate } from '../app/middlewares/global/validate.js';
import { authenticateToken } from '../app/middlewares/auth/authHandler.js';

const router = express.Router();

// Route untuk mendapatkan posts berdasarkan thread ID (public)
router.get('/thread/:threadId',
    validate(getPostsByThreadSchema),
    getPostsByThreadIdController
);

// Route untuk membuat post baru (balasan) (protected)
router.post('/',
    authenticateToken,
    validate(createPostSchema),
    createPostController
);

// Route untuk update post (protected - hanya owner)
router.put('/:id',
    authenticateToken,
    validate(updatePostSchema),
    updatePostController
);

// Route untuk delete post (protected - hanya owner)
router.delete('/:id',
    authenticateToken,
    validate(deletePostSchema),
    deletePostController
);

export default router;