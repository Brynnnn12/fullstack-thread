import type { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { register, login, getProfile } from '../../services/auth/auth.service.js';
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

// Controller untuk Register
export const registerController = asyncHandler(async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    // Validasi input (gunakan Zod atau middleware validasi)
    if (!username || !email || !password) {
        res.status(400);
        throw new Error('Username, email, dan password harus diisi');
    }

    // Panggil service (passwordConfirmation sudah divalidasi di middleware)
    const user = await register({ username, email, password });

    successResponse(res, {
        user: {
            // id: user.id, // ← Exclude untuk security
            username: user.username,
            email: user.email,
            createdAt: user.createdAt
        }
    }, 'User berhasil dibuat', 201);
});

// Controller untuk Login
export const loginController = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
        res.status(400);
        throw new Error('Email dan password harus diisi');
    }

    // Panggil service
    const token = await login({ email, password });

    successResponse(res, { token }, 'Login berhasil', 200);
});

// Controller untuk Get Profile (Protected Route)
export const getProfileController = asyncHandler(async (req: Request, res: Response) => {
    // Handle backward compatibility: id or userId
    const userId = req.user!.userId || req.user!.id;
    if (!userId) {
        res.status(400);
        throw new Error('User ID not found in token');
    }

    // Panggil service
    const profile = await getProfile(userId);

    successResponse(res, {
        user: {
            // id: profile.id, // ← Exclude untuk security
            username: profile.username,
            email: profile.email,
            createdAt: profile.createdAt
        }, 


    }, 'Profile fetched successfully', 200);
});

