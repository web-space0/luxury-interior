// script.js

// 1. Initialize Animate On Scroll (AOS)
AOS.init({
    once: true,
    offset: 50,
    duration: 1000,
    easing: 'ease-out-cubic',
});

// 2. Initialize Lucide Icons
lucide.createIcons();

// 3. Loading Screen Logic
window.addEventListener('load', function() {
    setTimeout(function() {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 1000);
        }
    }, 500); // Slight delay for premium fonts to load smoothly
});

// 4. Sticky Navbar Glass Effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (nav) {
        if (window.scrollY > 50) {
            nav.classList.add('py-3');
            nav.classList.remove('py-5');
        } else {
            nav.classList.add('py-5');
            nav.classList.remove('py-3');
        }
    }
});
