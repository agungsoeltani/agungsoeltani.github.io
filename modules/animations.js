export function init3dFavicon() {
    if (typeof THREE === 'undefined') {
        console.error('Three.js library not loaded, skipping 3D favicon.');
        return;
    }

    const faviconLink = document.getElementById('favicon');
    if (!faviconLink) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(64, 64);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0xA374FF, metalness: 0.5, roughness: 0.5 });
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

// --- LOGIKA ANIMASI PARTIKEL ---
export function initParticleAnimation() {
    const canvas = document.getElementById('particle-canvas');
    const themeToggleButton = document.getElementById('theme-toggle');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let particlesArray;
    let mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', e => { mouse.x = e.x; mouse.y = e.y; });
    window.addEventListener('scroll', () => { mouse.y = window.scrollY + 50; });

    class Particle {
        // ... (constructor, draw, update methods remain the same)
        constructor(x, y, dirX, dirY, size, color) {
            this.x = x; this.y = y; this.directionX = dirX; this.directionY = dirY; this.size = size; this.color = color;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        update() {
            if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
            if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
            let dx = mouse.x - this.x; let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius + this.size) {
                if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 3;
                if (mouse.x > this.x && this.x > this.size * 10) this.x -= 3;
                if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 3;
                if (mouse.y > this.y && this.y > this.size * 10) this.y -= 3;
            }
            this.x += this.directionX; this.y += this.directionY;
            this.draw();
        }
    }

    function init() {
        particlesArray = [];
        let numParticles = (canvas.height * canvas.width) / 9000;
        let color = document.body.classList.contains('dark-mode') ? 'rgba(179, 136, 255, 0.5)' : 'rgba(163, 116, 255, 0.5)';
        for (let i = 0; i < numParticles; i++) {
            let size = Math.random() * 2 + 1;
            let x = Math.random() * (window.innerWidth - size * 2) + size;
            let y = Math.random() * (window.innerHeight - size * 2) + size;
            let dirX = Math.random() * 0.4 - 0.2;
            let dirY = Math.random() * 0.4 - 0.2;
            particlesArray.push(new Particle(x, y, dirX, dirY, size, color));
        }
    }

    function connect() {
        let color = document.body.classList.contains('dark-mode') ? 'rgba(179, 136, 255, 0.1)' : 'rgba(163, 116, 255, 0.1)';
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let dist = Math.sqrt(Math.pow(particlesArray[a].x - particlesArray[b].x, 2) + Math.pow(particlesArray[a].y - particlesArray[b].y, 2));
                if (dist < (canvas.width / 7) * (canvas.height / 7) / 200) { // adjusted distance
                    let opacity = 1 - (dist / 150);
                    ctx.strokeStyle = color.replace('0.1', opacity > 0 ? opacity.toFixed(2) : '0');
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
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        particlesArray.forEach(p => p.update());
        connect();
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        mouse.radius = (canvas.height / 80) * (canvas.width / 80);
        init();
    });

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', init);
    }

    init();
    animate();
}