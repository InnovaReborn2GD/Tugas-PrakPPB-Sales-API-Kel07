# Sales API Documentation

Dokumentasi endpoint untuk Sales API berbasis Express dan Supabase.

## Menjalankan API

```bash
npm install
npm start
```

Server berjalan pada port `3000` secara default. Base URL API:

```text
http://localhost:3000/api
```

Port dapat diubah menggunakan environment variable `PORT`.

## Format Umum

Semua request dengan body menggunakan JSON dan wajib mengirim header:

```http
Content-Type: application/json
```

Format error:

```json
{
  "error": "Pesan error"
}
```

Nilai `{id}` pada dokumentasi adalah ID data yang tersimpan di database.

## Ringkasan Endpoint

| Method | Endpoint | Keterangan |
| --- | --- | --- |
| `GET` | `/categories` | Mengambil semua kategori |
| `GET` | `/categories/{id}` | Mengambil kategori berdasarkan ID |
| `POST` | `/categories` | Menambahkan kategori |
| `PUT` | `/categories/{id}` | Mengubah kategori |
| `DELETE` | `/categories/{id}` | Menghapus kategori |
| `GET` | `/customers` | Mengambil customer dengan pagination dan pencarian opsional |
| `GET` | `/customers/{id}` | Mengambil customer berdasarkan ID |
| `POST` | `/customers` | Menambahkan customer |
| `PUT` | `/customers/{id}` | Mengubah customer |
| `DELETE` | `/customers/{id}` | Menghapus customer |
| `GET` | `/products` | Mengambil semua produk |
| `GET` | `/products/{id}` | Mengambil produk berdasarkan ID |
| `POST` | `/products` | Menambahkan produk |
| `PUT` | `/products/{id}` | Mengubah produk |
| `DELETE` | `/products/{id}` | Menghapus produk |
| `GET` | `/reports/total` | Mengambil total jumlah customer |

## Categories

## 1. Mengambil Semua Kategori

```http
GET /api/categories
```

Contoh respons `200 OK`:

```json
[
  {
    "id": 1,
    "name": "Elektronik"
  },
  {
    "id": 2,
    "name": "Aksesoris"
  }
]
```

## 2. Mengambil Kategori Berdasarkan ID

```http
GET /api/categories/{id}
```

Contoh:

```http
GET /api/categories/1
```

Contoh respons `200 OK`:

```json
{
  "id": 1,
  "name": "Elektronik"
}
```

Jika data tidak ditemukan atau terjadi error saat mengambil data, server mengembalikan `404 Not Found`.

## 3. Menambahkan Kategori

```http
POST /api/categories
```

Body JSON:

```json
{
  "name": "Elektronik"
}
```

Contoh respons `201 Created`:

```json
{
  "id": 1,
  "name": "Elektronik"
}
```

## 4. Mengubah Kategori

```http
PUT /api/categories/{id}
```

Contoh:

```http
PUT /api/categories/1
```

Body JSON:

```json
{
  "name": "Elektronik dan Gadget"
}
```

Contoh respons `200 OK`:

```json
{
  "id": 1,
  "name": "Elektronik dan Gadget"
}
```

## 5. Menghapus Kategori

```http
DELETE /api/categories/{id}
```

Contoh:

```http
DELETE /api/categories/1
```

Contoh respons `200 OK`:

```json
{
  "message": "Category deleted"
}
```

## Customers

## Struktur Data Customer

| Field | Tipe | Keterangan |
| --- | --- | --- |
| `id` | number/string | ID customer dari database |
| `name` | string | Nama customer |
| `email` | string | Email wajib mengandung karakter `@` |
| `phone` | string | Nomor telepon wajib diisi minimal 10 karakter |

## 6. Mengambil Customer dengan Pagination

```http
GET /api/customers?page=1&limit=10
```

Query parameter:

| Parameter | Wajib | Default | Keterangan |
| --- | --- | --- | --- |
| `page` | Tidak | `1` | Nomor halaman, bilangan bulat positif |
| `limit` | Tidak | `10` | Jumlah data per halaman, bilangan bulat positif |
| `name` | Tidak | - | Kata kunci pencarian berdasarkan nama customer |

Contoh respons `200 OK`:

