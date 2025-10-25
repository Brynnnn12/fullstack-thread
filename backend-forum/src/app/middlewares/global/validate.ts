import { ZodError } from 'zod';
import type { ZodSchema, ZodIssue } from 'zod';
import type { Request, Response, NextFunction } from 'express';

/**
 * Middleware High-Order Function untuk validasi Zod.
 * Jika validasi gagal, akan langsung mengirim respons 400.
 * @param schema Skema Zod (ZodSchema)
 */
export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // .parse() adalah sinkron, jadi tidak perlu async
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      // Jika sukses, lanjut ke controller
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        // --- Ini adalah perubahan utamanya ---
        // Jika ini error Zod, kita format dan langsung kirim respons.
        
        const formattedErrors = err.issues.map((e: ZodIssue) => ({
          field: e.path.join('.'), // cth: 'body.email'
          message: e.message,
        }));

        // Langsung kirim respons 400 Bad Request
        return res.status(400).json({
          status: 'error',
          message: 'Input validation failed',
          errors: formattedErrors,
        });
      }

      // Jika error lain (bukan ZodError, misal error 500),
      // kita lempar ke error handler global
      next(err);
    }
  };