# SushiDex

SushiDex es un diccionario visual de sushi pensado para gente que esta consultando una carta online y necesita entender rapido que significa cada nombre. En lugar de buscar "Dragon Roll", "Sake Nigiri" o "Gunkan" uno por uno en Google, la aplicacion centraliza el catalogo y permite localizar resultados por nombre, alias, termino japones o ingredientes.

## Problema que resuelve

- Reduce la friccion al pedir sushi en apps de delivery o webs de restaurantes.
- Explica piezas y rolls frecuentes de forma visual y directa.
- Facilita descubrir equivalencias como `sake nigiri` -> `salmon nigiri` o `maguro` -> `atun`.

## Stack

- Next.js 16 con App Router
- TypeScript
- Tailwind CSS 4
- shadcn/ui como base de componentes
- PostgreSQL
- Prisma ORM 7

## Arquitectura

Se ha mantenido una arquitectura limpia ligera, centrada en un unico agregado `Sushi`:

- `src/domain`
  Contiene la entidad `Sushi`, enums, labels y el contrato `SushiRepository`.
- `src/application`
  Casos de uso y logica de busqueda/ranking.
- `src/infrastructure`
  Prisma, repositorios, seed compartido y fallback estatico.
- `src/presentation`
  Componentes de UI, cards, buscador y utilidades visuales.
- `src/app`
  Rutas del App Router, metadata, sitemap y API de autocomplete.

## MVP incluido

- Home mobile-first centrada en el buscador "¿Que sushi quieres buscar?"
- Autocomplete inmediato via `/api/search`
- Fichas SEO por sushi:
  - `/sushi/dragon-roll`
  - `/sushi/california-roll`
  - `/sushi/sake-nigiri`
- Paginas por tipo:
  - `/tipos/nigiri`
  - `/tipos/maki`
  - `/tipos/uramaki`
  - `/tipos/temaki`
- Metadata dinamica y sitemap
- Seed inicial con 150 entradas comunes en cartas de restaurantes japoneses en Espana y Europa
- Busqueda tolerante a:
  - orden distinto de palabras
  - alias ingles/espanol
  - terminos japoneses frecuentes
  - consultas por ingredientes

## Datos

La fuente inicial vive en `src/infrastructure/seed/sushi-seed-data.ts`.

- El mismo catalogo alimenta el fallback estatico del MVP y el seed de Prisma.
- El catalogo se divide en Nigiri, Maki, Hosomaki, Futomaki, Uramaki, Temaki, Gunkan, Sashimi, Inari, Chirashi y Rolls occidentales.
- Cuando una composicion no es universal, se marca explicitamente con:
  `Puede variar dependiendo del restaurante.`

## Ejecucion local

1. Instala dependencias:

```bash
npm install
```

2. Copia las variables de entorno:

```bash
copy .env.example .env
```

3. Ajusta `DATABASE_URL` a tu PostgreSQL local o remoto.

4. Genera el cliente Prisma:

```bash
npm run db:generate
```

5. Aplica la migracion en tu base:

```bash
npm run db:migrate -- --name init
```

6. Carga el seed:

```bash
npm run db:seed
```

7. Arranca la aplicacion:

```bash
npm run dev
```

## Variables de entorno

Archivo de referencia: `.env.example`

- `DATABASE_URL`
  Conexion PostgreSQL usada por Prisma.
- `NEXT_PUBLIC_SITE_URL`
  URL base para metadata canonica, sitemap y robots.

## Prisma y PostgreSQL

### Crear la base

Puedes usar cualquier PostgreSQL compatible. Ejemplo local:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/sushidex?schema=public"
```

### Migrations

- Generar cliente:

```bash
npm run db:generate
```

- Crear o actualizar migracion en desarrollo:

```bash
npm run db:migrate -- --name init
```

- Sin crear migracion, sincronizar esquema:

```bash
npm run db:push
```

### Seed

```bash
npm run db:seed
```

## Notas de desarrollo

- Si `DATABASE_URL` no esta configurada o la base no responde, la aplicacion usa el catalogo estatico del seed para que el frontend siga siendo navegable durante el desarrollo del MVP.
- Para produccion, la ruta recomendada es ejecutar migraciones y seed sobre PostgreSQL y dejar Prisma como fuente primaria.

## Referencias usadas

- [Next.js App Router](https://nextjs.org/docs/app)
- [shadcn/ui para Next.js](https://ui.shadcn.com/docs/installation/next)
- [Prisma ORM con driver adapters](https://docs.prisma.io/docs/orm/prisma-client/setup-and-configuration/introduction)
- [PostgreSQL connector en Prisma](https://docs.prisma.io/docs/orm/core-concepts/supported-databases/postgresql)
