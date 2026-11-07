import { Product, ProductCreateDto, ProductUpdateDto } from '../entities/Product';

/**
 * Interfaz que define las operaciones de persistencia para productos.
 * Implementada por la capa de infraestructura.
 */
export interface ProductRepository {
    /**
     * Crea un nuevo producto en el repositorio.
     * @param productData Datos del producto a crear.
     * @returns El producto creado.
     * @throws Error si el producto no puede ser creado.
     */
    create(productData: ProductCreateDto): Promise<Product>;

    /**
     * Busca un producto por su ID.
     * @param id ID del producto.
     * @returns El producto encontrado o null si no existe.
     * @throws Error si ocurre un error en la búsqueda.
     */
    findById(id: string): Promise<Product | null>;

    /**
     * Busca productos por su nombre.
     * @param name Nombre del producto.
     * @returns Lista de productos con el nombre especificado.
     * @throws Error si ocurre un error en la búsqueda.
     */
    findByName(name: string): Promise<Product[]>;

    /**
     * Busca productos por su categoría.
     * @param category Categoría del producto.
     * @returns Lista de productos en la categoría especificada.
     * @throws Error si ocurre un error en la búsqueda.
     */
    findByCategory(category: string): Promise<Product[]>;

    /**
     * Actualiza un producto existente.
     * @param id ID del producto a actualizar.
     * @param updateData Datos a actualizar.
     * @returns El producto actualizado.
     * @throws Error si el producto no existe o no puede ser actualizado.
     */
    update(id: string, updateData: ProductUpdateDto): Promise<Product>;

    /**
     * Elimina un producto por su ID.
     * @param id ID del producto a eliminar.
     * @throws Error si el producto no existe o no puede ser eliminado.
     */
    delete(id: string): Promise<void>;
}