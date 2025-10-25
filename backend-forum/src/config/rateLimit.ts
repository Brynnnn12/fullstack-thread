import rateLimit from 'express-rate-limit';

/**
 * Middleware untuk membatasi jumlah permintaan dari satu IP dalam jangka waktu tertentu.
 * Berguna untuk mencegah serangan DDoS dan penyalahgunaan API.
 * @param requests Maksimal jumlah permintaan yang diizinkan.
 * @param windowMs Jangka waktu dalam milidetik untuk menghitung permintaan.
 * @returns Middleware rate limiting.
 */
export const createRateLimitMiddleware = (requests: number, windowMs: number) => {
    return rateLimit({
        windowMs,
        max: requests,
        message: {
            status: "error",
            message: `Terlalu banyak permintaan, silakan coba lagi nanti.`
        }
    });
};
// Contoh penggunaan:
// import express from 'express';
// import { createRateLimitMiddleware } from './config/rateLimit';

// const app = express();

// app.use(createRateLimitMiddleware(100, 15 * 60 * 1000)); // 100 permintaan per 15 menit
// app.listen(3000, () => {
//     console.log('Server berjalan di http://localhost:3000');
// });