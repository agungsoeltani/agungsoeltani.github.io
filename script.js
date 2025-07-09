document.addEventListener('DOMContentLoaded', () => {

    // --- LOGIKA LIGHT/DARK MODE ---
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
    
    // --- LOGIKA UNTUK COOKIE CONSENT ---
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieAcceptBtn = document.getElementById('cookie-accept');
    const cookieDeclineBtn = document.getElementById('cookie-decline');
    
    const cookieConsent = localStorage.getItem('cookie_consent');

    if (!cookieConsent) {
        setTimeout(() => {
            cookieBanner.classList.add('active');
        }, 1000);
    }

    cookieAcceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookie_consent', 'accepted');
        cookieBanner.classList.remove('active');
    });

    cookieDeclineBtn.addEventListener('click', () => {
        localStorage.setItem('cookie_consent', 'declined');
        cookieBanner.classList.remove('active');
    });

    
    // --- LOGIKA CUSTOM CURSOR ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', e => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        requestAnimationFrame(() => {
            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
        });
    });

    const interactiveElements = document.querySelectorAll(
        'a, button, .project-card, .skill-card, .theme-switcher, .scroll-indicator, input, textarea'
    );

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.classList.add('hover');
            cursorOutline.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('hover');
            cursorOutline.classList.remove('hover');
        });
    });


    // --- LOGIKA ANIMASI PARTIKEL BACKGROUND ---
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray;

    let mouse = {
        x: null,
        y: null,
        radius: 150
    };

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });
    
    window.addEventListener('scroll', () => {
        mouse.y = window.scrollY + 50; 
    });


    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }

            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius + this.size) {
                if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                    this.x += 5;
                }
                if (mouse.x > this.x && this.x > this.size * 10) {
                    this.x -= 5;
                }
                if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                    this.y += 5;
                }
                if (mouse.y > this.y && this.y > this.size * 10) {
                    this.y -= 5;
                }
            }

            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 9000;
        let particleColor = body.classList.contains('dark-mode') ? 'rgba(179, 136, 255, 0.5)' : 'rgba(163, 116, 255, 0.5)';

        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * .4) - .2;
            let directionY = (Math.random() * .4) - .2;
            particlesArray.push(new Particle(x, y, directionX, directionY, size, particleColor));
        }
    }

    function connect() {
        let opacityValue = 1;
        let lineColor = body.classList.contains('dark-mode') ? 'rgba(179, 136, 255, 0.1)' : 'rgba(163, 116, 255, 0.1)';

        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                               ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                    opacityValue = 1 - (distance / 20000);
                    ctx.strokeStyle = lineColor.replace('0.1', opacityValue);
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }

    window.addEventListener('resize', () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = (canvas.height / 80) * (canvas.width / 80);
        init();
    });
    
    themeToggleButton.addEventListener('click', init);

    init();
    animate();


    // --- LOGIKA SCROLL INDICATOR ---
    const scrollArrow = document.getElementById('scroll-arrow');
    const arrowUp = scrollArrow.querySelector('.arrow-up');
    const arrowDown = scrollArrow.querySelector('.arrow-down');

    function handleScroll() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const fullHeight = document.documentElement.scrollHeight;

        if (scrollPosition < 50) {
            scrollArrow.classList.add('visible');
            arrowDown.style.display = 'block';
            arrowUp.style.display = 'none';
            scrollArrow.href = '#about';
        } 
        else if (scrollPosition + windowHeight >= fullHeight - 50) {
            scrollArrow.classList.add('visible');
            arrowDown.style.display = 'none';
            arrowUp.style.display = 'block';
            scrollArrow.href = '#';
        } 
        else {
            scrollArrow.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

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

    // --- KODE WIDGET CUACA ---
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
// Taruh variabel ini di luar fungsi agar bisa diakses dan dibersihkan
let activityInterval = null;

// Helper function untuk memformat durasi dari milidetik menjadi HH:MM:SS
function formatDuration(ms) {
    if (!ms) return '';
    const totalSeconds = Math.floor((Date.now() - ms) / 1000);
    
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Fungsi kecil untuk menambahkan '0' di depan angka jika kurang dari 10
    const pad = (num) => num.toString().padStart(2, '0');

    if (hours > 0) {
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)} elapsed`;
    }
    return `${pad(minutes)}:${pad(seconds)} elapsed`;
}


// --- FUNGSI UNTUK MENGAMBIL DATA DISCORD DARI LANYARD (VERSI LENGKAP) ---
async function fetchDiscordPresence() {
    const discordUserId = '438025232150822914';
    const card = document.getElementById('lanyard-card');

    // Hentikan interval sebelumnya agar tidak ada timer ganda yang berjalan
    if (activityInterval) {
        clearInterval(activityInterval);
    }

    try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${discordUserId}`);
        if (!response.ok) {
            throw new Error('Gagal mengambil data Lanyard');
        }
        const { data } = await response.json();

        // Ambil elemen-elemen dari HTML
        const avatarEl = document.getElementById('discord-avatar');
        const usernameEl = document.getElementById('discord-username');
        const statusTextEl = document.getElementById('discord-status');
        const statusIndicatorEl = document.getElementById('discord-status-indicator');
        const activityEl = document.getElementById('discord-activity');

        // Update info dasar
        avatarEl.src = `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png`;
        usernameEl.textContent = data.discord_user.username;
        
        // Update status (online, idle, dnd, offline)
        statusIndicatorEl.className = 'discord-status-indicator'; // Reset class
        statusIndicatorEl.classList.add(data.discord_status);
        statusTextEl.textContent = data.discord_status.charAt(0).toUpperCase() + data.discord_status.slice(1);

        // --- LOGIKA AKTIVITAS YANG DIPERBARUI DENGAN LEBIH BANYAK DETAIL ---
        
        let gameActivity = data.activities.find(activity => activity.type === 0); 
        let spotifyActivity = data.activities.find(activity => activity.name === 'Spotify');

        if (gameActivity) {
            activityEl.classList.add('visible');
            
            // Mengambil semua detail yang mungkin ada
            let details = gameActivity.details ? `<p class="activity-artist">${gameActivity.details}</p>` : '';
            let state = gameActivity.state ? `<p class="activity-artist">${gameActivity.state}</p>` : '';
            
            activityEl.innerHTML = `
                <img src="https://cdn.discordapp.com/app-assets/${gameActivity.application_id}/${gameActivity.assets.large_image}.png" alt="Game Art" class="activity-album-art" onerror="this.style.display='none'">
                <div class="activity-details">
                    <p class="activity-song">Playing ${gameActivity.name}</p>
                    ${details}
                    ${state}
                    <p class="activity-artist" id="activity-timer"></p>
                </div>
            `;
            statusTextEl.textContent = "Playing a Game";

            // Jika ada timestamp, mulai timer
            if (gameActivity.timestamps && gameActivity.timestamps.start) {
                const timerEl = document.getElementById('activity-timer');
                // Langsung tampilkan waktu pertama kali
                timerEl.textContent = formatDuration(gameActivity.timestamps.start);
                // Set interval untuk update setiap detik
                activityInterval = setInterval(() => {
                    timerEl.textContent = formatDuration(gameActivity.timestamps.start);
                }, 1000);
            }

        } else if (spotifyActivity) {
            activityEl.classList.add('visible');
            activityEl.innerHTML = `
                <img src="${spotifyActivity.assets.large_image_url}" alt="Album Art" class="activity-album-art">
                <div class="activity-details">
                    <p class="activity-song">${spotifyActivity.details}</p>
                    <p class="activity-artist">by ${spotifyActivity.state}</p>
                    <p class="activity-artist" id="activity-timer"></p>
                </div>
            `;
            statusTextEl.textContent = "Listening to Spotify";
            
            // Timer untuk Spotify juga
            if (spotifyActivity.timestamps && spotifyActivity.timestamps.start) {
                const timerEl = document.getElementById('activity-timer');
                timerEl.textContent = formatDuration(spotifyActivity.timestamps.start);
                activityInterval = setInterval(() => {
                    timerEl.textContent = formatDuration(spotifyActivity.timestamps.start);
                }, 1000);
            }

        } else {
            activityEl.classList.remove('visible');
            activityEl.innerHTML = '';
        }

    } catch (error) {
        console.error('Error fetching Discord presence:', error);
        card.innerHTML = `<p style="color: var(--secondary-text-color);">Gagal memuat status Discord.</p>`;
    }
}

