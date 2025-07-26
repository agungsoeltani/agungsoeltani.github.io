// js/modules/visitorCounter.js

// 'export' digunakan agar fungsi ini bisa diimpor oleh file lain
export async function initVisitorCounter() {
    try {
        // Panggil Netlify Function Anda
        const response = await fetch('/.netlify/functions/visitor-counter');
        if (!response.ok) {
            throw new Error('Failed to fetch count');
        }
        const data = await response.json();

        // Cari elemen HTML untuk menampilkan jumlah
        const countElement = document.getElementById('visitor-count');
        if (countElement) {
            // Tampilkan jumlahnya dengan format angka Indonesia
            countElement.textContent = data.count.toLocaleString('id-ID');
        }
    } catch (error) {
        console.error("Error fetching visitor count:", error);
        const countElement = document.getElementById('visitor-count');
        if (countElement) {
            // Tampilkan 'N/A' jika terjadi error
            countElement.textContent = 'N/A';
        }
    }
}