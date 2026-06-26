PANDUAN SINGKAT
===============

Isi folder ini:
- index.html              -> tampilan website
- api/sapras.js           -> penghubung Vercel ke Google Apps Script
- apps_script_final.gs    -> kode Google Apps Script final
- package.json            -> metadata project Vercel

LANGKAH PAKAI:

1. Google Apps Script
   - Buka Spreadsheet Sapras.
   - Ekstensi -> Apps Script.
   - Ganti kode lama dengan isi file apps_script_final.gs.
   - Ubah SPREADSHEET_ID dan FOLDER_ID di bagian atas kode.
   - Deploy -> New deployment -> Web app.
   - Execute as: Me/Saya.
   - Who has access: Anyone.
   - Copy URL Web App yang berakhiran /exec.

2. Vercel
   - Upload/deploy folder ini ke Vercel.
   - Tambahkan Environment Variable di Vercel:
     APPS_SCRIPT_URL = URL Web App Apps Script yang berakhiran /exec
   - Redeploy.

3. Tes
   - Buka website.
   - Cek dropdown lokasi/kategori/satuan muncul.
   - Input data tanpa foto dulu.
   - Cek DATA_KERUSAKAN di Spreadsheet.
   - Input data dengan 1 foto.
   - Cek Google Drive folder foto.

Catatan:
- Website memanggil /api/sapras.
- /api/sapras meneruskan request ke Apps Script.
- Apps Script menyimpan data ke DATA_KERUSAKAN dan foto ke Drive.
