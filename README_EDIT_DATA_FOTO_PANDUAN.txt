UPDATE: Edit Data + Edit Foto + Panduan Penggunaan

Isi paket:
- index.html
- apps_script_edit_data_foto_panduan.gs
- api/sapras.js (opsional, body limit dinaikkan ke 10mb)
- package.json

Fitur baru:
1. Tombol Edit di halaman Data Masuk.
2. Edit data utama untuk data kerusakan.
3. Edit data utama untuk data kondisi baik.
4. Ganti/upload ulang foto awal kerusakan per slot Foto 1, Foto 2, Foto 3.
5. Hapus link foto awal yang salah upload.
6. Ganti/upload ulang foto setelah penanganan per slot Foto 1, Foto 2, Foto 3.
7. Hapus link foto setelah penanganan.
8. Menu Panduan Penggunaan di sidebar.

Cara update paling aman:
1. GitHub: ganti index.html lama dengan index.html dari paket ini.
2. Apps Script: ganti kode lama dengan isi apps_script_edit_data_foto_panduan.gs.
3. Isi ulang SPREADSHEET_ID dan FOLDER_ID di bagian atas Apps Script.
4. Deploy ulang Apps Script:
   Deploy -> Manage deployments -> Edit/Pensil -> New version -> Deploy.
5. Tunggu Vercel redeploy otomatis.
6. Tes:
   - Login.
   - Data Masuk -> Edit data kerusakan.
   - Ganti/hapus salah satu foto awal.
   - Ganti/hapus salah satu foto setelah penanganan.
   - Edit data kondisi baik.
   - Buka menu Panduan.

Catatan:
- File foto lama di Google Drive tidak dihapus otomatis. Sistem hanya memperbarui link di Spreadsheet.
- Jika saat ganti banyak foto sekaligus muncul error ukuran payload, upload juga api/sapras.js dari paket ini ke GitHub agar batas body request naik menjadi 10mb.
