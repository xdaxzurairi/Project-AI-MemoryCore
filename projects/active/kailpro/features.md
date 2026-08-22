# KailPro — Feature Matrix

## Free Tier

| # | Feature | Detail |
|---|---|---|
| F1 | **Trip Logger** | Record GPS path semasa berlayar/mancing — start/stop manual |
| F2 | **Spot Simpan (Private)** | Save lubuk/port/parking sendiri, max 10 lokasi |
| F3 | **Trip History** | Lihat semula path trip lepas, max 30 hari |
| F4 | **Basic Map** | OpenStreetMap overlay, marker lokasi sendiri |
| F5 | **Pasang Surut** | Tide chart hari ini (read-only, data JUPEM) |
| F6 | **Kawasan Larangan View** | Lihat polygon kawasan larangan (LKIM + Taman Laut) — view only |

---

## Paid Tier (Pro)

| # | Feature | Detail |
|---|---|---|
| P1 | **Community Lubuk Map** | Akses + contribute ke shared fishing spot database |
| P2 | **Koordinat Tepat Lubuk** | Free users nampak kawasan sahaja, Pro nampak GPS tepat |
| P3 | **Unlimited Spots + History** | No cap pada lokasi simpan dan history |
| P4 | **Export GPX/KML** | Export trip path untuk Google Earth / Garmin |
| P5 | **Cuaca Laut Real-time** | Wind, wave height, current direction — OpenWeatherMap Marine |
| P6 | **Kawasan Larangan Alert** | Geofence alert bila approach kawasan larangan |
| P7 | **AIS Vessel Proximity** | Alert bila kapal besar berdekatan (API AISstream) |
| P8 | **Pasang Surut Forecast 7 Hari** | Free = hari ini sahaja |
| P9 | **Offline Map Cache** | Pre-download tile map kawasan untuk guna offline |
| P10 | **Multi-Environment Profile** | Switch antara profil Laut / Sungai / Estuari dengan setting berbeza |

---

## Environment Layers

| Environment | Specific Features |
|---|---|
| 🌊 **Laut Dalam** | AIS vessel tracking, depth overlay, current direction |
| 🏝️ **Persisiran/Pantai** | Tide real-time, wave alert, beach access points |
| 🌿 **Sungai/Estuari** | Water level, arus halaju, laluan bot sungai |

---

## Data Sources

| Data | Source | Cost |
|---|---|---|
| Pasang surut Malaysia | JUPEM / MyTide | Free (gov) |
| Cuaca laut | OpenWeatherMap Marine | Free tier available |
| Kawasan larangan | LKIM + Jabatan Perikanan | Free (gov scrape/API) |
| Taman Laut polygon | PERHILITAN / LKIM | Free |
| AIS vessel | AISstream.io | Free tier 100 req/day |
| Satellite coverage | Starlink coverage map | Static reference sahaja |
| Map tiles | OpenStreetMap | Free |
