import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { ProductController } from './interfaces/controllers/ProductController';
import { ProductService } from './application/services/ProductService';
import { ProductRepository } from './domain/repositories/ProductRepository';
import { DynamoDBProductRepository } from './infrastructure/repositories/DynamoDBProductRepository';
import { getDynamoDBClient, getDocClient, getTableName } from './infrastructure/config/dynamodb';
import { errorHandler } from './interfaces/middlewares/errorHandler';
import { validateCreateProduct, validateUpdateProduct, validateIdParam, validateQueryParams } from './interfaces/middlewares/validation';

dotenv.config();

function createApp(): Application {
  const app: Application = express();
  app.use(express.json());

  const dynamoDBClient = getDynamoDBClient();
  const docClient = getDocClient(dynamoDBClient);
  const tableName = getTableName();

  const productRepository: ProductRepository = new DynamoDBProductRepository(docClient, tableName);
  const productService: ProductService = new ProductService(productRepository);
  const productController: ProductController = new ProductController(productService);

  app.use('/products', validateCreateProduct, validateUpdateProduct, validateIdParam, validateQueryParams);
  app.use(productController.getRouter());

  app.use(errorHandler);

  return app;
}

function startServer(): void {
  const app = createApp();
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
  });
}

if (require.main === module) {
  startServer();
}

export { createApp, startServer };