// 1. Pindahkan import ke bagian paling atas file
import { getStore } from '@netlify/blobs';

export const handler = async () => {
    try {
        // 2. Langsung gunakan getStore tanpa perlu await import lagi
        const store = getStore('visitor_counts');

        // Mengambil nilai counter saat ini
        let currentCount = await store.get('main_site', { type: 'json' });

        // Jika belum ada, mulai dari 0. Lalu tambah 1.
        const newCount = (currentCount ? currentCount.count : 0) + 1;

        // Simpan kembali jumlah yang baru
        await store.setJSON('main_site', { count: newCount });

        // Kirim kembali hasilnya
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ count: newCount }),
        };
    } catch (error) {
        console.error('Error in visitor-counter function:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};