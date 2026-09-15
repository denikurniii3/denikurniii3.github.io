// Mobile navigation menu toggle
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
}

// Lightbox Modal Viewer for Speaker Gallery
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(imagePath) {
    if (lightbox && lightboxImg) {
        lightboxImg.src = imagePath;
        lightbox.classList.remove('opacity-0', 'pointer-events-none');
        lightbox.classList.add('opacity-100');
        document.body.style.overflow = 'hidden'; // Lock background scroll
    }
}

function closeLightbox() {
    if (lightbox) {
        lightbox.classList.remove('opacity-100');
        lightbox.classList.add('opacity-0', 'pointer-events-none');
        document.body.style.overflow = ''; // Unlock background scroll
    }
}

// Close lightbox when clicking outside the image
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Horizontal Gallery Slider Scroll Controls
const slider = document.getElementById('gallery-slider');
const prevBtn = document.getElementById('prev-slide');
const nextBtn = document.getElementById('next-slide');

if (slider && prevBtn && nextBtn) {
    const scrollAmount = 320; // Scroll width matching photo cards + gap
    
    prevBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    nextBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
}
