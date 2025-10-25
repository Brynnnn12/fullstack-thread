import type { Request, Response, NextFunction } from 'express';

// 404 Not Found Handler
export const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Halaman ${req.originalUrl} tidak ditemukan`);
    res.status(404).json({
        status: "error",
        message: error.message
    });
    // Jangan panggil next() karena response sudah dikirim
};

// Global Error Handler
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // Log error untuk debugging (dalam production gunakan logger seperti winston)
    // console.error('Error:', err);

    // Default error response
    let statusCode = 500;
    let message = 'Internal Server Error';

    // Handle specific error types
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation Error';
    } else if (err.name === 'UnauthorizedError') {
        statusCode = 401;
        message = 'Unauthorized';
    } else if (err.name === 'CastError') {
        statusCode = 400;
        message = 'Invalid data format';
    }

    // Di development, tampilkan error detail; di production, jangan
    const isDevelopment = process.env.NODE_ENV === 'development';
    const errorResponse = {
        status: "error",
        message: isDevelopment ? err.message : message,
        ...(isDevelopment && { stack: err.stack })
    };

    res.status(statusCode).json(errorResponse);
};