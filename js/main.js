// Main JavaScript for Marci Metzger Real Estate Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initNavbarScroll();
    initFormValidation();
    initCookieNotice();
    initAnimations();
    initImageLazyLoading();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const offsetTop = targetSection.offsetTop - navbarHeight - 20; // Extra padding
                
                window.scrollTo({
                    top: Math.max(0, offsetTop), // Ensure we don't scroll to negative values
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

// Form validation and submission
function initFormValidation() {
    const contactForm = document.querySelector('#contact form');
    const searchForm = document.querySelector('#listings form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactFormSubmission(this);
        });
    }
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSearchFormSubmission(this);
        });
    }
}

// Handle contact form submission
function handleContactFormSubmission(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Show success message
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Handle search form submission
function handleSearchFormSubmission(form) {
    const formData = new FormData(form);
    const searchParams = {};
    
    // Collect form data
    for (let [key, value] of formData.entries()) {
        if (value.trim()) {
            searchParams[key] = value;
        }
    }
    
    // Show search results (simulate)
    showNotification('Searching for properties...', 'info');
    
    // In a real application, you would send this data to your backend
    console.log('Search parameters:', searchParams);
}

// Cookie notice functionality
function initCookieNotice() {
    const cookieNotice = document.getElementById('cookieNotice');
    
    // Check if cookies were already accepted
    if (localStorage.getItem('cookiesAccepted') === 'true') {
        cookieNotice.style.display = 'none';
    }
}

// Accept cookies function
function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    document.getElementById('cookieNotice').style.display = 'none';
    
    // Initialize analytics or other tracking here
    console.log('Cookies accepted - analytics initialized');
}

// Scroll animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .stat-item, .gallery-item, .search-card');
    animateElements.forEach(el => observer.observe(el));
}

// Lazy loading for images
function initImageLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} alert-dismissible fade show`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 1060;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Phone number formatting
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    } else if (value.length >= 3) {
        value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
    }
    input.value = value;
}

// Add phone formatting to phone inputs
document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    });
});

// Search functionality enhancement
function enhanceSearchForm() {
    const searchForm = document.querySelector('#listings form');
    if (!searchForm) return;
    
    // Add real-time search suggestions (mock data)
    const locationInput = searchForm.querySelector('input[placeholder*="city"]');
    if (locationInput) {
        locationInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            if (query.length > 2) {
                // In a real app, this would be an API call
                const suggestions = ['Pahrump, NV', 'Las Vegas, NV', 'Henderson, NV', 'North Las Vegas, NV'];
                const filteredSuggestions = suggestions.filter(s => s.toLowerCase().includes(query));
                
                // Show suggestions (simplified implementation)
                console.log('Search suggestions:', filteredSuggestions);
            }
        });
    }
}

// Initialize search enhancements
document.addEventListener('DOMContentLoaded', enhanceSearchForm);

// Gallery lightbox functionality
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                showLightbox(img.src, img.alt);
            }
        });
    });
}

// Show lightbox modal
function showLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 1070;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    `;
    
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
    `;
    
    lightbox.appendChild(img);
    document.body.appendChild(lightbox);
    
    // Close on click
    lightbox.addEventListener('click', function() {
        document.body.removeChild(lightbox);
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (document.body.contains(lightbox)) {
                document.body.removeChild(lightbox);
            }
        }
    });
}

// Initialize gallery lightbox
document.addEventListener('DOMContentLoaded', initGalleryLightbox);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const debouncedScrollHandler = debounce(function() {
    // Scroll-based animations and effects
    const scrolled = window.pageYOffset;
    
    // Remove problematic parallax effect that can cause scrolling bugs
    // const parallaxElements = document.querySelectorAll('.hero-section');
    // parallaxElements.forEach(element => {
    //     const speed = 0.5;
    //     element.style.transform = `translateY(${scrolled * speed}px)`;
    // });
    
    // Add subtle navbar background change instead
    const navbar = document.querySelector('.navbar');
    if (scrolled > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Service Worker registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}
