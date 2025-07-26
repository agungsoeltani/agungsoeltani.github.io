import { initThemeSwitcher, initCookieConsent, initCustomCursor, initScrollIndicator } from '/modules/ui.js';
import { init3dFavicon, initParticleAnimation } from '/modules/animations.js';
import { initWeatherWidget, initDiscordPresence } from '/modules/api.js';
import { initContactForm } from '/modules/forms.js';

// Event listener ini memastikan semua elemen HTML sudah siap sebelum script dijalankan.
document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi komponen antarmuka (UI)
    initThemeSwitcher();
    initCookieConsent();
    initCustomCursor();
    initScrollIndicator();

    // Inisialisasi animasi visual
    init3dFavicon();
    initParticleAnimation();

    // Inisialisasi widget yang mengambil data dari API
    initWeatherWidget();
    initDiscordPresence();

    // Inisialisasi fungsionalitas form
    initContactForm();

    console.log("✅ All modules loaded successfully!");
});