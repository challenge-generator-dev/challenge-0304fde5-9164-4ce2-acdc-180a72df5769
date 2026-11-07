import { Request, Response, Router, NextFunction } from 'express';
import { ProductService } from '../../application/services/ProductService';
import { ProductCreateDto } from '../../domain/entities/Product';
import { ProductUpdateDto } from '../../domain/entities/Product';
import { ProductDto } from '../../domain/entities/Product';

export class ProductController {
    private readonly productService: ProductService;
    private readonly router: Router;

    constructor(productService: ProductService) {
        this.productService = productService;
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/', this.createProduct.bind(this));
        this.router.get('/:id', this.getProductById.bind(this));
        this.router.get('/', this.getProducts.bind(this));
        this.router.put('/:id', this.updateProduct.bind(this));
        this.router.delete('/:id', this.deleteProduct.bind(this));
    }

    private async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const productData: ProductCreateDto = {
                nombre: req.body.nombre,
                precio: req.body.precio,
                stock: req.body.stock,
                categoría: req.body.categoría
            };

            const product = await this.productService.createProduct(productData);
            const productDto = new ProductDto(product);
            
            res.status(201).json(productDto);
        } catch (error) {
            next(error);
        }
    }

    private async getProductById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const product = await this.productService.getProductById(id);

            if (!product) {
                res.status(404).json({ error: 'Producto no encontrado' });
                return;
            }

            const productDto = new ProductDto(product);
            res.json(productDto);
        } catch (error) {
            next(error);
        }
    }

    private async getProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, category } = req.query;
            let products;

            if (name && typeof name === 'string') {
                products = await this.productService.getProductsByName(name);
                if (products.length === 0) {
                    res.status(404).json({ error: 'No se encontraron productos con ese nombre' });
                    return;
                }
            } else if (category && typeof category === 'string') {
                products = await this.productService.getProductsByCategory(category);
                if (products.length === 0) {
                    res.status(404).json({ error: 'No se encontraron productos en esa categoría' });
                    return;
                }
            } else {
                products = await this.productService.getAllProducts();
            }

            const productDtos = products.map(p => new ProductDto(p));
            res.json(productDtos);
        } catch (error) {
            next(error);
        }
    }

    private async updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const updateData: ProductUpdateDto = {
                precio: req.body.precio,
                stock: req.body.stock,
                categoría: req.body.categoría
            };

            const product = await this.productService.updateProduct(id, updateData);
            
            if (!product) {
                res.status(404).json({ error: 'Producto no encontrado' });
                return;
            }

            const productDto = new ProductDto(product);
            res.json(productDto);
        } catch (error) {
            next(error);
        }
    }

    private async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const deleted = await this.productService.deleteProduct(id);

            if (!deleted) {
                res.status(404).json({ error: 'Producto no encontrado' });
                return;
            }

            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    public getRouter(): Router {
        return this.router;
    }
}