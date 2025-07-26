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

    const geometry = new THREE.IcosahedronGeometry(0.8, 0);
    const pointsMaterial = new THREE.PointsMaterial({
        color: 0xA374FF,
        size: 0.1,
        sizeAttenuation: true
    });
    const points = new THREE.Points(geometry, pointsMaterial);

    const wireframeGeometry = new THREE.WireframeGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.4
    });
    const wireframe = new THREE.LineSegments(wireframeGeometry, lineMaterial);

    const group = new THREE.Group();
    group.add(points);
    group.add(wireframe);
    scene.add(group);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    camera.position.z = 1.5;

    function animate() {
        requestAnimationFrame(animate);
        group.rotation.x += 0.01;
        group.rotation.y += 0.015;
        group.rotation.z += 0.005;
        renderer.render(scene, camera);
        faviconLink.href = renderer.domElement.toDataURL();
    }
    animate();
}

// --- PARTICLE ANIMATION WITH CENTERING FIX ---
export function initParticleAnimation() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let particles = [];
    let time = 0;

    const mouse = { x: null, y: null, radius: 120 };
    window.addEventListener('mousemove', e => { mouse.x = e.x; mouse.y = e.y; });

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.baseX = x;
            this.baseY = y;
            this.size = 1.5;
            this.density = (Math.random() * 20) + 5;
        }
        draw(color) {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
        update() {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                let force = (mouse.radius - distance) / mouse.radius;
                this.x -= (dx / distance) * force * this.density;
                this.y -= (dy / distance) * force * this.density;
            } else {
                if (this.x !== this.baseX) this.x -= (this.x - this.baseX) / 20;
                if (this.y !== this.baseY) this.y -= (this.y - this.baseY) / 20;
            }
        }
    }

    function init() {
        particles = [];
        const spacing = 70;
        const cols = Math.floor(width / spacing);
        const rows = Math.floor(height / spacing);
        // FIX: Re-calculate the offset to center the grid horizontally
        const xOffset = (width - (cols * spacing)) / 2 + spacing / 2;
        const yOffset = (height - (rows * spacing)) / 2;
        
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                particles.push(new Particle(x * spacing + xOffset, y * spacing + yOffset));
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        time += 0.002;

        const pulse = (Math.sin(time) + 1) / 2;
        const opacity = 0.1 + pulse * 0.3;
        
        const dotColor = document.body.classList.contains('dark-mode') ? `rgba(179, 136, 255, ${opacity})` : `rgba(163, 116, 255, ${opacity})`;
        const lineColor = document.body.classList.contains('dark-mode') ? 'rgba(179, 136, 255, 0.03)' : 'rgba(163, 116, 255, 0.03)';

        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw(dotColor);
            
            for (let j = i; j < particles.length; j++) {
                let distance = Math.sqrt(Math.pow(particles[i].x - particles[j].x, 2) + Math.pow(particles[i].y - particles[j].y, 2));
                if (distance < 80) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        init();
    });

    init();
    animate();
}