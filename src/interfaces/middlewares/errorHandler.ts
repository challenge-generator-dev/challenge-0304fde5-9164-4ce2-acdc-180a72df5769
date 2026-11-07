import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string = 'Recurso no encontrado') {
        super(message, 404);
    }
}

export class ValidationError extends AppError {
    constructor(message: string = 'Error de validación') {
        super(message, 400);
    }
}

export class ConflictError extends AppError {
    constructor(message: string = 'Conflicto de datos') {
        super(message, 409);
    }
}

export const errorHandler: ErrorRequestHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            error: err.message,
            statusCode: err.statusCode
        });
        return;
    }

    if (err.name === 'ValidationError') {
        res.status(400).json({
            error: 'Error de validación de datos',
            details: err.message,
            statusCode: 400
        });
        return;
    }

    if (err.name === 'MongoServerError' || err.name === 'DynamoDBError') {
        res.status(500).json({
            error: 'Error en la base de datos',
            statusCode: 500
        });
        return;
    }

    console.error('Error no manejado:', err);
    res.status(500).json({
        error: 'Error interno del servidor',
        statusCode: 500
    });
};

export const notFoundHandler = (req: Request, res: Response): void => {
    res.status(404).json({
        error: `Ruta ${req.method} ${req.path} no encontrada`,
        statusCode: 404
    });
};