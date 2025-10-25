import express from 'express';
import {
    registerController,
    loginController,
    getProfileController
} from '../app/controllers/auth/auth.controller.js';
import { registerSchema, loginSchema } from '../app/requests/auth/auth.schema.js';
import { validate } from '../app/middlewares/global/validate.js';
import { authenticateToken } from '../app/middlewares/auth/authHandler.js';

const router = express.Router();

// Route untuk Register
router.post('/register',
    validate(registerSchema),
    registerController
);

// Route untuk Login
router.post('/login',
    validate(loginSchema),
    loginController
);

// Route untuk Get Profile (Protected)
router.get('/profile',
    authenticateToken,
    getProfileController
);

export default router;