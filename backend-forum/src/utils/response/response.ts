export const successResponse = (res: any, data: any, message: string, statusCode = 200) => {
    return res.status(statusCode).json({
        status: "success",
        message,
        data
    });
};

export const errorResponse = (res: any, message: string, statusCode = 400) => {
    return res.status(statusCode).json({
        status: "error",
        message
    });
};
