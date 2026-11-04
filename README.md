# WebApps Naufal Rakha

Koleksi **100+ online tools gratis** untuk developer, pelajar, dan pekerja digital.
Semua tool berjalan 100% di browser — data tidak dikirim ke server.

- Live: https://webapps.naufalrakha.my.id
- Portfolio: https://www.naufalrakha.my.id
- GitHub: https://github.com/sternnaufal/webapps

## Stack

- Astro 5
- Tailwind CSS + daisyUI
- TypeScript/JavaScript client-side
- Deploy: Vercel

## Struktur

```text
src/pages/
  index.astro              # Homepage + pencarian + kategori
  tools/<slug>.astro       # Satu file per tool
  tools/category/<slug>.astro
src/layouts/ToolLayout.astro
src/components/ToolShell.astro
src/data/tools.json        # Daftar tool & kategori (sumber navigasi)
public/_redirects          # Redirect .html lama → /tools/<slug>/
```

## Menambah tool baru

1. Tambahkan entri di `src/data/tools.json` pada kategori yang sesuai.
2. Buat `src/pages/tools/<slug>.astro`.
3. Gunakan `ToolLayout` + `ToolShell` agar metadata SEO, FAQ, schema, dan related tools otomatis.
4. Jalankan `npm run build`.
5. Commit dan push — Vercel auto-deploy.

## Script

```bash
npm install
npm run dev
npm run build
npm run preview
```

---

Dibuat oleh [Naufal Rakha Putra](https://www.naufalrakha.my.id).
