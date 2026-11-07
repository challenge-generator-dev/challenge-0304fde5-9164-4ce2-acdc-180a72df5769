import { IsNumber, IsPositive, IsString, MinLength } from 'class-validator';

/**
 * Entidad que representa un producto en el sistema.
 */
export class Product {
    id: string;

    @IsString()
    @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    nombre: string;

    @IsNumber({}, { message: 'El precio debe ser un número' })
    @IsPositive({ message: 'El precio debe ser positivo' })
    precio: number;

    @IsNumber({}, { message: 'El stock debe ser un número' })
    @IsPositive({ message: 'El stock debe ser positivo' })
    stock: number;

    @IsString()
    @MinLength(3, { message: 'La categoría debe tener al menos 3 caracteres' })
    categoría: string;

    constructor(
        id: string,
        nombre: string,
        precio: number,
        stock: number,
        categoría: string
    ) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.categoría = categoría;
    }
}

/**
 * DTO para la creación de un producto.
 */
export class ProductCreateDto {
    @IsString()
    @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    nombre: string;

    @IsNumber({}, { message: 'El precio debe ser un número' })
    @IsPositive({ message: 'El precio debe ser positivo' })
    precio: number;

    @IsNumber({}, { message: 'El stock debe ser un número' })
    @IsPositive({ message: 'El stock debe ser positivo' })
    stock: number;

    @IsString()
    @MinLength(3, { message: 'La categoría debe tener al menos 3 caracteres' })
    categoría: string;
}

/**
 * DTO para la actualización de un producto.
 */
export class ProductUpdateDto {
    @IsNumber({}, { message: 'El precio debe ser un número', each: false })
    @IsPositive({ message: 'El precio debe ser positivo', each: false })
    precio?: number;

    @IsNumber({}, { message: 'El stock debe ser un número', each: false })
    @IsPositive({ message: 'El stock debe ser positivo', each: false })
    stock?: number;

    @IsString()
    @MinLength(3, { message: 'La categoría debe tener al menos 3 caracteres', each: false })
    categoría?: string;
}

/**
 * DTO para la respuesta de un producto.
 */
export class ProductDto {
    id: string;
    nombre: string;
    precio: number;
    stock: number;
    categoría: string;

    constructor(product: Product) {
        this.id = product.id;
        this.nombre = product.nombre;
        this.precio = product.precio;
        this.stock = product.stock;
        this.categoría = product.categoría;
    }
}