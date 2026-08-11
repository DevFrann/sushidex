# 🍣 SushiDex

**🌍 Bilingüe** · **⚡ 100 % estática** · **📱 Mobile-first** · **🍱 150 fichas de sushi**

SushiDex es un diccionario visual de sushi para personas que consultan cartas de restaurantes o aplicaciones de delivery y quieren saber rápidamente qué contiene cada plato.

La experiencia se centra en una búsqueda inmediata por nombre, término japonés, alias o ingrediente. El título principal se adapta al idioma:

- Inglés: **Find your sushi**
- Español: **Encuentra tu sushi**

## 🎯 Problema que resuelve

- Evita buscar cada nombre de una carta japonesa por separado.
- Explica piezas y rolls frecuentes de forma visual y directa.
- Relaciona nombres equivalentes como `sake nigiri`, `salmon nigiri` y `nigiri de salmón`.
- Ayuda a distinguir pescado crudo, nivel de picante, intensidad de sabor y textura.

## ✨ Funcionalidad

- Catálogo estático de 150 términos habituales en restaurantes de España y Europa.
- Buscador con autocomplete y resultados instantáneos en el navegador.
- Búsqueda tolerante al orden de palabras y a diferencias sencillas de escritura.
- Búsqueda por nombre, nombre japonés, aliases e ingredientes.
- Fichas con fotografía, descripción, ingredientes, textura, origen y popularidad.
- Indicadores visuales para picante, pescado crudo e intensidad de sabor.
- Páginas por categoría: Nigiri, Maki, Hosomaki, Futomaki, Uramaki, Temaki, Gunkan, Sashimi, Inari, Chirashi y Western rolls.
- Interfaz mobile-first con imágenes WebP optimizadas.

## 🌍 Idiomas

La aplicación está disponible en inglés y español. El inglés es el idioma predeterminado.

- 🇬🇧 Inglés: `/en/`
- 🇪🇸 Español: `/es/`

El selector de idioma conserva la página actual. Por ejemplo, desde `/en/sushi/dragon-roll/` cambia a `/es/sushi/dragon-roll/` en lugar de volver a la portada.

Los textos de interfaz, categorías, indicadores, búsquedas, fichas y metadata SEO están localizados. Cada idioma dispone además de su propio índice de búsqueda estático:

```text
/en/search-index.json
/es/search-index.json
```

## 🧰 Stack

- Next.js 16 con App Router
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui como base de componentes
- Lucide React para iconografía
- Catálogo TypeScript local
- Exportación completamente estática

La aplicación no necesita servidor, API, PostgreSQL, Prisma ni base de datos en producción.

## 🏗️ Arquitectura

El proyecto mantiene una arquitectura limpia ligera, sin sobrearquitectura para el MVP:

- `src/domain`: entidad `Sushi`, tipos y reglas estructurales del dominio.
- `src/application`: acceso al catálogo, búsqueda, normalización y ranking.
- `src/infrastructure/seed`: fuente única de los 150 registros.
- `src/infrastructure/localization`: adaptación inglesa del catálogo compartido.
- `src/i18n`: idiomas permitidos, diccionarios y utilidades de metadata.
- `src/presentation`: buscadores, tarjetas, cabecera, selector e indicadores.
- `src/app`: rutas localizadas, layouts, metadata, sitemap y robots.

`next build` ejecuta los Server Components durante la compilación y genera todos los HTML, JSON e imágenes necesarios dentro de `out`. La búsqueda se ejecuta en el navegador y no realiza peticiones a servicios externos.

## 🗂️ Datos

La fuente principal del catálogo se encuentra en:

```text
src/infrastructure/seed/sushi-seed-data.ts
```

Los registros comparten identificadores, slugs, fotografías y datos objetivos en ambos idiomas. La versión inglesa traduce nombres que lo necesitan, ingredientes, descripciones, texturas y origen desde:

```text
src/infrastructure/localization/english-sushi-catalog.ts
```

Los aliases españoles e ingleses se mantienen para mejorar la búsqueda cruzada. Cuando una receta no tiene una composición universal, la ficha incluye:

```text
Puede variar dependiendo del restaurante.
Ingredients may vary depending on the restaurant.
```

Para modificar o añadir una pieza, edita el catálogo y vuelve a ejecutar `npm run build`. No existen migraciones ni procesos de seed de base de datos.

## 🔗 Rutas

Las páginas públicas siguen esta estructura:

```text
/{locale}/
/{locale}/sushi/{slug}/
/{locale}/types/{typeSlug}/
/{locale}/search-index.json
```

Ejemplos:

```text
/en/sushi/dragon-roll/
/es/sushi/dragon-roll/
/en/types/nigiri/
/es/types/nigiri/
```

Los slugs son iguales en ambos idiomas para que el selector pueda conservar la página actual.

## 🔎 SEO

- Metadata dinámica para cada ficha y categoría.
- URL canónica específica por idioma.
- Etiquetas `hreflang` para inglés, español y `x-default`.
- Open Graph localizado.
- `sitemap.xml` con todas las rutas de ambos idiomas.
- `robots.txt` generado durante el build.
- Favicon SVG basado en el símbolo de la marca.

## 🚀 Ejecución local

1. Instala las dependencias:

```bash
npm install
```

2. Crea `.env` a partir de `.env.example` si quieres configurar la URL canónica:

```powershell
Copy-Item .env.example .env
```

3. Arranca el entorno de desarrollo:

```bash
npm run dev
```

> 💡 Abre `http://localhost:3000`. La raíz dirige automáticamente a `/en/`; la versión española está disponible en `/es/`.

## ✅ Validación

Comprueba el código y genera la exportación antes de publicar:

```bash
npm run lint
npm run build
```

El build debe mostrar todas las rutas como estáticas (`Static` o `SSG`) y guardar el resultado en `out`.

Para revisar esa exportación localmente:

```bash
npx serve out
```

## ⚙️ Variables de entorno

Solo existe una variable opcional:

```env
NEXT_PUBLIC_SITE_URL="https://sushidex.app"
```

Se utiliza al compilar URLs canónicas, `hreflang`, Open Graph, `sitemap.xml` y `robots.txt`. En producción debe contener el dominio público definitivo, sin una barra final.

## ☁️ Despliegue en Cloudflare Pages

Conecta el repositorio a Cloudflare Pages y utiliza esta configuración:

- Framework preset: ninguno (`None`), ya que Next.js genera HTML estático.
- Comando de build: `npm run build`.
- Directorio de salida: `out`.
- Variable de build: `NEXT_PUBLIC_SITE_URL=https://sushidex.app`.

> ✅ No se necesitan Workers dinámicos, secretos ni conexiones externas.

El archivo `public/_redirects` se copia al build y define:

- `/` redirige a `/en/` como idioma predeterminado.
- Las rutas antiguas `/sushi/*` redirigen a su ficha inglesa.
- Las rutas antiguas `/tipos/*` redirigen a su categoría española bajo `/es/types/*`.

La configuración `output: "export"`, `trailingSlash: true` e `images.unoptimized: true` de `next.config.ts` permite servir todo el proyecto como archivos estáticos.

## 📚 Referencias

- [Next.js App Router](https://nextjs.org/docs/app)
- [Static exports de Next.js](https://nextjs.org/docs/app/guides/static-exports)
- [shadcn/ui para Next.js](https://ui.shadcn.com/docs/installation/next)
