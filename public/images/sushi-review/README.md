# SushiDex Dish Image Review

This folder contains generated dish imagery contact sheets kept for review and traceability.

Approved crops have been copied into `public/images/sushi/` and are referenced by the seed through `imageUrl`.

## Review Pack V1

File: `dish-style-contact-sheet-v1.png`
Copy: `batch-01-approved-style.png`

Included dishes, left to right and top to bottom:

1. Sake Nigiri
2. Maguro Nigiri
3. Ebi Nigiri
4. California Uramaki
5. Spicy Tuna Hosomaki
6. Dragon Roll
7. Ikura Gunkan
8. Sake Sashimi
9. Inari Sushi
10. Chirashi Bowl
11. Ebi Tempura Temaki
12. Rainbow Roll

## Prompt Notes

- Photorealistic food photography.
- Warm neutral tabletop.
- Natural daylight.
- No text, labels, watermark, people, logos or packaging.
- Western rolls are representative only and not treated as universal recipes.
- Intended crop/aspect for future per-dish assets: square or 4:3.

## Review Status

Status: approved and activated.

Activated dish assets:

- `public/images/sushi/`: 150 cropped dish PNGs.
- `batch-01-approved-style.png` through `batch-13-rolls.png`: source contact sheets.

## Review Pack V2

Folder: `v2/`

Regenerated sheets use a fixed 3 columns by 4 rows grid. Each cell is cropped directly into a fixed `1200x900` dish asset, without artificial blur or padding.

Activated dish assets:

- `public/images/sushi/v2/`: 150 cropped dish PNGs.
- Seed default `imageUrl`: `/images/sushi/v2/{slug}.png`.
