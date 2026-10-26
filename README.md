# ( SEAVX ) — Portofolio Muhammad Adriansyah (`@seaavey`)

Rekonstruksi proyek website portofolio publik untuk **Muhammad Adriansyah (`@seaavey`)**, *Full Stack Web Developer & Building Designer* berbasis di **Bandung, Indonesia (UTC+7)**.

Situs ini dirancang dengan bahasa visual **Swiss Brutalist Editorial** (garis grid struktural `1px solid`, sistem kolom 12, tipografi hierarki tegas menggunakan `clamp()`, dwi-tema gelap/terang `#0a0a0a` / `#f4f4f0`, tanpa glassmorphism/gradien/glow).

---

## 1. Menjalankan Proyek

```bash
cd /root/seaavey-portfolio

# Jalankan server pengembangan
npm run dev

# Pemeriksaan tipe TypeScript
npm run typecheck

# Build produksi
npm run build

# Jalankan server produksi
npm run start
```

---

## 2. Daftar Berkas Utama

| Berkas | Deskripsi |
| :--- | :--- |
| `package.json` | Konfigurasi dependensi (`next`, `react`, `lenis`, `lucide-react`, `tailwindcss`, `typescript`). |
| `next.config.mjs` | Konfigurasi Next.js App Router. |
| `tsconfig.json` | Konfigurasi TypeScript ketat (`strict: true`). |
| `postcss.config.mjs` | Konfigurasi PostCSS untuk TailwindCSS v4. |
| `public/og.png` | Aset placeholder Open Graph & Twitter Card berukuran `1200×630` piksel. |
| `src/app/globals.css` | Token warna semantik (`--color-bg`, `--color-surface`, `--color-text`, `--color-border`, `--color-accent`), skala tipografi fluid `clamp()`, focus ring aksesibilitas, dan aturan `prefers-reduced-motion`. |
| `src/app/layout.tsx` | Root layout HTML (`lang="id"`), metadata SEO, Open Graph, Twitter Card, dan `theme-color: #0a0a0a`. |
| `src/app/page.tsx` | Halaman utama portofolio yang merender 10 bagian vertikal secara berurutan. |
| `src/app/robots.ts` | Generator `robots.txt` (`index, follow`). |
| `src/app/sitemap.ts` | Generator `sitemap.xml`. |
| `src/app/api/contact/route.ts` | Endpoint server-side (`POST /api/contact`) untuk validasi & pengiriman form kontak tanpa menyimpan secret di frontend. |
| `src/data/portfolio.ts` | Sumber data terstruktur (profil, 6 proyek `A-01`–`A-06`, 4 pilar `#process`, spesifikasi `#specs`, 20 modul `#stack`, timeline `#log`, dan badge GitHub). |
| `src/components/SchematicSvg.tsx` | Rekonstruksi diagram vektor SVG kustom (`FIG 00.A` dan `A-01` s/d `A-06`). |
| `src/components/PortfolioClient.tsx` | Komponen interaktif utama: Sticky Top Bar, Hero, `#work`, `#process`, `#specs`, `#stack`, `#log`, `#about`, `#contact`, dan `Footer` dengan Lenis (`lerp: 0.08`) serta velocity marquee. |

---

## 3. Daftar Bagian `INFERRED` & Penandaan Klaim

Sesuai aturan rekonstruksi, bagian yang diinferensi ditandai dengan komentar `INFERRED` di kode sumber:

1. **Palet Warna Semantik (`src/app/globals.css`)**:
   - Terverifikasi: `--color-bg: #0a0a0a` (dari `<meta name="theme-color" content="#0a0a0a">`).
   - **INFERRED**: `--color-surface` (`#121212` / `#eaeae4`), `--color-text` (`#f4f4f0` / `#0a0a0a`), `--color-muted` (`#a3a39e` / `#4a4a46`), `--color-border` (`#2c2c2a` / `#1f1f1d`), dan `--color-accent` (`#ff3e00` / `#c92a00`). Seluruh kombinasi warna dipilih untuk melampaui rasio kontras minimum WCAG AA.
2. **Tipografi (`src/app/globals.css`)**:
   - **INFERRED**: Tumpukan font grotesk netral (`Inter`, `Helvetica Neue`, `system-ui`) dan monospace teknis (`JetBrains Mono`, `ui-monospace`) beserta skala `clamp()`.
3. **Rincian Distribusi Bintang Per Repositori (`src/data/portfolio.ts`)**:
   - Statistik agregat profil GitHub (`8` repo publik, `79` follower, `32` bintang) ditandai **"Per tanggal pengambilan 26 Oktober 2026"**.
   - **INFERRED**: Distribusi jumlah bintang/fork individual pada kartu `A-01` s/d `A-06` yang berjumlah total 32 bintang.
4. **Rincian Sub-Spesifikasi Workstation & Modul Stack (`src/data/portfolio.ts`)**:
   - **INFERRED**: Detail kernel/terminal (`Linux Zen`, `Tmux`, `Tailscale`, `PostgreSQL`, `Redis`) serta milestone awal log `2024.06` & `2024.10`.
5. **Klaim Situs yang Belum Diverifikasi (`src/data/portfolio.ts`)**:
   - Klaim seperti `latency < 2ms`, `uptime 99.9%`, dan `startup < 45ms` ditandai secara eksplisit di antarmuka sebagai `[KLAIM SITUS — BELUM DIVERIFIKASI]`.

---

## 4. Daftar Aset Placeholder yang Perlu Diganti Pemilik

1. **Wordmark / Logo Resmi `( SEAVX )`**:
   - Saat ini menggunakan wordmark teks tipografis `( SEAVX )` pada Top Bar dan Footer agar tidak menyalin aset gambar pemilik tanpa izin. Ganti dengan berkas SVG/logo resmi dari pemilik (`@seaavey`).
2. **Gambar Open Graph (`public/og.png`)**:
   - Berkas `public/og.png` (`1200×630` px) yang disertakan adalah kartu placeholder bergaya Swiss brutalist. Ganti dengan kartu Open Graph resmi milik pemilik sebelum publikasi produksi.
3. **Diagram Skematik (`src/components/SchematicSvg.tsx`)**:
   - Diagram `FIG 00.A` dan `A-01` s/d `A-06` direkonstruksi ulang sebagai SVG vektor baru dengan geometri serupa. Pemilik dapat menggantinya dengan file CAD/SVG asli jika tersedia.
4. **Integrasi Pengiriman Email Produksi (`src/app/api/contact/route.ts`)**:
   - Endpoint server `/api/contact` saat ini melakukan validasi server-side dan mengembalikan ID transmisi dengan fallback `mailto:owner@seaavey.com`. Hubungkan ke penyedia SMTP/Resend/Postmark milik pemilik melalui variabel lingkungan server (`process.env`) saat deployment.
