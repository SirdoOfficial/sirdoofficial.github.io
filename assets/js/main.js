// ======= Main JavaScript File =======
// School It Research & Development Organization

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('SIRDO Website Initialized');
    
    // Initialize all functionality
    initPreloader();
    initMobileNavigation();
    initScrollToTop();
    initTypedAnimation();
    initAOS();
    initSmoothScrolling();
    initCounterAnimation();
    initImageLoading();
    initViewAllButtons();
    initAboutSection();
    initCardHoverEffects();
    initReadMoreButtons();
    initSocialLinks();
    initTeamInteractions();
    initHeaderScrollEffect();
});

// ======= Preloader =======
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.classList.add('fade-out');
                setTimeout(function() {
                    preloader.style.display = 'none';
                }, 500);
            }, 1000);
        });
    }
}

// ======= Mobile Navigation =======
function initMobileNavigation() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('#navmenu ul');
    
    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', function(e) {
            e.preventDefault();
            navMenu.classList.toggle('active');
            mobileNavToggle.classList.toggle('bi-list');
            mobileNavToggle.classList.toggle('bi-x');
            
            // Prevent body scroll when mobile menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('#navmenu ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileNavToggle.classList.add('bi-list');
                    mobileNavToggle.classList.remove('bi-x');
                    document.body.style.overflow = '';
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('#navmenu') && !e.target.closest('.mobile-nav-toggle')) {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileNavToggle.classList.add('bi-list');
                    mobileNavToggle.classList.remove('bi-x');
                    document.body.style.overflow = '';
                }
            }
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileNavToggle.classList.add('bi-list');
                mobileNavToggle.classList.remove('bi-x');
                document.body.style.overflow = '';
            }
        });
    }
}

// ======= Scroll to Top =======
function initScrollToTop() {
    const scrollTop = document.getElementById('scroll-top');
    
    if (scrollTop) {
        // Show/hide scroll to top button
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                scrollTop.classList.add('active');
            } else {
                scrollTop.classList.remove('active');
            }
        });

        // Smooth scroll to top
        scrollTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ======= Typed.js Animation =======
function initTypedAnimation() {
    const typedElements = document.querySelectorAll('.typed');
    
    typedElements.forEach(element => {
        const typedItems = element.getAttribute('data-typed-items');
        if (typedItems) {
            const items = typedItems.split(',');
            try {
                new Typed(element, {
                    strings: items,
                    typeSpeed: 50,
                    backSpeed: 30,
                    backDelay: 2000,
                    loop: true,
                    showCursor: true,
                    cursorChar: '|',
                    smartBackspace: true
                });
            } catch (error) {
                console.log('Typed.js not loaded, using fallback');
                // Fallback: Simple text rotation
                let currentIndex = 0;
                setInterval(() => {
                    element.textContent = items[currentIndex];
                    currentIndex = (currentIndex + 1) % items.length;
                }, 3000);
            }
        }
    });
}

// ======= AOS Animation =======
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            offset: 100,
            delay: 0
        });
        
        // Refresh AOS after images load
        window.addEventListener('load', () => {
            AOS.refresh();
        });
    } else {
        console.log('AOS not loaded, using fallback animations');
        initFallbackAnimations();
    }
}

// Fallback animations if AOS fails to load
function initFallbackAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.8s ease';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });
}

// ======= Smooth Scrolling =======
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                history.pushState(null, null, href);
            }
        });
    });
}

// ======= Counter Animation =======
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count')) || 0;
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        counter.textContent = Math.floor(current);
                    }, 16);
                    
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
}

// ======= Image Loading =======
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading animation for images
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.classList.add('loaded');
        });
        
        // Set initial opacity for fade-in effect
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // If image is already loaded (cached)
        if (img.complete) {
            img.style.opacity = '1';
            img.classList.add('loaded');
        }
        
        // Add error handling
        img.addEventListener('error', function() {
            console.log('Image failed to load:', this.src);
            this.style.opacity = '1';
            this.alt = 'Image not available';
        });
    });
}

// ======= View All Buttons =======
function initViewAllButtons() {
    const viewAllBtns = document.querySelectorAll('.view-all-btn, .view-team-btn');
    
    viewAllBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Only prevent default for demo purposes if href is # or doesn't exist
            if (!this.getAttribute('href') || this.getAttribute('href') === '#') {
                e.preventDefault();
                
                const section = this.closest('section');
                let sectionName = 'Content';
                
                if (section) {
                    const header = section.querySelector('.section-header h1');
                    if (header) {
                        sectionName = header.textContent;
                    }
                }
                
                // Show loading state
                const originalText = this.textContent;
                this.textContent = 'Redirecting...';
                this.style.opacity = '0.7';
                
                setTimeout(() => {
                    // Simulate page navigation
                    console.log(`Navigating to ${sectionName} page`);
                    
                    // Show success message
                    this.textContent = 'Redirected!';
                    this.style.background = 'var(--accent-orange)';
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.opacity = '1';
                        this.style.background = '';
                    }, 1500);
                    
                }, 1000);
            }
        });
    });
}

// ======= About Section =======
function initAboutSection() {
    const aboutSection = document.querySelector('.about-container');
    if (aboutSection) {
        fixAboutSectionLayout();
        initAboutButton();
        initAboutAnimations();
    }
}

function fixAboutSectionLayout() {
    const aboutContent = document.querySelector('.about-content');
    const profileSection = document.querySelector('.profile-section');
    const aboutTextSection = document.querySelector('.about-section');
    
    if (aboutContent && profileSection && aboutTextSection) {
        // Ensure equal height for both sections
        const updateHeights = () => {
            if (window.innerWidth <= 768) {
                aboutContent.style.minHeight = 'auto';
            } else {
                const maxHeight = Math.max(profileSection.offsetHeight, aboutTextSection.offsetHeight);
                aboutContent.style.minHeight = maxHeight + 'px';
            }
        };
        
        updateHeights();
        window.addEventListener('resize', debounce(updateHeights, 250));
    }
}

