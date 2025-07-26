export function initThemeSwitcher() {
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    if (!themeToggleButton) return;

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
}

// --- LOGIKA COOKIE CONSENT ---
export function initCookieConsent() {
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieAcceptBtn = document.getElementById('cookie-accept');
    const cookieDeclineBtn = document.getElementById('cookie-decline');

    if (!cookieBanner || !cookieAcceptBtn || !cookieDeclineBtn) return;

    const cookieConsent = localStorage.getItem('cookie_consent');
    if (!cookieConsent) {
        setTimeout(() => cookieBanner.classList.add('active'), 1000);
    }

    cookieAcceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookie_consent', 'accepted');
        cookieBanner.classList.remove('active');
    });

    cookieDeclineBtn.addEventListener('click', () => {
        localStorage.setItem('cookie_consent', 'declined');
        cookieBanner.classList.remove('active');
    });
}

// --- LOGIKA CUSTOM CURSOR ---
export function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (!cursorDot || !cursorOutline) return;

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
        'a, button, .work-item-card, .skill-card, .theme-switcher, .scroll-indicator, input, textarea'
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
}

// --- LOGIKA SCROLL INDICATOR ---
export function initScrollIndicator() {
    const scrollArrow = document.getElementById('scroll-arrow');
    if (!scrollArrow) return;

    const arrowUp = scrollArrow.querySelector('.arrow-up');
    const arrowDown = scrollArrow.querySelector('.arrow-down');

    if (!arrowUp || !arrowDown) return;

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const fullHeight = document.documentElement.scrollHeight;
        if (scrollPosition < 50) {
            scrollArrow.classList.add('visible');
            arrowDown.style.display = 'block';
            arrowUp.style.display = 'none';
            scrollArrow.href = '#about';
        } else if (scrollPosition + windowHeight >= fullHeight - 50) {
            scrollArrow.classList.add('visible');
            arrowDown.style.display = 'none';
            arrowUp.style.display = 'block';
            scrollArrow.href = '#';
        } else {
            scrollArrow.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
}