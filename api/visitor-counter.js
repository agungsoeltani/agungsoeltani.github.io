// api/visitor-counter.js

export const handler = async () => {
  // Ambil URL rahasia dari Environment Variable
  const firebaseDbUrl = `${process.env.FIREBASE_DB_URL}/views.json`;

  // Pastikan variabel ada
  if (!process.env.FIREBASE_DB_URL) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Firebase URL is not configured.' }),
    };
  }

  try {
    // 1. Ambil jumlah pengunjung saat ini
    const responseGet = await fetch(firebaseDbUrl);
    const currentCount = await responseGet.json();

    // 2. Tambah 1 ke jumlah saat ini
    const newCount = (currentCount || 0) + 1;

    // 3. Simpan kembali jumlah yang baru
    const responsePut = await fetch(firebaseDbUrl, {
      method: 'PUT',
      body: JSON.stringify(newCount),
    });

    if (!responsePut.ok) {
      throw new Error('Failed to update count');
    }

    // 4. Kirim kembali jumlah baru ke frontend
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ count: newCount }),
    };
  } catch (error) {
    console.error('Firebase function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};