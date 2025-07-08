document.addEventListener('DOMContentLoaded', () => {

    // --- LOGIKA LIGHT/DARK MODE YANG SIMPEL DAN CEPAT ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    const applyTheme = (theme) => {
        body.classList.toggle('dark-mode', theme === 'dark');
    };

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    applyTheme(savedTheme || (systemPrefersDark ? 'dark' : 'light'));

    themeToggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const newTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
    });

    // --- LOGIKA SLIDESHOW GAMBAR PROYEK ---
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const images = card.querySelectorAll('.project-card-image img');
        let currentIndex = 0;
        let intervalId = null;

        if (images.length <= 1) return;

        card.addEventListener('mouseenter', () => {
            intervalId = setInterval(() => {
                images[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % images.length;
                images[currentIndex].classList.add('active');
            }, 1500);
        });

        card.addEventListener('mouseleave', () => {
            clearInterval(intervalId);
            images[currentIndex].classList.remove('active');
            currentIndex = 0;
            images[currentIndex].classList.add('active');
        });
    });

    // --- KODE BARU: LOGIKA UNTUK WIDGET CUACA BERGANTIAN ---
    async function getWeatherCarousel() {
        const widget = document.getElementById('weather-widget');
        if (!widget) return; // Hentikan jika widget tidak ditemukan

        widget.innerHTML = `<span style="font-size: 0.9em; color: var(--secondary-text-color);">Memuat...</span>`;

        try {
            // Panggil Serverless Function Anda
            // PENTING: Anda harus membuat file ini di Vercel/Netlify. Lihat contoh di bawah.
            const response = await fetch('https://weather-api-agung.netlify.app/api/cuaca'); 
            const weatherData = await response.json();

            if (!weatherData || weatherData.length === 0) {
                widget.innerHTML = `<span style="font-size: 0.9em; color: var(--secondary-text-color);">Data N/A</span>`;
                return;
            }

            let currentIndex = 0;

            function displayWeather() {
                const currentCity = weatherData[currentIndex];
                widget.innerHTML = `
                    <div class="weather-content">
                        <img src="${currentCity.icon}" alt="${currentCity.deskripsi}">
                        <span>${currentCity.kota} <strong>${currentCity.suhu}°C</strong></span>
                    </div>
                `;
                currentIndex = (currentIndex + 1) % weatherData.length;
            }

            displayWeather();
            setInterval(displayWeather, 6000); // Ganti kota setiap 6 detik
        } catch (error) {
            console.error('Gagal memuat data cuaca:', error);
            widget.innerHTML = `<span style="font-size: 0.9em; color: var(--secondary-text-color);">Gagal memuat</span>`;
        }
    }

    getWeatherCarousel();
    // --- AKHIR DARI KODE BARU ---

});