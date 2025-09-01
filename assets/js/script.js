// JavaScript for Stronghold Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Navbar background on scroll
    const navbar = document.querySelector('nav');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-white/95');
                navbar.classList.remove('bg-white/90');
            } else {
                navbar.classList.add('bg-white/90');
                navbar.classList.remove('bg-white/95');
            }
        });
    }

    // Animated counters for stats
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);

        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        }

        updateCounter();
    }

    // Trigger counter animations when stats section is visible
    const statsSection = document.querySelector('#stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate all counters using data attributes
                    const counterElements = statsSection.querySelectorAll('[data-target]');

                    counterElements.forEach(element => {
                        const target = parseInt(element.getAttribute('data-target'));
                        animateCounter(element, target);
                    });

                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3, rootMargin: '0px 0px -20% 0px' });

        statsObserver.observe(statsSection);
    }    // Form submission handler
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Toast notification system
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-check-circle mr-2"></i>
                <span>${message}</span>
                <button class="ml-4 text-white/80 hover:text-white">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.body.appendChild(toast);

        // Show toast
        setTimeout(() => toast.classList.add('show'), 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 5000);

        // Manual close
        toast.querySelector('button').addEventListener('click', () => {
            toast.classList.remove('show');
            setTimeout(() => document.body.removeChild(toast), 300);
        });
    }

    // Progress bar on scroll
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // Parallax effect for hero section (controlled to prevent overflow)
    const heroSection = document.querySelector('#hero');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = heroSection.querySelector('.absolute.inset-0');
            if (parallax && scrolled <= window.innerHeight) {
                // Limit parallax movement to prevent overflow
                const speed = Math.min(scrolled * 0.3, 100);
                parallax.style.transform = `translateY(${speed}px)`;
            }
        });
    }

    // Add hover effects to project cards
    document.querySelectorAll('.project-card, .bg-gray-50.rounded-2xl').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });

    // Typewriter effect for hero text (optional enhancement)
    function typewriterEffect(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    // Add click effects to buttons
    document.querySelectorAll('button, .bg-red-600, .border-2').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                if (this.contains(ripple)) {
                    this.removeChild(ripple);
                }
            }, 600);
        });
    });

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Image lazy loading (if any images are added later)
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

    // Dark mode toggle (for future enhancement)
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    }

    // Load dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('user-is-tabbing');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('user-is-tabbing');
    });

    // Add focus styles for keyboard navigation
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        .user-is-tabbing *:focus {
            outline: 2px solid #ef4444 !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(focusStyle);

    // Performance optimization: debounce scroll events
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

    // Apply debouncing to scroll events
    window.addEventListener('scroll', debounce(function() {
        // Scroll-based animations can be added here
    }, 10));

    // Add loading animation to external links
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.add('loading');
                setTimeout(() => icon.classList.remove('loading'), 1000);
            }
        });
    });

    // Console easter egg for developers
    console.log(`
    ███████╗████████╗██████╗  ██████╗ ███╗   ██╗ ██████╗ ██╗  ██╗ ██████╗ ██╗     ██████╗
    ██╔════╝╚══██╔══╝██╔══██╗██╔═══██╗████╗  ██║██╔════╝ ██║  ██║██╔═══██╗██║     ██╔══██╗
    ███████╗   ██║   ██████╔╝██║   ██║██╔██╗ ██║██║  ███╗███████║██║   ██║██║     ██║  ██║
    ╚════██║   ██║   ██╔══██╗██║   ██║██║╚██╗██║██║   ██║██╔══██║██║   ██║██║     ██║  ██║
    ███████║   ██║   ██║  ██║╚██████╔╝██║ ╚████║╚██████╔╝██║  ██║╚██████╔╝███████╗██████╔╝
    ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═════╝

    🚀 Welcome to Stronghold's website!
    💻 Interested in joining our development team? Contact us!
    🔧 Built with HTML, Tailwind CSS, and JavaScript
    `);
});

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showToast,
        animateCounter,
        typewriterEffect,
        toggleDarkMode,
        debounce
    };
}
