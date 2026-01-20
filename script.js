/**
 * Squ Head Cat Gallery - Interactive Script
 * Handles fullscreen modal, smooth scrolling, and interactive features
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeGallery();
});

/**
 * Initialize all gallery features
 */
function initializeGallery() {
    setupFullscreenModal();
    setupSmoothScrolling();
    setupImageLoading();
    setupKeyboardNavigation();
}

/**
 * Setup fullscreen modal functionality
 */
function setupFullscreenModal() {
    const zoomButton = document.getElementById('zoomButton');
    const closeButton = document.getElementById('closeButton');
    const fullscreenModal = document.getElementById('fullscreenModal');
    const mainImage = document.getElementById('mainImage');

    // Open fullscreen on zoom button click
    if (zoomButton) {
        zoomButton.addEventListener('click', (e) => {
            e.stopPropagation();
            openFullscreen();
        });
    }

    // Open fullscreen on image double-click
    if (mainImage) {
        mainImage.addEventListener('dblclick', () => {
            openFullscreen();
        });
    }

    // Close fullscreen on close button click
    if (closeButton) {
        closeButton.addEventListener('click', closeFullscreen);
    }

    // Close fullscreen on modal background click
    if (fullscreenModal) {
        fullscreenModal.addEventListener('click', (e) => {
            if (e.target === fullscreenModal) {
                closeFullscreen();
            }
        });
    }

    // Close fullscreen on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && fullscreenModal.classList.contains('active')) {
            closeFullscreen();
        }
    });
}

/**
 * Open fullscreen modal
 */
function openFullscreen() {
    const fullscreenModal = document.getElementById('fullscreenModal');
    if (fullscreenModal) {
        fullscreenModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add subtle animation effect
        setTimeout(() => {
            fullscreenModal.style.opacity = '1';
        }, 10);
    }
}

/**
 * Close fullscreen modal
 */
function closeFullscreen() {
    const fullscreenModal = document.getElementById('fullscreenModal');
    if (fullscreenModal) {
        fullscreenModal.style.opacity = '0';
        
        setTimeout(() => {
            fullscreenModal.classList.remove('active');
            document.body.style.overflow = '';
        }, 300);
    }
}

/**
 * Setup smooth scrolling for navigation links
 */
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only handle hash links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Setup progressive image loading
 */
function setupImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading state
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease-in-out';
        
        // When image loads, fade it in
        if (img.complete) {
            fadeInImage(img);
        } else {
            img.addEventListener('load', () => fadeInImage(img));
        }
        
        // Handle image errors
        img.addEventListener('error', () => {
            console.warn(`Failed to load image: ${img.src}`);
            img.alt = 'Image failed to load';
        });
    });
}

/**
 * Fade in image with smooth animation
 */
function fadeInImage(img) {
    setTimeout(() => {
        img.style.opacity = '1';
    }, 100);
}

/**
 * Setup keyboard navigation
 */
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Space or Enter to open fullscreen when focused on zoom button
        if ((e.key === ' ' || e.key === 'Enter') && 
            document.activeElement.id === 'zoomButton') {
            e.preventDefault();
            openFullscreen();
        }
    });
}

/**
 * Add parallax effect to background (optional enhancement)
 */
function setupParallaxEffect() {
    const background = document.querySelector('.background-gradient');
    
    if (background && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            background.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    }
}

// Optional: Call parallax effect if desired
// setupParallaxEffect();

/**
 * Log initialization
 */
console.log('🐱 Squ Head Cat Gallery initialized successfully!');
