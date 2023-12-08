import { Request, Response, NextFunction } from "express";
import { AppError } from "@/errors/app-error";
import { z } from "zod";

type ZodErrorType = {
    code: string;
    expected: string;
    received: string;
    path: string[];
    message: string;
};

type ErrorMessageReturnType = {
    [key: string]: string;
};

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

    if (error instanceof z.ZodError) {
        const message: ErrorMessageReturnType[] = [];

        const errors: ZodErrorType[] = JSON.parse(error.message);

        errors.forEach((err) => {
            const errorObject = {
                [err.path[0]]: err.message,
            };

            message.push(errorObject);
        });

        return response.status(400).json({
            mensagem: message,
        });
    }

    console.error(error);

    return response.status(500).json({
        mensagem: "Internal server error",
    });
};
