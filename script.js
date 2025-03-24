
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});


window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.style.padding = '10px 0';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.padding = '20px 0';
        header.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.1)';
    }
});


const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    this.classList.toggle('fa-times');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        navLinks.classList.remove('active');
        hamburger.classList.remove('fa-times');
        
        const target = document.querySelector(this.getAttribute('href'));
        
        window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Contact Form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Mengirim...';
    
    setTimeout(() => {
        alert('Pesan Anda telah terkirim! Terima kasih telah menghubungi saya.');
        this.reset();
        submitBtn.textContent = originalText;
    }, 1500);
});

// Typing Animation
const typingElement = document.querySelector('.hero-text h1 span');
const text = typingElement.textContent;
typingElement.textContent = '';

let charIndex = 0;
function typeText() {
    if (charIndex < text.length) {
        typingElement.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 150);
    }
}

// Start typing animation after page load
window.addEventListener('load', function() {
    setTimeout(typeText, 500);
});