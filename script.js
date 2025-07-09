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

    // --- KODE BARU: LOGIKA WIDGET CUACA DENGAN TRANSISI SMOOTH ---

    const weatherIconMap = {
        '01d': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>',
        '01n': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>',
        '02d': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>',
        '02n': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>',
        '03d': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>',
        '03n': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>',
        '04d': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>',
        '04n': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>',
        '09d': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',
        '09n': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',
        '10d': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',
        '10n': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',
        '11d': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 2 9 14 15 12 11 22"></polyline></svg>',
        '11n': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 2 9 14 15 12 11 22"></polyline></svg>',
        '13d': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>',
        '13n': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>',
        '50d': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>',
        '50n': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>',
    };

    async function getWeatherCarousel() {
        const widget = document.getElementById('weather-widget');
        if (!widget) return;

        widget.innerHTML = `<span style="font-size: 0.9em; color: var(--secondary-text-color);">Memuat...</span>`;

        try {
            const response = await fetch('https://agungsoeltani.netlify.app/.netlify/functions/cuaca'); 
            const weatherData = await response.json();

            if (!weatherData || weatherData.length === 0) {
                widget.innerHTML = `<span style="font-size: 0.9em; color: var(--secondary-text-color);">Data N/A</span>`;
                return;
            }

            let currentIndex = 0;

            function updateWeather() {
                const currentCity = weatherData[currentIndex];
                const iconCode = currentCity.icon;
                let mappedIconCode = iconCode.slice(0, -1) + 'd';
                if (iconCode === '01n') mappedIconCode = '01n';
                
                const iconSvg = weatherIconMap[mappedIconCode] || weatherIconMap['01d'];

                // Buat elemen baru untuk konten, tapi jangan langsung ditampilkan
                const newContent = document.createElement('div');
                newContent.classList.add('weather-content');
                newContent.style.opacity = '0'; // Mulai dengan transparan
                newContent.innerHTML = `
                    <div class="weather-icon">${iconSvg}</div>
                    <span class="weather-text">${currentCity.kota} <strong>${currentCity.suhu}°C</strong></span>
                `;

                // Hapus konten lama jika ada
                const oldContent = widget.querySelector('.weather-content');
                if (oldContent) {
                    oldContent.style.opacity = '0'; // Mulai fade-out
                    // Tunggu animasi fade-out selesai sebelum mengganti
                    setTimeout(() => {
                        widget.innerHTML = ''; // Kosongkan widget
                        widget.appendChild(newContent);
                        // Paksa browser render, lalu mulai fade-in
                        setTimeout(() => newContent.style.opacity = '1', 20);
                    }, 400); // Durasi harus cocok dengan transisi CSS
                } else {
                    // Jika ini pertama kali, langsung tampilkan
                    widget.innerHTML = '';
                    widget.appendChild(newContent);
                    setTimeout(() => newContent.style.opacity = '1', 20);
                }
                
                currentIndex = (currentIndex + 1) % weatherData.length;
            }

            updateWeather(); // Tampilkan pertama kali
            setInterval(updateWeather, 6000); // Ganti kota setiap 6 detik
        } catch (error) {
            console.error('Gagal memuat data cuaca:', error);
            widget.innerHTML = `<span style="font-size: 0.9em; color: var(--secondary-text-color);">Gagal memuat</span>`;
        }
    }

    getWeatherCarousel();
    // --- AKHIR DARI KODE BARU ---

});