// Main JavaScript for Marci Metzger Real Estate Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initNavbarScroll();
    initFormValidation();
    initCookieNotice();
    initAnimations();
    initImageLazyLoading();
    initSearchOverlay();
    initActiveNavigation();
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

// Enhanced search form functionality
function initEnhancedSearchForm() {
    const searchForm = document.getElementById('propertySearchForm');
    const locationInput = document.getElementById('locationInput');
    const locationSuggestions = document.getElementById('locationSuggestions');
    const clearBtn = document.getElementById('clearBtn');
    const searchResults = document.getElementById('searchResults');
    const resultsGrid = document.getElementById('resultsGrid');

    if (!searchForm) return;

    // Location suggestions
    const locations = [
        'Pahrump, NV',
        'Las Vegas, NV', 
        'Henderson, NV',
        'North Las Vegas, NV',
        'Boulder City, NV',
        'Mesquite, NV'
    ];

    // Location input with suggestions
    locationInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        if (query.length > 1) {
            const filtered = locations.filter(loc => 
                loc.toLowerCase().includes(query)
            );
            showLocationSuggestions(filtered);
        } else {
            hideLocationSuggestions();
        }
    });

    // Hide suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!locationInput.contains(e.target) && !locationSuggestions.contains(e.target)) {
            hideLocationSuggestions();
        }
    });

    // Show location suggestions
    function showLocationSuggestions(suggestions) {
        if (suggestions.length === 0) {
            hideLocationSuggestions();
            return;
        }

        locationSuggestions.innerHTML = suggestions.map(loc => 
            `<div class="suggestion-item" data-location="${loc}">${loc}</div>`
        ).join('');

        // Add click handlers
        locationSuggestions.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', function() {
                locationInput.value = this.dataset.location;
                hideLocationSuggestions();
            });
        });

        locationSuggestions.style.display = 'block';
    }

    // Hide location suggestions
    function hideLocationSuggestions() {
        locationSuggestions.style.display = 'none';
    }

    // Clear form
    clearBtn.addEventListener('click', function() {
        searchForm.reset();
        hideLocationSuggestions();
        hideSearchResults();
    });

    // Form submission
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleEnhancedSearch(this);
    });

    // Handle enhanced search
    function handleEnhancedSearch(form) {
        const formData = new FormData(form);
        const searchParams = {};
        
        // Collect form data
        for (let [key, value] of formData.entries()) {
            if (value.trim()) {
                searchParams[key] = value;
            }
        }

        // Show loading state
        const searchBtn = form.querySelector('.search-btn');
        const originalText = searchBtn.innerHTML;
        searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Searching...';
        searchBtn.disabled = true;

        // Simulate search delay
        setTimeout(() => {
            // Show search results
            showSearchResults(searchParams);
            
            // Reset button
            searchBtn.innerHTML = originalText;
            searchBtn.disabled = false;
            
            // Show notification
            showNotification('Search completed! Found properties matching your criteria.', 'success');
        }, 1500);
    }

    // Show search results
    function showSearchResults(params) {
        // Mock search results
        const mockResults = [
            {
                price: '$425,000',
                address: '123 Main St, Pahrump, NV',
                bedrooms: 3,
                bathrooms: 2,
                sqft: '1,850',
                type: 'Single Family'
            },
            {
                price: '$675,000',
                address: '456 Oak Ave, Pahrump, NV',
                bedrooms: 4,
                bathrooms: 3,
                sqft: '2,200',
                type: 'Single Family'
            },
            {
                price: '$850,000',
                address: '789 Pine Rd, Pahrump, NV',
                bedrooms: 5,
                bathrooms: 4,
                sqft: '3,100',
                type: 'Single Family'
            }
        ];

        resultsGrid.innerHTML = mockResults.map(property => `
            <div class="result-card">
                <div class="result-image">
                    <i class="fas fa-home fa-3x"></i>
                </div>
                <div class="result-content">
                    <div class="result-price">${property.price}</div>
                    <div class="result-address">${property.address}</div>
                    <div class="result-features">
                        <div class="feature">
                            <i class="fas fa-bed"></i>
                            <span>${property.bedrooms} beds</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-bath"></i>
                            <span>${property.bathrooms} baths</span>
                        </div>
                        <div class="feature">
                            <i class="fas fa-ruler-combined"></i>
                            <span>${property.sqft} sqft</span>
                        </div>
                    </div>
                    <button class="btn btn-primary btn-sm w-100">View Details</button>
                </div>
            </div>
        `).join('');

        searchResults.style.display = 'block';
        searchResults.scrollIntoView({ behavior: 'smooth' });
    }

    // Hide search results
    function hideSearchResults() {
        searchResults.style.display = 'none';
    }
}

// Initialize enhanced search form
document.addEventListener('DOMContentLoaded', initEnhancedSearchForm);

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
                
                // Trigger counter animation for stat items
                if (entry.target.classList.contains('stat-item')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .stat-item, .gallery-item, .search-card');
    animateElements.forEach(el => observer.observe(el));
}

// Animated counter function
function animateCounter(statItem) {
    const counterElement = statItem.querySelector('h3');
    if (!counterElement) return;
    
    const text = counterElement.textContent;
    const number = parseFloat(text.replace(/[^\d.]/g, ''));
    const suffix = text.replace(/[\d.]/g, '');
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentNumber = Math.floor(number * easeOutQuart);
        
        if (suffix.includes('M')) {
            counterElement.textContent = `$${currentNumber.toFixed(1)}M`;
        } else if (suffix.includes('+')) {
            counterElement.textContent = `${currentNumber}+`;
        } else {
            counterElement.textContent = `${currentNumber}${suffix}`;
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
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

// Search overlay functionality
function initSearchOverlay() {
    const searchToggle = document.getElementById('searchToggle');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');
    const searchSubmit = document.getElementById('searchSubmit');
    const suggestionTags = document.querySelectorAll('.suggestion-tag');

    if (!searchToggle || !searchOverlay) return;

    // Open search overlay
    searchToggle.addEventListener('click', function() {
        searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            searchInput.focus();
        }, 300);
    });

    // Close search overlay
    function closeSearchOverlay() {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    searchClose.addEventListener('click', closeSearchOverlay);
    
    // Close on overlay click
    searchOverlay.addEventListener('click', function(e) {
        if (e.target === searchOverlay) {
            closeSearchOverlay();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            closeSearchOverlay();
        }
    });

    // Handle search submission
    searchSubmit.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query) {
            handleSearchQuery(query);
            closeSearchOverlay();
        }
    });

    // Handle enter key in search input
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = this.value.trim();
            if (query) {
                handleSearchQuery(query);
                closeSearchOverlay();
            }
        }
    });

    // Handle suggestion tag clicks
    suggestionTags.forEach(tag => {
        tag.addEventListener('click', function() {
            searchInput.value = this.textContent;
            handleSearchQuery(this.textContent);
            closeSearchOverlay();
        });
    });
}

// Handle search query
function handleSearchQuery(query) {
    showNotification(`Searching for: "${query}"`, 'info');
    
    // Scroll to listings section
    const listingsSection = document.getElementById('listings');
    if (listingsSection) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const offsetTop = listingsSection.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
            top: Math.max(0, offsetTop),
            behavior: 'smooth'
        });
    }
    
    // In a real application, you would send this query to your backend
    console.log('Search query:', query);
}

// Active navigation highlighting
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            
            if (window.scrollY >= (sectionTop - navbarHeight - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Update on scroll
    window.addEventListener('scroll', debounce(updateActiveNav, 100));
    
    // Initial call
    updateActiveNav();
}

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
