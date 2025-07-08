document.addEventListener('DOMContentLoaded', () => {

    // LOGIKA TAB SUDAH DIHAPUS

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

});