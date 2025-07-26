// api/visitor-counter.js

export const handler = async () => {
  // Ini bisa berupa nama domain atau nama proyek Anda.
  const namespace = 'agungsoeltani.web.id';
  const key = 'visitor-count';

  try {
    // Memanggil API untuk menambah dan mendapatkan jumlah pengunjung
    const response = await fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`);
    const data = await response.json();

    // Mengembalikan jumlah pengunjung
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      // Nama propertinya diubah dari 'count' menjadi 'value' sesuai respons CountAPI
      body: JSON.stringify({ count: data.value }),
    };
  } catch (error) {
    console.error('Error fetching from CountAPI:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};