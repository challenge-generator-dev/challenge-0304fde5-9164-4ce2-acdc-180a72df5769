import { Product } from '../entities/Product';

export class ProductCreateDto {
  nombre: string;
  precio: number;
  stock: number;
  categoría: string;

  constructor(data: { nombre: string; precio: number; stock: number; categoría: string }) {
    this.nombre = data.nombre;
    this.precio = data.precio;
    this.stock = data.stock;
    this.categoría = data.categoría;
  }
}

export class ProductUpdateDto {
  precio?: number;
  stock?: number;
  categoría?: string;

  constructor(data?: { precio?: number; stock?: number; categoría?: string }) {
    if (data) {
      this.precio = data.precio;
      this.stock = data.stock;
      this.categoría = data.categoría;
    }
  }
}

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