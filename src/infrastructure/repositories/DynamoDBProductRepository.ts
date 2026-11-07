import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { Product, ProductCreateDto, ProductUpdateDto } from '../../domain/entities/Product';
import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { v4 as uuidv4 } from 'uuid';

/**
 * Implementación del repositorio de productos usando DynamoDB.
 */
export class DynamoDBProductRepository implements ProductRepository {
    private readonly client: DynamoDBDocumentClient;
    private readonly tableName: string;

    constructor(client: DynamoDBClient, tableName: string) {
        this.client = DynamoDBDocumentClient.from(client);
        this.tableName = tableName;
    }

    async create(productData: ProductCreateDto): Promise<Product> {
        const id = uuidv4();
        const product = new Product(
            id,
            productData.nombre,
            productData.precio,
            productData.stock,
            productData.categoría
        );

        const command = new PutCommand({
            TableName: this.tableName,
            Item: {
                id: product.id,
                nombre: product.nombre,
                precio: product.precio,
                stock: product.stock,
                categoría: product.categoría
            },
            ConditionExpression: 'attribute_not_exists(id)'
        });

        try {
            await this.client.send(command);
            return product;
        } catch (error) {
            throw new Error(`No se pudo crear el producto: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async findById(id: string): Promise<Product | null> {
        const command = new GetCommand({
            TableName: this.tableName,
            Key: { id }
        });

        try {
            const response = await this.client.send(command);
            if (!response.Item) {
                return null;
            }

            return new Product(
                response.Item.id,
                response.Item.nombre,
                response.Item.precio,
                response.Item.stock,
                response.Item.categoría
            );
        } catch (error) {
            throw new Error(`No se pudo buscar el producto por ID: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async findByName(name: string): Promise<Product[]> {
        const command = new QueryCommand({
            TableName: this.tableName,
            IndexName: 'nombre-index',
            KeyConditionExpression: 'nombre = :nombre',
            ExpressionAttributeValues: {
                ':nombre': name
            }
        });

        try {
            const response = await this.client.send(command);
            if (!response.Items || response.Items.length === 0) {
                return [];
            }

            return response.Items.map(item =>
                new Product(
                    item.id,
                    item.nombre,
                    item.precio,
                    item.stock,
                    item.categoría
                )
            );
        } catch (error) {
            throw new Error(`No se pudo buscar productos por nombre: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async findByCategory(category: string): Promise<Product[]> {
        const command = new QueryCommand({
            TableName: this.tableName,
            IndexName: 'categoría-index',
            KeyConditionExpression: 'categoría = :categoría',
            ExpressionAttributeValues: {
                ':categoría': category
            }
        });

        try {
            const response = await this.client.send(command);
            if (!response.Items || response.Items.length === 0) {
                return [];
            }

            return response.Items.map(item =>
                new Product(
                    item.id,
                    item.nombre,
                    item.precio,
                    item.stock,
                    item.categoría
                )
            );
        } catch (error) {
            throw new Error(`No se pudo buscar productos por categoría: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async update(id: string, updateData: ProductUpdateDto): Promise<Product> {
        const updateExpressions = [];
        const expressionAttributeValues = {};
        const expressionAttributeNames = {};

        if (updateData.precio !== undefined) {
            updateExpressions.push('#precio = :precio');
            expressionAttributeValues[':precio'] = updateData.precio;
            expressionAttributeNames['#precio'] = 'precio';
        }

        if (updateData.stock !== undefined) {
            updateExpressions.push('#stock = :stock');
            expressionAttributeValues[':stock'] = updateData.stock;
            expressionAttributeNames['#stock'] = 'stock';
        }

        if (updateData.categoría !== undefined) {
            updateExpressions.push('#categoría = :categoría');
            expressionAttributeValues[':categoría'] = updateData.categoría;
            expressionAttributeNames['#categoría'] = 'categoría';
        }

        if (updateExpressions.length === 0) {
            throw new Error('No se proporcionaron datos para actualizar');
        }

        const command = new UpdateCommand({
            TableName: this.tableName,
            Key: { id },
            UpdateExpression: `SET ${updateExpressions.join(', ')}`,
            ExpressionAttributeValues,
            ExpressionAttributeNames,
            ReturnValues: 'ALL_NEW'
        });

        try {
            const response = await this.client.send(command);
            if (!response.Attributes) {
                throw new Error('No se pudo actualizar el producto');
            }

            return new Product(
                response.Attributes.id,
                response.Attributes.nombre,
                response.Attributes.precio,
                response.Attributes.stock,
                response.Attributes.categoría
            );
        } catch (error) {
            throw new Error(`No se pudo actualizar el producto: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async delete(id: string): Promise<void> {
        const command = new DeleteCommand({
            TableName: this.tableName,
            Key: { id }
        });

        try {
            await this.client.send(command);
        } catch (error) {
            throw new Error(`No se pudo eliminar el producto: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
}