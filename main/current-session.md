# Current Session Recap

**Tarikh:** 2026-09-04
**Topik:** Auto-diary EOD — scheduled task (tiada sesi interaktif aktif)

**Sesi Terakhir Aktif:** 2026-08-04
**Topik Sesi Terakhir:** EA New v3 — login redesign + fix bug Seksyen + MinIO integration

**Keputusan (dari sesi lepas):**
- Login page ditukar split-screen korporat — confirmed Abam
- Bug dropdown SEKSYEN "Ralat": punca corrupted `/m<?php` dalam `ajax/get_seksyen.php` — fixed
- MinIO: custom `MinioClient` (SigV4 manual) berbanding vendor library luar
- Object key prefix `ea_newv3/`, format: `ea_newv3/{no_aduan}/foto{n}.ext`
- Fallback wajib: MinIO down → simpan local `uploads/wr/` macam asal
- Test CLI terhadap MinIO dev LULUS penuh

**Follow-up Terbuka:**
- Test guna borang sebenar dalam browser — TERGANTUNG (Chrome extension belum aktif)
- Sahkan reachability rasmi dengan IT dept
- Prod `.env` berasingan belum disediakan
- Retention/cleanup policy foto orphan — fasa 2

**Fail Berkaitan:**
- `projects/active/ea-newv3-minio-integration.md` Seksyen 9-12 — detail penuh
