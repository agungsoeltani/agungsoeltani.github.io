// api/visitor-counter.js

export const handler = async () => {
  const firebaseDbUrl = `${process.env.FIREBASE_DB_URL}/views.json`;

  if (!process.env.FIREBASE_DB_URL) {
    // ... (kode error handling Anda)
  }

  try {
    // ... (logika get dan put Firebase Anda)
    const responseGet = await fetch(firebaseDbUrl);
    const currentCount = await responseGet.json();
    const newCount = (currentCount || 0) + 1;
    await fetch(firebaseDbUrl, {
      method: 'PUT',
      body: JSON.stringify(newCount),
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // <-- TAMBAHKAN HEADER INI
      },
      body: JSON.stringify({ count: newCount }),
    };
  } catch (error) {
    // ... (kode error handling Anda)
  }
};