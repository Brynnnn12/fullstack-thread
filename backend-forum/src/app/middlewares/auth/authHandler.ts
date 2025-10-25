import asyncHandler from 'express-async-handler';
import { verifyToken } from '../../../config/jwt.js';

export const authenticateToken = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        res.status(401);
        throw new Error('Access token diperlukan');
    }

    try {
        const decoded = verifyToken(token, process.env.JWT_SECRET!);
        req.user = decoded; // Tambah user info ke request
        next();
    } catch (error) {
        res.status(403);
        throw new Error('Token tidak valid');
    }
});