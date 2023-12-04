import { Request, Response, NextFunction } from "express";
import { AppError } from "@/errors/app-error";

export const globalErrorMiddleware = async (
    error: any,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            mensagem: error.message,
        });
    }

    console.error(error);

    return response.status(500).json({
        mensagem: "Internal server error",
    });
};
