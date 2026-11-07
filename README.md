# Implementación de CRUD de productos en DynamoDB con Express

El sistema debe permitir a los administradores de inventario realizar operaciones CRUD sobre productos almacenados en DynamoDB. Los productos tienen atributos como nombre, precio, stock y categoría. El sistema debe prohibir la creación de productos con nombres duplicados y precios negativos. Los administradores deben poder consultar productos por nombre o categoría. El sistema debe manejar correctamente los casos en los que no se encuentren productos.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | CRUD de productos con Express y DynamoDB |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Creación de productos

**Objetivo:** Permitir la creación de productos con validación de atributos

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Diseña la estructura de datos para los productos en DynamoDB.
- Implementa la creación de productos con validación de nombre y precio.
- Maneja los casos en los que el nombre del producto ya existe o el precio es negativo.

**Entregable:** API REST que permite crear productos con validación de atributos.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo estructurar la tabla de DynamoDB para facilitar las consultas futuras.
- Piensa en cómo manejar los errores de validación de manera amigable para el usuario.

</details>

### Fase 2: Consulta de productos

**Objetivo:** Permitir la consulta de productos por nombre o categoría

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementa la consulta de productos por nombre o categoría.
- Maneja los casos en los que no se encuentren productos.

**Entregable:** API REST que permite consultar productos por nombre o categoría.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo optimizar las consultas en DynamoDB.
- Piensa en cómo manejar los casos en los que no se encuentren productos de manera amigable para el usuario.

</details>

### Fase 3: Pruebas unitarias

**Objetivo:** Cubrir las operaciones CRUD con pruebas unitarias en Jest

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Escribe pruebas unitarias para las operaciones CRUD de productos.
- Asegúrate de que las pruebas cubran los casos felices y los casos borde.

**Entregable:** Pruebas unitarias en Jest que cubren las operaciones CRUD de productos.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo simular el comportamiento de DynamoDB en las pruebas.
- Piensa en cómo asegurar que las pruebas sean robustas y cubran todos los casos posibles.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son las operaciones CRUD y cómo se implementan en DynamoDB?
- **paraQueSirve**: ¿Para qué sirve validar los atributos de los productos al crearlos?
- **comoSeUsa**: ¿Cómo se consultan productos en DynamoDB por nombre o categoría?
- **erroresComunes**: ¿Cuáles son los errores comunes al implementar operaciones CRUD en DynamoDB y cómo se manejan?
- **queDecisionesImplica**: ¿Qué decisiones implica la estructuración de la tabla de DynamoDB para los productos?

## Criterios de Evaluacion

- Implementación correcta de la creación de productos con validación de atributos.
- Implementación correcta de la consulta de productos por nombre o categoría.
- Pruebas unitarias que cubren todos los casos posibles de las operaciones CRUD de productos.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

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

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
