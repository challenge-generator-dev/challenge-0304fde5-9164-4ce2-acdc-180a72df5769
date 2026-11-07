# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `test/product.test.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- `test/mocks/dynamodbClient.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `app` | (raiz) | practice, chapter | server | Node | Express, DynamoDB, Jest |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `npm install && npm run build` — componente `app` (practice, chapter).

### Contratos entre componentes

- `app` expone http (api: http://localhost:3000):
  - `POST /products`
  - `GET /products/:id`
  - `GET /products?name=:name`
  - `GET /products?category=:category`
  - `PUT /products/:id`
  - `DELETE /products/:id`

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Boilerplate del stack que falta

Sin esto no compila ni arranca. Es andamiaje, no toca nada de lo pedagogico:

- **src/app.module.ts** — Sin el modulo raiz, Nest no tiene arbol de dependencias que resolver y el bootstrap falla.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `src/interfaces/controllers/ProductController.ts` — `ProductService.getAllProducts`: Se invoca `getAllProducts` sobre `ProductService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
npm install && npm run build && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2

### Brecha de conocimiento
CRUD de productos en DynamoDB expuesto por una API REST con Express y pruebas con Jest (corrida e2e 20261106194239047), Implementa operaciones CRUD de productos sobre DynamoDB con Express y las cubre con pruebas unitarias en Jest

### Misión / candidato
Persistir y consultar productos

### Reto
- Tema: CRUD de productos con Express y DynamoDB
- Seniority: advanced-l2
- Tipo: practical
- Título: Implementación de CRUD de productos en DynamoDB con Express
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Creación de productos — objetivo: Permitir la creación de productos con validación de atributos — entregable (NO resolver): API REST que permite crear productos con validación de atributos.
- Fase 2: Consulta de productos — objetivo: Permitir la consulta de productos por nombre o categoría — entregable (NO resolver): API REST que permite consultar productos por nombre o categoría.
- Fase 3: Pruebas unitarias — objetivo: Cubrir las operaciones CRUD con pruebas unitarias en Jest — entregable (NO resolver): Pruebas unitarias en Jest que cubren las operaciones CRUD de productos.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: src/main.ts ===
import express, { Application } from 'express';
import dotenv from 'dotenv';
import { ProductController } from './interfaces/controllers/ProductController';
import { ProductService } from './application/services/ProductService';
import { ProductRepository } from './domain/repositories/ProductRepository';
import { DynamoDBProductRepository } from './infrastructure/repositories/DynamoDBProductRepository';
import { getDynamoDBClient, getDocClient, getTableName } from './infrastructure/config/dynamodb';
import { errorHandler } from './interfaces/middlewares/errorHandler';
import { validateCreateProduct, validateUpdateProduct, validateIdParam, validateQueryParams } from './interfaces/middlewares/validation';

dotenv.config();

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});

export default app;

// === ARCHIVO: package.json ===
{
  "name": "product-crud-api",
  "version": "1.0.0",
  "description": "API CRUD para productos con Express y DynamoDB",
  "main": "src/main.ts",
  "scripts": {
    "start": "ts-node src/main.ts",
    "build": "tsc",
    "test": "jest",
    "lint": "eslint . --ext .ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@aws-sdk/client-dynamodb": "^3.651.1",
    "@aws-sdk/lib-dynamodb": "^3.651.1",
    "class-transformer": "^0.5.1",
    "class-validator": "0.14.1",
    "dotenv": "16.4.5",
    "express": "4.21.0",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "@types/express": "4.17.21",
    "@types/jest": "29.5.12",
    "@types/node": "22.5.4",
    "@types/uuid": "^9.0.8",
    "@typescript-eslint/eslint-plugin": "^6.21.0",
    "@typescript-eslint/parser": "^6.21.0",
    "eslint": "^8.56.0",
    "jest": "29.7.0",
    "supertest": "7.0.0",
    "ts-jest": "29.2.5",
    "ts-node": "10.9.2",
    "typescript": "^5.7.3"
  }
}


// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "baseUrl": ".",
    "paths": {
      "*": ["node_modules/*"]
    }
  },
  "include": ["src/**/*", "test/**/*"],
  "exclude": ["node_modules"]
}

// === ARCHIVO: src/domain/entities/Product.ts ===
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

// === ARCHIVO: src/domain/repositories/ProductRepository.ts ===
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

// === ARCHIVO: src/infrastructure/repositories/DynamoDBProductRepository.ts ===
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

// === ARCHIVO: src/index.ts ===
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

// === ARCHIVO: src/interfaces/controllers/ProductController.ts ===
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

// === ARCHIVO: src/interfaces/middlewares/errorHandler.ts ===
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string = 'Recurso no encontrado') {
        super(message, 404);
    }
}

export class ValidationError extends AppError {
    constructor(message: string = 'Error de validación') {
        super(message, 400);
    }
}

export class ConflictError extends AppError {
    constructor(message: string = 'Conflicto de datos') {
        super(message, 409);
    }
}

export const errorHandler: ErrorRequestHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            error: err.message,
            statusCode: err.statusCode
        });
        return;
    }

    if (err.name === 'ValidationError') {
        res.status(400).json({
            error: 'Error de validación de datos',
            details: err.message,
            statusCode: 400
        });
        return;
    }

    if (err.name === 'MongoServerError' || err.name === 'DynamoDBError') {
        res.status(500).json({
            error: 'Error en la base de datos',
            statusCode: 500
        });
        return;
    }

    console.error('Error no manejado:', err);
    res.status(500).json({
        error: 'Error interno del servidor',
        statusCode: 500
    });
};

export const notFoundHandler = (req: Request, res: Response): void => {
    res.status(404).json({
        error: `Ruta ${req.method} ${req.path} no encontrada`,
        statusCode: 404
    });
};

// === ARCHIVO: src/interfaces/middlewares/validation.ts ===
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

// === ARCHIVO: src/application/services/ProductService.ts ===
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

// === ARCHIVO: src/infrastructure/config/dynamodb.ts ===
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import * as dotenv from 'dotenv';

dotenv.config();

const getConfig = () => {
    const region = process.env.AWS_REGION || 'us-east-1';
    const endpoint = process.env.DYNAMODB_ENDPOINT;
    const credentials = {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'local',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'local',
    };

    const clientConfig: any = {
        region,
        credentials,
    };

    if (endpoint) {
        clientConfig.endpoint = endpoint;
    }

    return clientConfig;
};

let dynamoDBClient: DynamoDBClient | null = null;
let docClient: DynamoDBDocumentClient | null = null;

export const getDynamoDBClient = (): DynamoDBClient => {
    if (!dynamoDBClient) {
        dynamoDBClient = new DynamoDBClient(getConfig());
    }
    return dynamoDBClient;
};

export const getDocumentClient = (): DynamoDBDocumentClient => {
    if (!docClient) {
        docClient = DynamoDBDocumentClient.from(getDynamoDBClient(), {
            marshallOptions: {
                removeUndefinedValues: true,
            },
        });
    }
    return docClient;
};

export const getTableName = (): string => {
    return process.env.DYNAMODB_TABLE_NAME || 'products';
};

// === ARCHIVO: test/product.test.ts ===
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

// === ARCHIVO: test/mocks/dynamodbClient.ts ===
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

// === ARCHIVO: src/domain/dtos/product.dto.ts ===
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

// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "app-items" "id"

```
