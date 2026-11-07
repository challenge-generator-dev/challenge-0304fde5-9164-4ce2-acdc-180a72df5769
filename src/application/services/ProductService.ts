import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { Product } from '../../domain/entities/Product';
import { ProductCreateDto } from '../../domain/entities/Product';
import { ProductUpdateDto } from '../../domain/entities/Product';
import { ProductDto } from '../../domain/entities/Product';

export class ProductService {
    private readonly repository: ProductRepository;

    constructor(repository: ProductRepository) {
        this.repository = repository;
    }

    async createProduct(dto: ProductCreateDto): Promise<ProductDto> {
        if (dto.precio < 0) {
            throw new Error('El precio no puede ser negativo');
        }
        if (dto.stock < 0) {
            throw new Error('El stock no puede ser negativo');
        }

        const existingProducts = await this.repository.findByName(dto.nombre);
        if (existingProducts.length > 0) {
            throw new Error('Ya existe un producto con ese nombre');
        }

        const created = await this.repository.create(dto);
        return new ProductDto(created);
    }

    async getProductById(id: string): Promise<ProductDto | null> {
        const product = await this.repository.findById(id);
        if (!product) {
            return null;
        }
        return new ProductDto(product);
    }

    async getProductsByName(name: string): Promise<ProductDto[]> {
        const products = await this.repository.findByName(name);
        return products.map(p => new ProductDto(p));
    }

    async getProductsByCategory(category: string): Promise<ProductDto[]> {
        const products = await this.repository.findByCategory(category);
        return products.map(p => new ProductDto(p));
    }

    async updateProduct(id: string, dto: ProductUpdateDto): Promise<ProductDto | null> {
        if (dto.precio !== undefined && dto.precio < 0) {
            throw new Error('El precio no puede ser negativo');
        }
        if (dto.stock !== undefined && dto.stock < 0) {
            throw new Error('El stock no puede ser negativo');
        }

        const existing = await this.repository.findById(id);
        if (!existing) {
            return null;
        }

        const updated = await this.repository.update(id, dto);
        return new ProductDto(updated);
    }

    async deleteProduct(id: string): Promise<boolean> {
        const existing = await this.repository.findById(id);
        if (!existing) {
            return false;
        }
        await this.repository.delete(id);
        return true;
    }
}