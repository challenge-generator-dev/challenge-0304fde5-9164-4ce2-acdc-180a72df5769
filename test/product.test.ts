import { ProductService } from '../src/application/services/ProductService';
import { ProductRepository } from '../src/domain/repositories/ProductRepository';
import { Product } from '../src/domain/entities/Product';
import { ProductCreateDto } from '../src/domain/entities/Product';
import { ProductUpdateDto } from '../src/domain/entities/Product';

describe('ProductService', () => {
    let productService: ProductService;
    let mockRepository: jest.Mocked<ProductRepository>;

    beforeEach(() => {
        mockRepository = {
            create: jest.fn(),
            findById: jest.fn(),
            findByName: jest.fn(),
            findByCategory: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        };
        productService = new ProductService(mockRepository);
    });

    describe('createProduct', () => {
        it('debería crear un producto cuando los datos son válidos');
        it('debería lanzar error cuando el precio es negativo');
        it('debería lanzar error cuando el nombre ya existe');
    });

    describe('getProductById', () => {
        it('debería retornar el producto cuando existe');
        it('debería retornar null cuando el producto no existe');
    });

    describe('getProductsByName', () => {
        it('debería retornar productos que coincidan con el nombre');
    });

    describe('getProductsByCategory', () => {
        it('debería retornar productos de la categoría especificada');
    });

    describe('updateProduct', () => {
        it('debería actualizar el producto cuando existe');
        it('debería lanzar error cuando el precio es negativo');
        it('debería retornar null cuando el producto no existe');
    });

    describe('deleteProduct', () => {
        it('debería eliminar el producto cuando existe');
        it('debería retornar false cuando el producto no existe');
    });
});