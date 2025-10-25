import express from 'express';
import {
    createThreadController,
    getAllThreadsController,
    getThreadByIdController,
    updateThreadController,
    deleteThreadController
} from '../app/controllers/threads/thread.controller.js';
import { createThreadSchema, updateThreadSchema } from '../app/requests/threads/thread.schema.js';
import { validate } from '../app/middlewares/global/validate.js';
import { authenticateToken } from '../app/middlewares/auth/authHandler.js';

const router = express.Router();

// Route untuk mendapatkan semua threads (public)
router.get('/',
    getAllThreadsController
);

// Route untuk mendapatkan thread berdasarkan ID (public)
router.get('/:id',
    getThreadByIdController
);

// Route untuk membuat thread baru (protected)
router.post('/',
    authenticateToken,
    validate(createThreadSchema),
    createThreadController
);

// Route untuk update thread (protected - hanya owner)
router.put('/:id',
    authenticateToken,
    validate(updateThreadSchema),
    updateThreadController
);

// Route untuk delete thread (protected - hanya owner)
router.delete('/:id',
    authenticateToken,
    deleteThreadController
);

export default router;