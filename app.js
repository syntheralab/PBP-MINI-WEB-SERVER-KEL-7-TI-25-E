const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const waktuMulai = new Date();

const anggota = [
  { nama: "Mega Sya'bani Agustina", nim: "20250040098" },
  { nama: "Siti Maysa", nim: "20250040108" },
  { nama: "Pasha Fauzan", nim: "20250040114" },
  { nama: "Muhammad Ibnu Zarir", nim: "20250040122" }
];

function halaman(namaFile) {
  return path.join(__dirname, 'pages', namaFile);
}

app.get(['/', '/beranda'], (req, res) => {
  res.sendFile(halaman('beranda.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(halaman('admin.html'));
});

app.get('/info', (req, res) => {
  const tanggal = waktuMulai.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jakarta'
  });
  const jam = waktuMulai.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Jakarta'
  });
  const isi = fs.readFileSync(halaman('info.html'), 'utf8')
    .replace('{{TANGGAL}}', tanggal)
    .replace('{{JAM}}', jam);
  res.send(isi);
});

app.get('/anggota', (req, res) => {
  res.sendFile(halaman('anggota.html'));
});

app.get('/404', (req, res) => {
  res.status(404).sendFile(halaman('404.html'));
});

app.get('/anggota.json', (req, res) => {
  res.json({
    kelompok: 'Kelompok 7',
    matkul: 'PBP',
    anggota: anggota
  });
});

app.use((req, res) => {
  res.status(404).sendFile(halaman('404.html'));
});

app.listen(8000, () => console.log('Server Kelompok 7 berjalan di http://localhost:8000'));