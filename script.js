document.addEventListener('DOMContentLoaded', () => {

    // --- LOGIKA TAB UNTUK BAGIAN "ABOUT" ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // --- LOGIKA LIGHT/DARK MODE YANG SIMPEL DAN CEPAT ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    // Fungsi untuk menerapkan tema berdasarkan status saat ini
    const applyTheme = (theme) => {
        body.classList.toggle('dark-mode', theme === 'dark');
    };

    // Cek tema yang tersimpan atau preferensi sistem saat halaman dimuat
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Terapkan tema yang sesuai
    applyTheme(savedTheme || (systemPrefersDark ? 'dark' : 'light'));

    // Event listener untuk tombol: cukup toggle class dan simpan
    themeToggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const newTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
    });

});