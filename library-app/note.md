# NOTE UNTUK ENDPOINT DAN CODE
1. dikarenakan dalam buku terdapat stock jadi saya beranggapan bahwa nanti buku dapat bertambah atau berkurang stocknya (membuat terdapat endpoint yang menyesuaikan)
2. saya menggunakan endpoint "/books" untuk menampilkan semua buku yang ada di database dan peminjamnya
3. saya menambahkan endpoint "books/available" untuk menampilkan stock buku yang tersedia dan sebaliknya untuk "books/unavailable"
4. 1 member tidak bisa meminjam buku yang sama
5. 1 member tidak bisa meminjam lebih dari 2
6. untuk meringankan database maka untuk peminjam yang sama apa bila sudah mengembalikan salah satu buku maka data yang lama punya dia dihapus
   

# untuk menjalankan dan cek api doc
1. npm start
2. http://localhost:3000/api-docs/
