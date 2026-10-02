
export const tagihan = {
  id: "1",
  nama: "SPP Bulan Mei",
  nominal: 80000,
  tahunAjaran: "2025/2026",
  status: "Aktif",
};

export const daftarKelas = [
  {
    id: "IX-A",
    nama: "Kelas IX-A",
    lunas: 38,
    belum: 4,
    total: 42,
  },
  {
    id: "VIII-C",
    nama: "Kelas VIII-C",
    lunas: 30,
    belum: 5,
    total: 35,
  },
];

export const pembayaran = [
  {
    id: "1",
    nama: "Muhammad Aditia Pratama",
    kelas: "IX-A",
    status: "Lunas",
    tagihan: 0,
  },
  {
    id: "2",
    nama: "Farhan Alfarizi Nugraha",
    kelas: "IX-A",
    status: "Belum Lunas",
    tagihan: 80000,
  },
  {
    id: "3",
    nama: "Ahmad Fauzi",
    kelas: "VIII-C",
    status: "Lunas",
    tagihan: 0,
  },
];

export const riwayat = [
  {
    id: "1",
    nama: "Muhammad Aditia Pratama",
    kelas: "IX-A",
    jenis: "SPP Mei 2026",
    nominal: 80000,
    tanggal: "20 Mei 2026",
  },
  {
    id: "2",
    nama: "Muhammad Aditia Pratama",
    kelas: "VIII-C",
    jenis: "SPP Mei 2026",
    nominal: 80000,
    tanggal: "19 Mei 2026",
  },
];

export const rupiah = (value: number) =>
  "Rp. " + value.toLocaleString("en-US");