// ▲▲▲ AKHIR DARI KODE BARU ▲▲▲
    async function getWeatherCarousel() {
        const widget = document.getElementById('weather-widget');
        if (!widget) return;

        widget.innerHTML = `<span style="font-size: 0.9em; color: var(--secondary-text-color);">Memuat...</span>`;

        try {
            // Ganti URL ini dengan URL Netlify Function Anda yang sebenarnya
            const response = await fetch('https://agungsoeltani.netlify.app/.netlify/functions/cuaca'); 
            const weatherData = await response.json();

            if (!weatherData || weatherData.length === 0) {
                widget.innerHTML = `<span style="font-size: 0.9em; color: var(--secondary-text-color);">Data N/A</span>`;
                return;
            }

            let currentIndex = 0;

            function updateWeather() {
                const contentWrapper = widget.querySelector('.weather-content');

                const changeContent = () => {
                    const currentCity = weatherData[currentIndex];
                    const iconCode = currentCity.icon;
                    let mappedIconCode = iconCode.slice(0, -1) + 'd';
                    if (iconCode === '01n') mappedIconCode = '01n';
                    
                    const iconSvg = weatherIconMap[mappedIconCode] || weatherIconMap['01d'];

                    widget.innerHTML = `
                        <div class="weather-content">
                            <div class="weather-icon">${iconSvg}</div>
                            <span class="weather-text">${currentCity.kota} <strong>${currentCity.suhu}°C</strong></span>
                        </div>
                    `;
                    
                    currentIndex = (currentIndex + 1) % weatherData.length;
                };

                if (contentWrapper) {
                    contentWrapper.classList.add('fade-out');
                    setTimeout(changeContent, 400);
                } else {
                    changeContent();
                }
            }

            updateWeather();
            setInterval(updateWeather, 6000);
        } catch (error) {
            console.error('Gagal memuat data cuaca:', error);
            widget.innerHTML = `<span style="font-size: 0.9em; color: var(--secondary-text-color);">Gagal memuat</span>`;
        }
    }

    fetchDiscordPresence();
    getWeatherCarousel();

});
