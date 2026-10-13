/* =============================================
   DENI KURNIAWAN PORTFOLIO — SCRIPT.JS
   ============================================= */

// =============================================
// 1. LOADING SCREEN
// =============================================
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (!loadingScreen) return;

    // Wait for loading bar animation to complete (about 2.8s), then fade out
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = '';

        // Trigger hero animations after loading
        triggerInitialAnimations();
    }, 2800);

    // Lock scroll while loading
    document.body.style.overflow = 'hidden';
});

function triggerInitialAnimations() {
    // Animate stat counters
    document.querySelectorAll('[data-count]').forEach(el => {
        animateCounter(el, parseInt(el.getAttribute('data-count')));
    });

    // Start typewriter
    startTypewriter();

    // Create floating particles
    createParticles();

    // Trigger visible reveals (for elements already in view)
    checkReveal();
}

// =============================================
// 2. TYPEWRITER EFFECT (Hero subtitle)
// =============================================
const roles = [
    'Full-Stack Developer',
    'Information Systems Analyst',
    'Power BI Expert',
    'PHP Developer',
    'Public Speaker & MC',
    'Data Analyst'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterTimeout = null;

function startTypewriter() {
    const el = document.getElementById('typewriter-text');
    if (!el) return;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            el.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            el.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 60 : 100;

        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at end
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 400;
        }

        typewriterTimeout = setTimeout(type, speed);
    }

    type();
}

// =============================================
// 3. FLOATING PARTICLES (Hero Background)
// =============================================
function createParticles() {
    const container = document.getElementById('particles-bg');
    if (!container) return;

    const count = 25;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');

        const x = Math.random() * 100;
        const duration = 5 + Math.random() * 8;
        const delay = Math.random() * 6;
        const drift = (Math.random() - 0.5) * 80;
        const size = 1 + Math.random() * 2.5;

        p.style.cssText = `
            left: ${x}%;
            bottom: 0;
            width: ${size}px;
            height: ${size}px;
            --duration: ${duration}s;
            --delay: ${delay}s;
            --drift: ${drift}px;
        `;
        container.appendChild(p);
    }
}

// =============================================
// 4. SCROLL ANIMATIONS (Intersection Observer)
// =============================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // Animate skill bars when they come into view
            const bars = entry.target.querySelectorAll('.skill-bar-fill');
            bars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                if (width) bar.style.width = width + '%';
            });
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
});

function checkReveal() {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        revealObserver.observe(el);
    });
}

// Also observe skill sections separately for bar animation
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.skill-bar-fill');
            bars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                if (width) {
                    setTimeout(() => { bar.style.width = width + '%'; }, 200);
                }
            });
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('#skills-tech').forEach(el => skillObserver.observe(el));

// =============================================
// 5. STAT COUNTER ANIMATION
// =============================================
function animateCounter(el, target) {
    let current = 0;
    const duration = 1500;
    const step = target / (duration / 16);

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current) + '+';
    }, 16);
}

// =============================================
// 6. MOBILE NAVIGATION MENU
// =============================================
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = menuBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');
        }
    });

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-xmark');
            }
        });
    });
}

// =============================================
// 7. HEADER SCROLL EFFECT
// =============================================
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// =============================================
// 8. TAB SWITCHING (Achievements / Certifications)
// =============================================
function switchTab(panelId, btn) {
    // Hide all panels
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    // Deactivate all buttons
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

    // Activate selected
    const panel = document.getElementById(panelId);
    if (panel) panel.classList.add('active');
    if (btn) btn.classList.add('active');

    // Animate skill bars in certifications if needed
    if (panelId === 'certifications-panel') {
        // Re-observe for any lazy-loaded content
    }
}

// =============================================
// 9. LIGHTBOX MODAL
// =============================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(src) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
        if (lightboxImg) lightboxImg.src = '';
    }, 300);
}

function closeLightboxOutside(e) {
    if (e.target === lightbox) closeLightbox();
}

// Close on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

// =============================================
// 10. GALLERY SLIDER CONTROLS
// =============================================
const slider = document.getElementById('gallery-slider');
const prevBtn = document.getElementById('prev-slide');
const nextBtn = document.getElementById('next-slide');

if (slider && prevBtn && nextBtn) {
    const scrollAmount = 280;

    prevBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
}

// =============================================
// 11. SMOOTH ACTIVE NAV LINK (scroll spy)
// =============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === '#' + id) {
                    link.style.color = '#FBBF24';
                }
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(section => navObserver.observe(section));

// =============================================
// 12. INIT ON DOM READY
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize reveal observers immediately (will activate on scroll)
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        revealObserver.observe(el);
    });

    // Skill bars init (width = 0 initially, set via JS when in view)
    document.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = '0%';
    });
});
