import jwt from 'jsonwebtoken';

// Interface untuk JWT payload (sesuaikan dengan kebutuhan)
export interface JWTPayload {
    userId?: string; // Primary field
    id?: string;     // Backward compatibility
    email: string;
    [key: string]: any; // Untuk field tambahan
}

export const generateToken = (payload: JWTPayload, secret: string, expiresIn: string = '1h') => {
    return jwt.sign(payload, secret, { expiresIn } as any);
};

export const verifyToken = (token: string, secret: string): JWTPayload => {
    try {
        const decoded = jwt.verify(token, secret) as JWTPayload;
        return decoded;
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};