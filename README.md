# SushiDex

SushiDex es un diccionario visual de sushi pensado para quien consulta una carta online y necesita entender rapidamente que significa cada nombre. En lugar de buscar "Dragon Roll", "Sake Nigiri" o "Gunkan" uno por uno, la aplicacion permite localizar platos por nombre, alias, termino japones o ingredientes.

## Problema que resuelve

- Reduce la friccion al pedir sushi en apps de delivery o webs de restaurantes.
- Explica piezas y rolls frecuentes de forma visual y directa.
- Facilita descubrir equivalencias como `sake nigiri` -> `salmon nigiri` o `maguro` -> `atun`.

## Stack

- Next.js 16 con App Router y exportacion estatica
- TypeScript
- Tailwind CSS 4
- shadcn/ui como base de componentes
- Catalogo TypeScript local
- Imagenes WebP optimizadas

La aplicacion no necesita servidor, API ni base de datos en produccion.

## Arquitectura

Se mantiene una arquitectura limpia ligera, centrada en el agregado `Sushi`:

- `src/domain`: entidad `Sushi`, tipos y reglas del dominio.
- `src/application`: acceso al catalogo y logica de busqueda y ranking.
- `src/infrastructure/seed`: fuente unica de datos del catalogo.
- `src/infrastructure/localization`: adaptacion inglesa del catalogo compartido.
- `src/i18n`: idiomas, diccionarios y metadata localizada.
- `src/presentation`: componentes de interfaz, tarjetas y buscadores.
- `src/app`: rutas del App Router, metadata, sitemap y robots.

`next build` ejecuta los Server Components durante la compilacion y genera un archivo HTML por ruta e idioma en `out`. La busqueda principal funciona en el navegador y la cabecera carga el `search-index.json` estatico del idioma activo, generado desde `sushi-seed-data.ts` durante el build. No hay API ni procesamiento en servidor.

## MVP incluido

- Home mobile-first centrada en la busqueda.
- Autocomplete inmediato en cliente.
- Ingles por defecto y version espanola mediante rutas `/en` y `/es`.
- Selector de idioma que conserva la ficha o categoria actual.
- Fichas SEO para las 150 entradas en `/[locale]/sushi/[slug]`.
- Paginas estaticas por tipo en `/[locale]/types/[typeSlug]`.
- Metadata, `hreflang`, sitemap y robots generados durante el build.
- Busqueda tolerante a orden de palabras, alias, terminos japoneses e ingredientes.
- Fotografias WebP de 1200x900 optimizadas para publicacion.

## Datos

La unica fuente de datos vive en:

```text
src/infrastructure/seed/sushi-seed-data.ts
```

El catalogo contiene 150 entradas divididas en Nigiri, Maki, Hosomaki, Futomaki, Uramaki, Temaki, Gunkan, Sashimi, Inari, Chirashi y Rolls occidentales. Cuando una composicion no es universal se indica:

```text
Puede variar dependiendo del restaurante.
```

Para modificar el catalogo, edita ese archivo y vuelve a ejecutar `npm run build`. No hay migraciones ni seed de base de datos.

## Ejecucion local

1. Instala las dependencias:

```bash
npm install
```

2. Crea `.env` a partir de `.env.example` si quieres definir la URL canonica:

```bash
copy .env.example .env
```

3. Arranca el entorno de desarrollo:

```bash
npm run dev
```

La aplicacion estara disponible en `http://localhost:3000` y redirigira a la version inglesa en `/en`. La version espanola vive en `/es`.

## Build estatico

Genera la web completa con:

```bash
npm run build
```

El resultado se guarda en `out` y puede publicarse en cualquier hosting de archivos estaticos. Para revisarlo localmente:

```bash
npx serve out
```

## Variables de entorno

Solo existe una variable opcional:

```env
NEXT_PUBLIC_SITE_URL="https://sushidex.app"
```

Se utiliza al compilar la metadata canonica, `sitemap.xml` y `robots.txt`. En produccion debe contener la URL publica definitiva y estar disponible durante `npm run build`.

## Despliegue en Cloudflare

Puedes conectar el repositorio desde Cloudflare y usar:

- Comando de build: `npm run build`
- Directorio de salida: `out`
- Variable de build: `NEXT_PUBLIC_SITE_URL=https://sushidex.app`

Al ser una exportacion estatica no se necesitan secretos, Workers dinamicos ni conexiones externas.
El archivo `public/_redirects` configura el ingles como idioma predeterminado en Cloudflare y conserva compatibilidad con las antiguas rutas sin prefijo de idioma.

## Referencias

- [Next.js App Router](https://nextjs.org/docs/app)
- [Static exports de Next.js](https://nextjs.org/docs/app/guides/static-exports)
- [shadcn/ui para Next.js](https://ui.shadcn.com/docs/installation/next)
