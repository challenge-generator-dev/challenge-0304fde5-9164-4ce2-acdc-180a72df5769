import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';

export interface MockDynamoDBData {
  [key: string]: Record<string, unknown>;
}

export interface MockDynamoDBOptions {
  tableName?: string;
  initialData?: MockDynamoDBData;
}

export class MockDynamoDBClient {
  private data: Map<string, Record<string, unknown>>;
  private tableName: string;
  private queryResults: Map<string, Record<string, unknown>[]>;

  constructor(options: MockDynamoDBOptions = {}) {
    this.tableName = options.tableName || 'products';
    this.data = new Map();
    this.queryResults = new Map();
    
    if (options.initialData) {
      Object.entries(options.initialData).forEach(([key, value]) => {
        this.data.set(key, value);
      });
    }
  }

  send = jest.fn().mockImplementation(async (command: unknown): Promise<Record<string, unknown>> => {
    if (command instanceof PutCommand) {
      const input = (command as { input?: { Item?: Record<string, unknown> } }).input;
      if (input?.Item) {
        const id = input.Item.id as string;
        this.data.set(id, input.Item);
        return { $metadata: { httpStatusCode: 200 } };
      }
    }
    
    if (command instanceof GetCommand) {
      const input = (command as { input?: { Key?: Record<string, unknown> } }).input;
      if (input?.Key) {
        const id = input.Key.id as string;
        const item = this.data.get(id);
        return item ? { Item: item } : {};
      }
    }
    
    if (command instanceof UpdateCommand) {
      const input = (command as { input?: { Key?: Record<string, unknown>; UpdateExpression?: string } }).input;
      if (input?.Key) {
        const id = input.Key.id as string;
        const existing = this.data.get(id);
        if (existing) {
          this.data.set(id, { ...existing });
          return { Attributes: existing, $metadata: { httpStatusCode: 200 } };
        }
      }
    }
    
    if (command instanceof DeleteCommand) {
      const input = (command as { input?: { Key?: Record<string, unknown> } }).input;
      if (input?.Key) {
        const id = input.Key.id as string;
        this.data.delete(id);
        return { $metadata: { httpStatusCode: 200 } };
      }
    }
    
    if (command instanceof ScanCommand) {
      const items = Array.from(this.data.values());
      return { Items: items, Count: items.length, $metadata: { httpStatusCode: 200 } };
    }
    
    return { $metadata: { httpStatusCode: 200 } };
  });

  addItem(item: Record<string, unknown>): void {
    const id = item.id as string;
    this.data.set(id, item);
  }

  getItem(id: string): Record<string, unknown> | undefined {
    return this.data.get(id);
  }

  removeItem(id: string): void {
    this.data.delete(id);
  }

  clear(): void {
    this.data.clear();
    this.queryResults.clear();
  }

  getAllItems(): Record<string, unknown>[] {
    return Array.from(this.data.values());
  }
}

export function createMockDynamoDBClient(options?: MockDynamoDBOptions): MockDynamoDBClient {
  return new MockDynamoDBClient(options);
}

export function createMockDocumentClient(mockClient: MockDynamoDBClient): DynamoDBDocumentClient {
  return DynamoDBDocumentClient.from(mockClient as unknown as DynamoDBClient, {
    marshallOptions: {
      removeUndefinedValues: true,
    },
  });
}

export const mockProductData = {
  valid: {
    id: 'prod-001',
    nombre: 'Laptop Gaming',
    precio: 1299.99,
    stock: 10,
    categoria: 'Electrónica',
  },
  duplicateName: {
    id: 'prod-002',
    nombre: 'Laptop Gaming',
    precio: 999.99,
    stock: 5,
    categoria: 'Electrónica',
  },
  negativePrice: {
    id: 'prod-003',
    nombre: 'Mouse Inalámbrico',
    precio: -25.00,
    stock: 20,
    categoria: 'Accesorios',
  },
  zeroStock: {
    id: 'prod-004',
    nombre: 'Teclado Mecánico',
    precio: 150.00,
    stock: 0,
    categoria: 'Accesorios',
  },
  electronics: [
    { id: 'prod-001', nombre: 'Laptop Gaming', precio: 1299.99, stock: 10, categoria: 'Electrónica' },
    { id: 'prod-005', nombre: 'Monitor 4K', precio: 499.99, stock: 15, categoria: 'Electrónica' },
  ],
  accessories: [
    { id: 'prod-004', nombre: 'Teclado Mecánico', precio: 150.00, stock: 0, categoria: 'Accesorios' },
    { id: 'prod-006', nombre: 'Mouse Inalámbrico', precio: 25.00, stock: 50, categoria: 'Accesorios' },
  ],
};