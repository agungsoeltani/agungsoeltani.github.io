import { initThemeSwitcher, initCookieConsent, initCustomCursor, initScrollIndicator } from '/modules/ui.js';
import { init3dFavicon, initParticleAnimation } from '/modules/animations.js';
import { initWeatherWidget, initDiscordPresence } from '/modules/api.js';
import { initContactForm } from '/modules/forms.js';
import { initVisitorCounter } from '/modules/visitorCounter.js'; 

document.addEventListener('DOMContentLoaded', () => {

    initThemeSwitcher();
    initCookieConsent();
    initCustomCursor();
    initScrollIndicator();

    init3dFavicon();
    initParticleAnimation();

    initWeatherWidget();
    initDiscordPresence();

    initContactForm();

    initVisitorCounter();

    console.log("✅ All modules loaded bitch");
});