```json
{
  "data": [
    {
      "id": 1,
      "name": "Budi Santoso",
      "email": "budi.santoso@example.com",
      "phone": "081234567890"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

## 7. Mencari Customer Berdasarkan Nama

Pencarian tidak membedakan huruf besar dan kecil dan dapat digabungkan dengan pagination.

```http
GET /api/customers?name=budi&page=1&limit=10
```

Contoh lain:

```http
GET /api/customers?name=ani
```

Jika `page` atau `limit` bukan bilangan bulat positif, responsnya adalah `400 Bad Request`:

```json
{
  "error": "Page harus berupa bilangan bulat positif"
}
```

atau:

```json
{
  "error": "Limit harus berupa bilangan bulat positif"
}
```

## 8. Mengambil Customer Berdasarkan ID

```http
GET /api/customers/{id}
```

Contoh:

```http
GET /api/customers/1
```

Contoh respons `200 OK`:

```json
{
  "id": 1,
  "name": "Budi Santoso",
  "email": "budi.santoso@example.com",
  "phone": "081234567890"
}
```

Jika data tidak ditemukan atau terjadi error saat mengambil data, server mengembalikan `404 Not Found`.

## 9. Menambahkan Customer

```http
POST /api/customers
```

Body JSON:

```json
{
  "name": "Budi Santoso",
  "email": "budi.santoso@example.com",
  "phone": "081234567890"
}
```

Contoh respons `201 Created`:

```json
{
  "id": 1,
  "name": "Budi Santoso",
  "email": "budi.santoso@example.com",
  "phone": "081234567890"
}
```

Validasi:

- `email` harus mengandung karakter `@`.
- `phone` wajib diisi dan memiliki minimal 10 karakter.

Contoh error email `400 Bad Request`:

```json
{
  "error": "Email wajib memiliki karakter @"
}
```

Contoh error nomor telepon `400 Bad Request`:

```json
{
  "error": "Nomor telepon wajib diisi minimal 10 karakter"
}
```

## 10. Mengubah Customer

```http
PUT /api/customers/{id}
```

Contoh:

```http
PUT /api/customers/1
```

Body JSON:

```json
{
  "name": "Budi Santoso Updated",
  "email": "budi.updated@example.com",
  "phone": "081234567891"
}
```

Contoh respons `200 OK`:

```json
{
  "id": 1,
  "name": "Budi Santoso Updated",
  "email": "budi.updated@example.com",
  "phone": "081234567891"
}
```

Validasi email dan nomor telepon sama seperti pada endpoint create customer. Update dapat mengirim sebagian field; field yang dikirim tetap harus memenuhi validasi.

## 11. Menghapus Customer

```http
DELETE /api/customers/{id}
```

Contoh:

```http
DELETE /api/customers/1
```

Contoh respons `200 OK`:

```json
{
  "message": "Customer deleted successfully"
}
```

## Products

## Struktur Data Product

| Field | Tipe | Keterangan |
| --- | --- | --- |
| `id` | number/string | ID produk dari database |
| `sku` | string | Kode unik produk |
| `name` | string | Nama produk |
| `description` | string | Deskripsi produk |
| `price` | number | Harga produk |
| `stock` | number | Jumlah stok |
| `category_id` | number/string | ID kategori produk |

## 12. Mengambil Semua Produk

```http
GET /api/products
```

Contoh respons `200 OK`:

```json
[
  {
    "id": 1,
    "sku": "SKU-001",
    "name": "Laptop",
    "description": "Laptop untuk kebutuhan kerja",
    "price": 8500000,
    "stock": 10,
    "category_id": 1
  }
]
```

## 13. Mengambil Produk Berdasarkan ID

```http
GET /api/products/{id}
```

Contoh:

```http
GET /api/products/1
```

Contoh respons `200 OK`:

```json
{
  "id": 1,
  "sku": "SKU-001",
  "name": "Laptop",
  "description": "Laptop untuk kebutuhan kerja",
  "price": 8500000,
  "stock": 10,
  "categories": {
    "id": 1,
    "name": "Elektronik"
  }
}
```

Jika data tidak ditemukan atau terjadi error saat mengambil data, server mengembalikan `404 Not Found`.

## 14. Menambahkan Produk

```http
POST /api/products
```

Body JSON:

```json
{
  "sku": "SKU-001",
  "name": "Laptop",
  "description": "Laptop untuk kebutuhan kerja",
  "price": 8500000,
  "stock": 10,
  "category_id": 1
}
```

Contoh respons `201 Created`:

```json
{
  "id": 1,
  "sku": "SKU-001",
  "name": "Laptop",
  "description": "Laptop untuk kebutuhan kerja",
  "price": 8500000,
  "stock": 10,
  "category_id": 1
}
```

## 15. Mengubah Produk

```http
PUT /api/products/{id}
```

Contoh:

```http
PUT /api/products/1
```

Body JSON:

```json
{
  "sku": "SKU-001-UPDATED",
  "name": "Laptop Updated",
  "description": "Laptop versi terbaru",
  "price": 9000000,
  "stock": 8,
  "category_id": 1
}
```

Contoh respons `200 OK`:

```json
{
  "id": 1,
  "sku": "SKU-001-UPDATED",
  "name": "Laptop Updated",
  "description": "Laptop versi terbaru",
  "price": 9000000,
  "stock": 8,
  "category_id": 1
}
```

## 16. Menghapus Produk

```http
DELETE /api/products/{id}
```

Contoh:

```http
DELETE /api/products/1
```

Contoh respons `200 OK`:

```json
{
  "message": "Product deleted successfully"
}
```

## Reports

## 17. Mengambil Total Jumlah Customer

```http
GET /api/reports/total
```

Contoh respons `200 OK`:

```json
{
  "total": 42
}
```

Nilai `total` dihitung dari jumlah baris pada tabel `customers`.

## Status Code

| Status | Keterangan |
| --- | --- |
| `200 OK` | Request berhasil |
| `201 Created` | Data berhasil dibuat |
| `400 Bad Request` | Body atau parameter tidak valid, atau operasi database gagal |
| `404 Not Found` | Data berdasarkan ID tidak ditemukan |
| `500 Internal Server Error` | Terjadi error saat mengambil data atau menghitung report |

## Pengujian dengan Postman

Collection Postman tersedia di:

```text
postman/sales-api.postman_collections.json
```

Import file tersebut ke Postman, lalu buat collection variable berikut:

| Variable | Contoh value |
| --- | --- |
| `baseUrl` | `http://localhost:3000/api` |
| `customerId` | `1` |
| `categoryId` | `1` |
| `productId` | `1` |
