# Webartefak — Website Portfolio

Website portfolio pribadi yang dibangun menggunakan **HTML**, **Tailwind CSS v4**, dan **GSAP** untuk animasi, dengan **Vite** sebagai build tool.

## Tech Stack

| Technology       | Version | Fungsi                      |
| ---------------- | ------- | --------------------------- |
| **Vite**         | v7.3.1  | Dev server & bundler        |
| **Tailwind CSS** | v4.2.0  | Utility-first CSS framework |
| **GSAP**         | v3.14.2 | Library animasi JavaScript  |

## Struktur Folder

```
webartefak/
├── index.html          ← Entry point HTML
├── vite.config.js      ← Konfigurasi Vite + Tailwind plugin
├── package.json        ← Dependencies & scripts
├── Agent.md            ← Dokumentasi project (file ini)
├── .gitignore          ← Git ignore rules
└── src/
    ├── style.css       ← Tailwind CSS entry (@import "tailwindcss")
    └── main.js         ← Entry point JavaScript (import CSS + GSAP)
```

## Cara Menjalankan

```bash
# Install dependencies
npm install

# Jalankan dev server (HMR / hot reload)
npm run dev

# Build untuk production
npm run build

# Preview hasil build
npm run preview
```

## Alir Kode

```
index.html
  └── src/main.js  (type="module")
        ├── import './style.css'    → Tailwind CSS v4
        └── import gsap from 'gsap' → GSAP animasi
```

## Catatan Penting

- **Tailwind CSS v4** tidak memerlukan `tailwind.config.js` atau `postcss.config.js`. Semua konfigurasi dilakukan via CSS menggunakan directive `@theme`.
- **GSAP** diimport via npm, bukan CDN.
- Dev server berjalan di `http://localhost:5173` secara default.
