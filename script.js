document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM Elements
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');
    const header = document.querySelector('.navbar');
    const navLogo = document.querySelector('.nav-logo'); // Target logo
    const currentYearSpan = document.getElementById('currentYear');
    const contactForm = document.getElementById('contact-form');
    const sections = document.querySelectorAll('main section[id]');
    const revealElements = document.querySelectorAll('.hero-content, .hero-visual, .about-grid > div, .project-card, .contact-content-wrapper > div, .section-header');

    // --- Mobile Navigation Toggle ---
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('nav-open');
            navToggle.classList.toggle('nav-open');
            document.body.style.overflow = isOpen ? 'hidden' : '';
            navToggle.setAttribute('aria-expanded', isOpen);
        });
    }

    // --- Close Mobile Menu on Link Click & Set Active Link ---
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('nav-open')) {
                navMenu.classList.remove('nav-open');
                navToggle.classList.remove('nav-open');
                document.body.style.overflow = '';
                navToggle.setAttribute('aria-expanded', 'false');
            }
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // --- Header Style & Active Link on Scroll ---
    const updateHeaderAndActiveLink = () => {
        // Header style
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'var(--bg-color-medium)';
            header.style.boxShadow = '0 2px 10px var(--shadow-color)';
        } else {
            header.style.backgroundColor = 'rgba(26, 26, 26, 0.85)'; // Sesuai CSS awal
            header.style.boxShadow = 'none';
        }

        // Active link
        let currentSectionId = '';
        const scrollThreshold = header.offsetHeight + 70; // Jarak trigger sedikit di bawah header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - scrollThreshold) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
        // Jika di paling atas atau belum ada section terdeteksi, set Beranda aktif
        if (currentSectionId === '' && window.pageYOffset < sections[0].offsetTop - scrollThreshold) {
            const homeLink = document.querySelector('.nav-menu a[href="#hero"]');
            if (homeLink) homeLink.classList.add('active');
        }
    };
    window.addEventListener('scroll', updateHeaderAndActiveLink);
    updateHeaderAndActiveLink(); // Panggil sekali saat load untuk initial state

    // --- Rainbow Glow Effect for Nav Logo ---
    let rainbowInterval;
    if (navLogo) {
        const originalLogoColor = getComputedStyle(navLogo).color;
        const originalLogoTextShadow = getComputedStyle(navLogo).textShadow;

        navLogo.addEventListener('mouseenter', () => {
            if (rainbowInterval) clearInterval(rainbowInterval); // Hapus interval lama jika ada
            rainbowInterval = setInterval(() => {
                const randomHue = Math.floor(Math.random() * 360);
                const glowColor = `hsl(${randomHue}, 100%, 65%)`; // Warna glow lebih terang
                navLogo.style.color = glowColor;
                // Efek glow halus dengan text-shadow
                navLogo.style.textShadow = `0 0 3px ${glowColor}, 0 0 8px hsla(${randomHue}, 100%, 65%, 0.7), 0 0 15px hsla(${randomHue}, 100%, 65%, 0.5)`;
            }, 100); // Ganti warna setiap 100ms
        });

        navLogo.addEventListener('mouseleave', () => {
            clearInterval(rainbowInterval);
            navLogo.style.color = originalLogoColor;
            navLogo.style.textShadow = originalLogoTextShadow;
        });
    }

    // --- Update Footer Year ---
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Contact Form Submission (Demo) ---
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonHTML = submitButton.innerHTML;

            submitButton.innerHTML = 'Mengirim... <i class="fas fa-spinner fa-spin"></i>';
            submitButton.disabled = true;

            setTimeout(() => {
                alert('Pesan Anda telah "dikirim"!');
                this.reset();
                submitButton.innerHTML = originalButtonHTML;
                submitButton.disabled = false;
            }, 1500);
        });
    }

    // --- Reveal on Scroll Animation ---
    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // observer.unobserve(entry.target); // Uncomment jika hanya ingin animasi sekali
                } else {
                    // Opsional: sembunyikan lagi jika keluar viewport (jika tidak di-unobserve)
                    // entry.target.classList.remove('is-visible');
                }
            });
        }, {
            threshold: 0.1, // Trigger saat 10% elemen terlihat
            // rootMargin: "0px 0px -50px 0px" // Opsional: sesuaikan area deteksi
        });

        revealElements.forEach(el => {
            el.classList.add('reveal-on-scroll'); // Tambah class untuk style awal (opacity:0, transform:translateY)
            revealObserver.observe(el);
        });
    } else {
        // Fallback jika IntersectionObserver tidak didukung (misal: buat semua elemen langsung visible)
        revealElements.forEach(el => el.classList.add('is-visible'));
    }
});
