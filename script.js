// script.js

// Wait for DOM to load completely
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize Animate On Scroll (AOS)
    AOS.init({
        once: true,
        offset: 50,
        duration: 1000,
        easing: 'ease-out-cubic',
    });

    // 2. Initialize Lucide Icons
    lucide.createIcons();

    // 3. Sophisticated Loading Screen with Counter
    const loader = document.getElementById('loader');
    const loaderCounter = document.getElementById('loader-counter');
    const loaderBar = document.getElementById('loader-bar');
    
    let count = 0;
    const interval = setInterval(() => {
        // Fast random increment to simulate asset loading
        count += Math.floor(Math.random() * 10) + 1;
        if (count >= 100) {
            count = 100;
            clearInterval(interval);
            
            // Start exit animations
            setTimeout(() => {
                loader.style.transform = 'translateY(-100%)';
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 1000);
            }, 600);
        }
        
        loaderCounter.innerText = count + '%';
        loaderBar.style.width = count + '%';
        
    }, 30);

    // 4. Custom Cursor Logic
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    
    // Only run cursor logic if the elements exist (hidden on mobile)
    if (cursor && cursorDot && window.matchMedia("(pointer: fine)").matches) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        // Mouse move tracking
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Dot follows instantly
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        // Smooth follow for the outer ring
        const renderCursor = () => {
            // Lerp (Linear Interpolation) for smooth trailing effect
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(renderCursor);
        };
        requestAnimationFrame(renderCursor);

        // Add hover effects on interactive elements
        const hoverElements = document.querySelectorAll('.cursor-hover, a, button, input, textarea, select');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
        });
    }

    // 5. Scroll Progress Bar & Sticky Nav
    const scrollProgress = document.querySelector('.scroll-progress');
    const nav = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        // Progress Bar
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';

        // Glassmorphism Nav shrink
        if (scrollTop > 50) {
            nav.classList.add('py-2');
            nav.classList.remove('py-5');
        } else {
            nav.classList.add('py-5');
            nav.classList.remove('py-2');
        }
    });

    // 6. Smooth Parallax Effect on Hero & CTA Images
    const heroImg = document.getElementById('hero-img');
    const ctaImg = document.getElementById('cta-img');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        // Hero Image moves down slowly
        if(heroImg && scrolled < window.innerHeight) {
            heroImg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }

        // CTA Image Parallax
        if(ctaImg) {
            const rect = ctaImg.parentElement.getBoundingClientRect();
            // Only animate if in viewport
            if(rect.top < window.innerHeight && rect.bottom > 0) {
                const distance = window.innerHeight - rect.top;
                ctaImg.style.transform = `translateY(${distance * 0.15 - 50}px)`;
            }
        }
    });

    // 7. Magnetic Buttons Effect
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    
    if(window.matchMedia("(pointer: fine)").matches) {
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', function(e) {
                const position = btn.getBoundingClientRect();
                const x = e.clientX - position.left - position.width / 2;
                const y = e.clientY - position.top - position.height / 2;
                
                // Move button slightly towards cursor
                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`;
            });
            
            btn.addEventListener('mouseleave', function() {
                // Snap back to original position
                btn.style.transform = 'translate(0px, 0px)';
            });
        });
    }
});
