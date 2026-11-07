import { Request, Response, NextFunction } from 'express';
import { validate, ValidationError as ClassValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ProductCreateDto } from '../../domain/entities/Product';
import { ProductUpdateDto } from '../../domain/entities/Product';
import { ValidationError } from './errorHandler';

export const validateCreateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const dto = plainToInstance(ProductCreateDto, req.body);
    const errors: ClassValidationError[] = await validate(dto);

    if (errors.length > 0) {
        const messages = errors.map(err => {
            const constraints = Object.values(err.constraints || {});
            return constraints.join(', ');
        });
        next(new ValidationError(messages.join('; ')));
        return;
    }

    if (dto.precio !== undefined && dto.precio < 0) {
        next(new ValidationError('El precio no puede ser negativo'));
        return;
    }

    if (dto.nombre !== undefined && dto.nombre.trim() === '') {
        next(new ValidationError('El nombre no puede estar vacío'));
        return;
    }

    if (dto.stock !== undefined && dto.stock < 0) {
        next(new ValidationError('El stock no puede ser negativo'));
        return;
    }

    next();
};

export const validateUpdateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const dto = plainToInstance(ProductUpdateDto, req.body);
    const errors: ClassValidationError[] = await validate(dto);

    if (errors.length > 0) {
        const messages = errors.map(err => {
            const constraints = Object.values(err.constraints || {});
            return constraints.join(', ');
        });
        next(new ValidationError(messages.join('; ')));
        return;
    }

    if (dto.precio !== undefined && dto.precio < 0) {
        next(new ValidationError('El precio no puede ser negativo'));
        return;
    }

    if (dto.stock !== undefined && dto.stock < 0) {
        next(new ValidationError('El stock no puede ser negativo'));
        return;
    }

    if (Object.keys(req.body).length === 0) {
        next(new ValidationError('Debe proporcionar al menos un campo para actualizar'));
        return;
    }

    next();
};

export const validateProductId = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { id } = req.params;

    if (!id || id.trim() === '') {
        next(new ValidationError('El ID del producto es requerido'));
        return;
    }

    next();
};

export const validateQueryParams = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { name, category } = req.query;

    if (name !== undefined && typeof name !== 'string') {
        next(new ValidationError('El parámetro name debe ser una cadena'));
        return;
    }

    if (category !== undefined && typeof category !== 'string') {
        next(new ValidationError('El parámetro category debe ser una cadena'));
        return;
    }

    if (name && category) {
        next(new ValidationError('No se puede especificar name y category simultáneamente'));
        return;
    }

    next();
};