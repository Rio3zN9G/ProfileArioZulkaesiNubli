// Initialize AOS
AOS.init({
    duration: 1000,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50
});

// ----------------- SEQUENTIAL LOADER LOGIC -----------------
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const icon1 = document.getElementById('icon-1');
    const icon2 = document.getElementById('icon-2');
    const icon3 = document.getElementById('icon-3');
    const icon4 = document.getElementById('icon-4');
    const loaderText = document.querySelector('.loader-text');

    if (loader && icon1 && icon2 && icon3 && icon4 && loaderText) {
        // Sequential Animation Timeline
        setTimeout(() => { icon1.classList.add('active'); }, 300);
        setTimeout(() => { icon2.classList.add('active'); }, 600);
        setTimeout(() => { icon3.classList.add('active'); }, 900);
        setTimeout(() => { icon4.classList.add('active'); }, 1200);

        setTimeout(() => {
            loaderText.classList.add('revealed');
        }, 1600);

        setTimeout(() => {
            // Slide up and remove
            loader.style.transition = 'transform 0.8s cubic-bezier(0.7, 0, 0.3, 1)';
            loader.style.transform = 'translateY(-100%)';
        }, 2800);
    }
});

// ----------------- MOBILE SIDEBAR LOGIC -----------------
const hamburger = document.querySelector('.hamburger');
const mobileOverlay = document.querySelector('.mobile-overlay');
const navLinksContainer = document.querySelector('.nav-links-container');
const closeBtn = document.querySelector('.close-btn');
const navLinks = document.querySelectorAll('.nav-links a');

function openSidebar() {
    navLinksContainer.classList.add('active');
    mobileOverlay.classList.add('active');
}

function closeSidebar() {
    navLinksContainer.classList.remove('active');
    mobileOverlay.classList.remove('active');
}

if (hamburger && closeBtn && mobileOverlay) {
    hamburger.addEventListener('click', openSidebar);
    closeBtn.addEventListener('click', closeSidebar);
    mobileOverlay.addEventListener('click', closeSidebar);

    // Close sidebar when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', closeSidebar);
    });
}


// ----------------- STATS COUNTER ANIMATION -----------------
const counters = document.querySelectorAll('.counter');

const animateCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = Math.ceil(target / 100); // Dynamic increment

        if (count < target) {
            counter.innerText = Math.min(count + increment, target);
            setTimeout(animateCounters, 30);
        } else {
            counter.innerText = target + "+";
        }
    });
};

/* Trigger Counter animation when Stats section is in view */
let animationTriggered = false;
const statsSection = document.querySelector('.stats-section');

window.addEventListener('scroll', () => {
    if (!animationTriggered && statsSection) {
        const sectionTop = statsSection.offsetTop;
        const sectionHeight = statsSection.clientHeight;
        if (window.scrollY > (sectionTop - window.innerHeight + sectionHeight / 2)) {
            animateCounters();
            animationTriggered = true;
        }
    }
});


// ----------------- SCROLL PROGRESS BAR -----------------
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    // Prevent division by zero
    const scrolled = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    const progressBar = document.querySelector('.scroll-progress-bar');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
});


// ----------------- VANILLA 3D TILT EFFECT -----------------
class VanillaTilt {
    constructor(element) {
        this.element = element;
        this.width = this.element.offsetWidth;
        this.height = this.element.offsetHeight;
        this.left = this.element.offsetLeft;
        this.top = this.element.offsetTop;
        this.transitionTimeout = null;

        // Settings
        this.max = 10; // Max tilt rotation (degrees)
        this.perspective = 1000;
        this.scale = 1.05;
        this.speed = 400;

        this.init();
    }

    init() {
        this.element.addEventListener('mouseenter', this.onMouseEnter.bind(this));
        this.element.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.element.addEventListener('mouseleave', this.onMouseLeave.bind(this));

        // Add 3D CSS
        this.element.style.transformStyle = 'preserve-3d';
    }

    onMouseEnter() {
        this.element.style.transition = 'none';
    }

    onMouseMove(event) {
        // Need to get rect on every move or at least on enter to support scrolling
        const rect = this.element.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width; // 0 to 1
        const y = (event.clientY - rect.top) / rect.height; // 0 to 1

        const tiltX = (this.max * -1) + (x * (this.max * 2)); // -max to +max
        const tiltY = (this.max) - (y * (this.max * 2)); // +max to -max

        this.element.style.transform = `
            perspective(${this.perspective}px) 
            rotateX(${tiltY}deg) 
            rotateY(${tiltX}deg) 
            scale3d(${this.scale}, ${this.scale}, ${this.scale})
        `;
    }

    onMouseLeave() {
        this.element.style.transition = `transform ${this.speed}ms cubic-bezier(.03,.98,.52,.99)`;
        this.element.style.transform = `perspective(${this.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    }
}

// Apply Tilt to Cards with delay to ensure DOM is ready
setTimeout(() => {
    const tiltElements = document.querySelectorAll('.service-card, .stat-item, .contact-card, .skill-item');
    tiltElements.forEach(el => new VanillaTilt(el));
}, 100);


// Header Scroll Effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (header && window.scrollY > 50) {
        header.classList.add('scrolled');
    } else if (header) {
        header.classList.remove('scrolled');
    }
});

// Canvas Background Animation (Subtle Blue Particles)
const canvas = document.getElementById('bg-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray;

    const setCanvasSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setCanvasSize();

    class Particle {
        constructor(directionX, directionY, size, color) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
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

            this.x += this.directionX;
            this.y += this.directionY;

            this.draw();
        }
    }

    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 15000;

        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let directionX = (Math.random() * 0.2) - 0.1;
            let directionY = (Math.random() * 0.2) - 0.1;

            const blueShades = [
                'rgba(37, 99, 235, 0.05)',
                'rgba(59, 130, 246, 0.05)'
            ];
            let color = blueShades[Math.floor(Math.random() * blueShades.length)];

            particlesArray.push(new Particle(directionX, directionY, size, color));
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
    }

    window.addEventListener('resize', () => {
        setCanvasSize();
        init();
    });

    init();
    animate();
}

// Active Link Highlighting on Scroll
const sectionElements = document.querySelectorAll('section');
const navLiElements = document.querySelectorAll('.nav-links li a');

window.addEventListener('scroll', () => {
    let current = '';

    sectionElements.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    if (current) {
        navLiElements.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.adpd('active');
            }
        });
    }
});
