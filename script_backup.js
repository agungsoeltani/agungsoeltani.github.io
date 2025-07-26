document.addEventListener('DOMContentLoaded', () => {

    // --- LOGIKA UNTUK FAVICON 3D BERPUTAR ---
    function create3dFavicon() {
        if (typeof THREE === 'undefined') {
            console.error('Three.js library not loaded, skipping 3D favicon.');
            return;
        }

        const faviconLink = document.getElementById('favicon');
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        
        const faviconSize = 64;
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(faviconSize, faviconSize);

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({ 
            color: 0xA374FF,
            metalness: 0.5,
            roughness: 0.5
        });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        camera.position.z = 1.5;

        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
            faviconLink.href = renderer.domElement.toDataURL();
        }
        animate();
    }
    
    create3dFavicon();

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
    
    // --- LOGIKA COOKIE CONSENT ---
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieAcceptBtn = document.getElementById('cookie-accept');
    const cookieDeclineBtn = document.getElementById('cookie-decline');
    const cookieConsent = localStorage.getItem('cookie_consent');
    if (!cookieConsent) {
        setTimeout(() => {
            if (cookieBanner) {
                cookieBanner.classList.add('active');
            }
        }, 1000);
    }
    if (cookieAcceptBtn) {
        cookieAcceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookie_consent', 'accepted');
            cookieBanner.classList.remove('active');
        });
    }
    if (cookieDeclineBtn) {
        cookieDeclineBtn.addEventListener('click', () => {
            localStorage.setItem('cookie_consent', 'declined');
            cookieBanner.classList.remove('active');
        });
    }

    // --- LOGIKA CUSTOM CURSOR ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    window.addEventListener('mousemove', e => {
        const posX = e.clientX;
        const posY = e.clientY;
        if (cursorDot) {
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
        }
        if (cursorOutline) {
            requestAnimationFrame(() => {
                cursorOutline.style.left = `${posX}px`;
                cursorOutline.style.top = `${posY}px`;
            });
        }
    });

    const interactiveElements = document.querySelectorAll(
        'a, button, .work-item-card, .skill-card, .theme-switcher, .scroll-indicator, input, textarea'
    );
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursorDot) cursorDot.classList.add('hover');
            if (cursorOutline) cursorOutline.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            if (cursorDot) cursorDot.classList.remove('hover');
            if (cursorOutline) cursorOutline.classList.remove('hover');
        });
    });

    // --- LOGIKA ANIMASI PARTIKEL BACKGROUND ---
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
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
                this.x = x; this.y = y; this.directionX = directionX; this.directionY = directionY; this.size = size; this.color = color;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            update() {
                if (this.x > canvas.width || this.x < 0) { this.directionX = -this.directionX; }
                if (this.y > canvas.height || this.y < 0) { this.directionY = -this.directionY; }
                let dx = mouse.x - this.x; let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius + this.size) {
                    if (mouse.x < this.x && this.x < canvas.width - this.size * 10) { this.x += 5; }
                    if (mouse.x > this.x && this.x > this.size * 10) { this.x -= 5; }
                    if (mouse.y < this.y && this.y < canvas.height - this.size * 10) { this.y += 5; }
                    if (mouse.y > this.y && this.y > this.size * 10) { this.y -= 5; }
                }
                this.x += this.directionX; this.y += this.directionY;
                this.draw();
            }
        }
        function init() {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 9000;
            let particleColor = document.body.classList.contains('dark-mode') ? 'rgba(179, 136, 255, 0.5)' : 'rgba(163, 116, 255, 0.5)';
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((window.innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((window.innerHeight - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * .4) - .2;
                let directionY = (Math.random() * .4) - .2;
                particlesArray.push(new Particle(x, y, directionX, directionY, size, particleColor));
            }
        }
        function connect() {
            let opacityValue = 1;
            let lineColor = document.body.classList.contains('dark-mode') ? 'rgba(179, 136, 255, 0.1)' : 'rgba(163, 116, 255, 0.1)';
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000);
                        ctx.strokeStyle = lineColor.replace('0.1', String(opacityValue));
                        ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(particlesArray[a].x, particlesArray[a].y); ctx.lineTo(particlesArray[b].x, particlesArray[b].y); ctx.stroke();
                    }
                }
            }
        }
        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connect();
        }
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            mouse.radius = (canvas.height / 80) * (canvas.width / 80);
            init();
        });
        if(themeToggleButton) {
            themeToggleButton.addEventListener('click', init);
        }
        init();
        animate();
    }

    // --- LOGIKA SCROLL INDICATOR ---
    const scrollArrow = document.getElementById('scroll-arrow');
    if (scrollArrow) {
        const arrowUp = scrollArrow.querySelector('.arrow-up');
        const arrowDown = scrollArrow.querySelector('.arrow-down');
        function handleScroll() {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const fullHeight = document.documentElement.scrollHeight;
            if (arrowUp && arrowDown) {
                if (scrollPosition < 50) {
                    scrollArrow.classList.add('visible'); arrowDown.style.display = 'block'; arrowUp.style.display = 'none'; scrollArrow.href = '#about';
                } else if (scrollPosition + windowHeight >= fullHeight - 50) {
                    scrollArrow.classList.add('visible'); arrowDown.style.display = 'none'; arrowUp.style.display = 'block'; scrollArrow.href = '#';
                } else {
                    scrollArrow.classList.remove('visible');
                }
            }
        }
        window.addEventListener('scroll', handleScroll);
        handleScroll();
    }

    // --- LOGIKA SLIDESHOW GAMBAR PROYEK (KODE LAMA) ---
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const images = card.querySelectorAll('.project-card-image img');
        let currentIndex = 0; let intervalId = null;
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

    // --- LOGIKA FORMULIR KONTAK ---
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        const toastNotification = document.getElementById('toast-notification');
        
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const button = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = button.textContent;
            
            button.disabled = true;
            button.textContent = 'Sending...';

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                const result = await response.json();
                if (result.success) {
                    showToast('Message sent successfully!', 'success');
                    contactForm.reset();
                } else {
                    console.error('Error from Web3Forms:', result);
                    showToast(result.message || 'An error occurred.', 'error');
                }
            } catch (error) {
                console.error('Submission error:', error);
                showToast('Could not send message. Please try again.', 'error');
            } finally {
                button.disabled = false;
                button.textContent = originalButtonText;
            }
        });

        function showToast(message, type) {
            if (!toastNotification) return;
            const toastMessage = toastNotification.querySelector('.toast-message');
            const toastIcon = toastNotification.querySelector('.toast-icon');
            if (!toastMessage || !toastIcon) return;

            toastMessage.textContent = message;
            if (type === 'success') {
                toastIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
                toastNotification.className = 'toast-notification success';
            } else {
                toastIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
                toastNotification.className = 'toast-notification error';
            }
            toastNotification.classList.add('show');
            setTimeout(() => {
                toastNotification.classList.remove('show');
            }, 5000);
        }
    }

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
    async function getWeatherCarousel() {
        const widget = document.getElementById('weather-widget');
        if (!widget) return;
        widget.innerHTML = `<span style="font-size: 0.9em; color: var(--secondary-text-color);">Loading...</span>`;
        try {
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
                    let mappedIconCode = String(iconCode).slice(0, -1) + 'd';
                    if (iconCode === '01n') mappedIconCode = '01n';
                    const iconSvg = weatherIconMap[mappedIconCode] || weatherIconMap['01d'];
                    widget.innerHTML = `
                        <div class="weather-content">
                            <div class="weather-icon">${iconSvg}</div>
                            <span class="weather-text">${currentCity.kota} <strong>${currentCity.suhu}°C</strong></span>
                        </div>`;
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
            console.error('Failed to load weather data:', error);
            widget.innerHTML = `<span style="font-size: 0.9em; color: var(--secondary-text-color);">Load failed</span>`;
        }
    }

    // --- FUNGSI DISCORD PRESENCE ---
    let activityInterval = null;
    function formatDuration(ms) {
        if (!ms) return '';
        const totalSeconds = Math.floor((Date.now() - ms) / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const pad = (num) => num.toString().padStart(2, '0');
        if (hours > 0) {
            return `${pad(hours)}:${pad(minutes)}:${pad(seconds)} elapsed`;
        }
        return `${pad(minutes)}:${pad(seconds)} elapsed`;
    }

    async function fetchDiscordPresence() {
        const discordUserId = '438025232150822914';
        const card = document.getElementById('lanyard-card');
        if (!card) return;
        if (activityInterval) {
            clearInterval(activityInterval);
        }
        try {
            const response = await fetch(`https://api.lanyard.rest/v1/users/${discordUserId}`);
            if (!response.ok) throw new Error('Failed to fetch Lanyard data');
            const { data } = await response.json();

            if (!data || !data.discord_user) {
                throw new Error('Incomplete Lanyard data');
            }

            const avatarEl = document.getElementById('discord-avatar');
            const usernameEl = document.getElementById('discord-username');
            const statusTextEl = document.getElementById('discord-status');
            const statusIndicatorEl = document.getElementById('discord-status-indicator');
            const activityEl = document.getElementById('discord-activity');

            if (!avatarEl || !usernameEl || !statusTextEl || !statusIndicatorEl || !activityEl) return;

            avatarEl.src = `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png`;
            usernameEl.textContent = data.discord_user.username;
            statusIndicatorEl.className = 'discord-status-indicator ' + data.discord_status;
            statusTextEl.textContent = data.discord_status.charAt(0).toUpperCase() + data.discord_status.slice(1);

            let gameActivity = data.activities.find(activity => activity.type === 0); 
            let spotifyActivity = data.activities.find(activity => activity.name === 'Spotify');

            if (gameActivity) {
                activityEl.classList.add('visible');
                let imageUrl = '';
                if (gameActivity.assets && gameActivity.assets.large_image && gameActivity.application_id) {
                    imageUrl = `https://cdn.discordapp.com/app-assets/${gameActivity.application_id}/${gameActivity.assets.large_image}.png`;
                }
                const imageElement = imageUrl ? `<img src="${imageUrl}" alt="Game Art" class="activity-album-art" onerror="this.style.display='none'">` : '';
                let activityDetails = gameActivity.details ? `<p class="activity-artist">${gameActivity.details}</p>` : '';
                let stateDetails = gameActivity.state ? `<p class="activity-artist">${gameActivity.state}</p>` : '';
                
                activityEl.innerHTML = `
                    ${imageElement}
                    <div class="activity-details">
                        <p class="activity-song">Playing ${gameActivity.name}</p>
                        ${activityDetails}
                        ${stateDetails}
                        <p class="activity-artist" id="activity-timer"></p>
                    </div>`;
                statusTextEl.textContent = "Playing a Game";

                if (gameActivity.timestamps && gameActivity.timestamps.start) {
                    const timerEl = document.getElementById('activity-timer');
                    if (timerEl) {
                        timerEl.textContent = formatDuration(gameActivity.timestamps.start);
                        activityInterval = setInterval(() => {
                            const currentTimerEl = document.getElementById('activity-timer');
                            if (currentTimerEl) {
                                currentTimerEl.textContent = formatDuration(gameActivity.timestamps.start);
                            } else {
                                clearInterval(activityInterval);
                            }
                        }, 1000);
                    }
                }
            } else if (spotifyActivity && spotifyActivity.assets) {
                activityEl.classList.add('visible');
                activityEl.innerHTML = `
                    <img src="${spotifyActivity.assets.large_image_url}" alt="Album Art" class="activity-album-art">
                    <div class="activity-details">
                        <p class="activity-song">${spotifyActivity.details || ''}</p>
                        <p class="activity-artist">by ${spotifyActivity.state || ''}</p>
                        <p class="activity-artist" id="activity-timer"></p>
                    </div>`;
                statusTextEl.textContent = "Listening to Spotify";
                if (spotifyActivity.timestamps && spotifyActivity.timestamps.start) {
                    const timerEl = document.getElementById('activity-timer');
                    if(timerEl) {
                        timerEl.textContent = formatDuration(spotifyActivity.timestamps.start);
                        activityInterval = setInterval(() => {
                            const currentTimerEl = document.getElementById('activity-timer');
                            if (currentTimerEl) {
                                currentTimerEl.textContent = formatDuration(spotifyActivity.timestamps.start);
                            } else {
                                clearInterval(activityInterval);
                            }
                        }, 1000);
                    }
                }
            } else {
                activityEl.classList.remove('visible');
                activityEl.innerHTML = '';
            }
        } catch (error) {
            console.error('Error fetching Discord presence:', error);
            if(card) card.innerHTML = `<p style="color: var(--secondary-text-color);">Failed to load Discord status.</p>`;
        }
    }

    // Panggil semua fungsi fetch
    getWeatherCarousel();
    fetchDiscordPresence();

});