function initAboutButton() {
    const detailsBtn = document.querySelector('.details-btn');
    if (detailsBtn) {
        detailsBtn.addEventListener('click', function(e) {
            if (!this.getAttribute('href') || this.getAttribute('href') === '#') {
                e.preventDefault();
                
                // Show loading state
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                this.style.opacity = '0.7';
                
                setTimeout(() => {
                    // Simulate page load
                    console.log('Navigating to About page');
                    
                    // Show success feedback
                    this.textContent = 'Success!';
                    this.style.background = 'var(--accent-orange)';
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.opacity = '1';
                        this.style.background = '';
                        
                        // In real implementation, redirect to about.html
                        // window.location.href = 'about.html';
                    }, 1000);
                    
                }, 800);
            }
        });
    }
}

function initAboutAnimations() {
    // Force AOS to refresh for about section
    if (typeof AOS !== 'undefined') {
        setTimeout(() => {
            AOS.refresh();
        }, 100);
    }
    
    // Add backup animation system
    const aboutElements = document.querySelectorAll('.about-container [data-aos]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.8s ease';
                
                // Add delay for staggered animation
                if (entry.target.classList.contains('about-section')) {
                    entry.target.style.transitionDelay = '0.2s';
                }
            }
        });
    }, { threshold: 0.2 });
    
    aboutElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });
}

// ======= Card Hover Effects =======
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.program-card, .project-card, .course-card, .blog-card, .team-member');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click effects
        card.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-8px) scale(0.98)';
        });
        
        card.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
    });
}

// ======= Read More Buttons =======
function initReadMoreButtons() {
    const readMoreBtns = document.querySelectorAll('.read-more-btn, .learn-more-btn');
    
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Only prevent default for demo purposes
            if (!this.getAttribute('href') || this.getAttribute('href') === '#') {
                e.preventDefault();
                
                // Get the card content
                const card = this.closest('.program-card, .project-card, .course-card, .blog-card');
                let title = 'More Information';
                
                if (card) {
                    const titleElement = card.querySelector('h2, h3');
                    if (titleElement) {
                        title = titleElement.textContent;
                    }
                }
                
                // Show loading state
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                this.style.opacity = '0.7';
                
                setTimeout(() => {
                    // Simulate content loading
                    console.log(`Loading details for: ${title}`);
                    
                    // Show success feedback
                    this.textContent = 'Loaded!';
                    this.style.background = 'var(--accent-orange)';
                    this.style.borderColor = 'var(--accent-orange)';
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.opacity = '1';
                        this.style.background = '';
                        this.style.borderColor = '';
                    }, 1000);
                    
                }, 600);
            }
        });
    });
}

// ======= Social Media Links =======
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-icon, .social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                const platform = this.getAttribute('aria-label') || 'social media';
                
                // Show feedback
                const originalBg = this.style.background;
                this.style.background = 'var(--accent-orange)';
                
                setTimeout(() => {
                    this.style.background = originalBg;
                }, 300);
                
                console.log(`Opening ${platform} page`);
            }
        });
    });
}

// ======= Team Member Interactions =======
function initTeamInteractions() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('click', function(e) {
            if (!e.target.closest('.social-icons')) {
                const name = this.querySelector('.team-info h2')?.textContent || 'Team Member';
                const role = this.querySelector('.team-info p')?.textContent || 'Role';
                
                // Create modal-like effect
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
                
                console.log(`Team Member: ${name}, Role: ${role}`);
            }
        });
        
        // Add keyboard accessibility
        member.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// ======= Header Scroll Effect =======
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', throttle(function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, 100));
    }
}

// ======= Utility Functions =======

// Debounce function for scroll events
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ======= Performance Optimization =======
// Optimized scroll event
window.addEventListener('scroll', throttle(function() {
    // Scroll-related calculations
}, 100));

// Optimized resize event
window.addEventListener('resize', debounce(function() {
    // Re-fix layouts on resize
    fixAboutSectionLayout();
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}, 250));

// ======= Error Handling =======
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// ======= Initialize All Interactive Elements =======
function initializeAllInteractiveElements() {
    // Add click effects to all interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .program-card, .project-card, .course-card, .blog-card, .team-member');
    
    interactiveElements.forEach(element => {
        element.style.cursor = 'pointer';
        element.setAttribute('tabindex', '0'); // Make focusable
        
        element.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Add focus styles for accessibility
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-blue)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
        });
    });
}

// Initialize interactive elements
document.addEventListener('DOMContentLoaded', initializeAllInteractiveElements);

// ======= Fix for Project Section Typo =======
function fixProjectSectionTypo() {
    // Fix any remaining typos in class names
    const projectCards = document.querySelectorAll('.Project-card');
    projectCards.forEach(card => {
        card.classList.add('project-card');
    });
    
    const projectContainers = document.querySelectorAll('.Project-container');
    projectContainers.forEach(container => {
        container.classList.add('project-container');
    });
    
    const projectSections = document.querySelectorAll('.Project-section');
    projectSections.forEach(section => {
        section.classList.add('project-section');
    });
}

// Apply fixes
document.addEventListener('DOMContentLoaded', fixProjectSectionTypo);

// ======= Export for Module Usage =======
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initPreloader,
        initMobileNavigation,
        initScrollToTop,
        initTypedAnimation,
        initAOS,
        initSmoothScrolling,
        initCounterAnimation,
        initViewAllButtons,
        initAboutSection,
        debounce,
        throttle
    };
}

console.log('SIRDO Main JS Loaded Successfully');