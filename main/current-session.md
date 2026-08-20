# Current Session Recap

**Tarikh:** 2026-08-04
**Topik:** EA New v3 — login redesign + fix bug Seksyen + MinIO integration (test dev LULUS, test browser tergantung)

**Keputusan:**
- Login page ditukar split-screen korporat — confirmed Abam
- Bug dropdown SEKSYEN "Ralat": punca corrupted `/m<?php` dalam `ajax/get_seksyen.php` — fixed
- MinIO: custom `MinioClient` (SigV4 manual) berbanding vendor library luar
- Object key prefix `ea_newv3/`, format dipendekkan ikut arahan Abam:
  `ea_newv3/{no_aduan}/foto{n}.ext` (buang lapisan `wr/`)
- Fallback wajib: MinIO down → simpan local `uploads/wr/` macam asal
- Test CLI terhadap MinIO dev sebenar (upload + presigned GET + simulasi JPEG)
  LULUS penuh — turut sahkan reachability terus (redirect 302 kekal, tak perlu proxy)
- Isu `curl.cainfo` php.ini rosak dibetulkan dalam kod (`applyCaBundle()`), bukan
  ubah `php.ini` server dikongsi

**Fail terakhir diubah (ea_newv3):**
- `index.php` — redesign split-screen login
- `ajax/get_seksyen.php` — fix corrupted opening tag
- `includes/S3.php`, `includes/minio.php` (baru) — MinioClient + wrapper
- `.env`, `.env.example` — MINIO_* config dev
- `pages/simpan.php` — simpanFotoDB() cuba MinIO dulu, fallback local
- `ajax/foto.php` — diskriminator lama/baru + presigned redirect
- Semua lulus `php -l`; test CLI dev LULUS

**Follow-up terbuka:**
- Test guna borang sebenar dalam browser — TERGANTUNG, sambungan Claude in
  Chrome extension belum aktif (perlu Abam pasang/connect claude.ai/chrome dulu)
- Sahkan reachability rasmi dengan IT dept (test dev dah tunjuk boleh, belum rasmi)
- Prod `.env` berasingan belum disediakan — credential prod ada, belum guna
- Retention/cleanup policy foto orphan — belum diputuskan (fasa 2)
- Rujuk `projects/active/ea-newv3-minio-integration.md` Seksyen 9-12 untuk detail penuh
