# Current Session Recap

**Tarikh:** 2026-08-31
**Topik:** Auto-diary EOD — tiada sesi kerja baru. Last active context: EA New v3 MinIO integration (2026-08-04)

**Keputusan:**
- MinIO: custom `MinioClient` (SigV4 manual) berbanding vendor library luar
- Object key prefix `ea_newv3/`, format: `ea_newv3/{no_aduan}/foto{n}.ext`
- Fallback wajib: MinIO down → simpan local `uploads/wr/`
- CA bundle fix dalam kod (`applyCaBundle()`), bukan ubah `php.ini`
- Login page split-screen korporat — confirmed Abam
- Bug dropdown SEKSYEN "Ralat" fixed (corrupted `/m<?php` tag)

**Fail terakhir diubah (ea_newv3):**
- `index.php` — redesign split-screen login
- `ajax/get_seksyen.php` — fix corrupted opening tag
- `includes/S3.php`, `includes/minio.php` — MinioClient + wrapper
- `.env`, `.env.example` — MINIO_* config dev
- `pages/simpan.php` — simpanFotoDB() cuba MinIO dulu, fallback local
- `ajax/foto.php` — diskriminator lama/baru + presigned redirect

**Follow-up terbuka:**
- Test guna borang sebenar dalam browser — TERGANTUNG (Chrome extension belum aktif)
- Sahkan reachability MinIO rasmi dengan IT dept
- Prod `.env` berasingan belum disediakan
- Retention/cleanup policy foto orphan — belum diputuskan (fasa 2)
- Rujuk `projects/active/ea-newv3-minio-integration.md` Seksyen 9-12 untuk detail penuh
