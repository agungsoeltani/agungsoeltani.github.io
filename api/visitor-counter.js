// api/visitor-counter.js

export const handler = async () => {
  const namespace = 'agungsoeltani.web.id';
  const key = 'visitor-count';

  try {
    // URL diperbaiki: 'api.countapi.xyz' menjadi 'countapi.xyz'
    const response = await fetch(`https://countapi.xyz/hit/${namespace}/${key}`);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
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