const getEnv = (key : string) : string => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Environment variable ${key} is not set`);
    }
    return value;
}

export const config = {
    port: parseInt(getEnv('PORT'), 10),
    nodeEnv: getEnv('NODE_ENV'),
    databaseUrl: getEnv('DATABASE_URL'),
    jwtSecret: {
        secret: getEnv('JWT_SECRET')
    }
}