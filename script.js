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

hamburger.addEventListener('click', openSidebar);
closeBtn.addEventListener('click', closeSidebar);
mobileOverlay.addEventListener('click', closeSidebar);

// Close sidebar when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', closeSidebar);
});


// ----------------- STATS COUNTER ANIMATION -----------------
const counters = document.querySelectorAll('.counter');

const animateCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 100; // Speed adjustment

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 20); // Speed
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


// Header Scroll Effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Canvas Background Animation (Subtle Blue Particles)
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particlesArray;

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
    let numberOfParticles = (canvas.height * canvas.width) / 10000;

    // Create particles
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 3) + 1;
        let directionX = (Math.random() * 0.2) - 0.1;
        let directionY = (Math.random() * 0.2) - 0.1;

        const blueShades = [
            'rgba(37, 99, 235, 0.1)',
            'rgba(59, 130, 246, 0.1)',
            'rgba(96, 165, 250, 0.1)'
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

// Resize event
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

// Active Link Highlighting on Scroll
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('.nav-links li a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});

init();
animate();
