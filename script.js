// ========================
// Smooth Scroll & Navigation
// ========================

document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            }
        });
    });
    
    // ========================
    // Scroll Animations
    // ========================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.section-header, .about-content, .innovation-card, .product-card, .history-content, .split-content'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
    
    // ========================
    // Parallax Effect
    // ========================
    
    window.addEventListener('scroll', () => {
        const parallaxElements = document.querySelectorAll('.parallax-image');
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }
        });
    });
    
    // ========================
    // Form Handling
    // ========================
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                firstName: document.getElementById('firstName').value,
                surname: document.getElementById('surname').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                country: document.getElementById('country').value,
                state: document.getElementById('state').value,
                message: document.getElementById('message').value
            };
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitButton.textContent = 'Message Sent!';
                submitButton.style.background = '#4CAF50';
                
                // Reset form
                setTimeout(() => {
                    contactForm.reset();
                    submitButton.textContent = originalText;
                    submitButton.style.background = '';
                    submitButton.disabled = false;
                }, 2000);
                
                // In production, replace with actual API call:
                // fetch('/api/contact', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(formData)
                // })
                // .then(response => response.json())
                // .then(data => console.log(data))
                // .catch(error => console.error(error));
                
            }, 1500);
        });
    }
    
    // ========================
    // Counter Animation
    // ========================
    
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = counter.textContent.replace(/\D/g, '');
                const suffix = counter.textContent.replace(/[0-9]/g, '');
                let count = 0;
                
                const updateCount = () => {
                    const increment = target / speed;
                    
                    if (count < target) {
                        count += increment;
                        counter.textContent = Math.ceil(count) + suffix;
                        setTimeout(updateCount, 1);
                    } else {
                        counter.textContent = target + suffix;
                    }
                };
                
                updateCount();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
    
    // ========================
    // Product Card Hover Effects
    // ========================
    
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // ========================
    // Lazy Loading Images
    // ========================
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
    
    // ========================
    // Cursor Effect (Optional Luxury Enhancement)
    // ========================
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .custom-cursor {
            width: 20px;
            height: 20px;
            border: 2px solid #D4AF37;
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.2s ease, opacity 0.2s ease;
            opacity: 0;
        }
        
        .custom-cursor.active {
            opacity: 0.6;
        }
        
        .custom-cursor.hover {
            transform: scale(1.5);
            background: rgba(212, 175, 55, 0.2);
        }
    `;
    document.head.appendChild(cursorStyle);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.classList.add('active');
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
    });
    
    // Smooth cursor follow
    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.1;
        cursorY += dy * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .product-card, .innovation-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
    
    // ========================
    // Preloader (Optional)
    // ========================
    
    window.addEventListener('load', () => {
        const preloader = document.createElement('div');
        preloader.className = 'preloader';
        preloader.innerHTML = `
            <div class="preloader-content">
                <h1 style="font-family: 'Cormorant Garamond', serif; color: #D4AF37; font-size: 3rem; letter-spacing: 8px;">SPENDOR</h1>
                <div class="loader"></div>
            </div>
        `;
        
        const preloaderStyle = document.createElement('style');
        preloaderStyle.textContent = `
            .preloader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #0A1628;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                transition: opacity 0.5s ease, visibility 0.5s ease;
            }
            
            .preloader.hide {
                opacity: 0;
                visibility: hidden;
            }
            
            .preloader-content {
                text-align: center;
            }
            
            .loader {
                width: 50px;
                height: 2px;
                background: #D4AF37;
                margin: 30px auto 0;
                animation: loaderAnim 1.5s ease-in-out infinite;
            }
            
            @keyframes loaderAnim {
                0%, 100% { transform: scaleX(0.5); }
                50% { transform: scaleX(1); }
            }
        `;
        
        document.head.appendChild(preloaderStyle);
        document.body.insertBefore(preloader, document.body.firstChild);
        
        setTimeout(() => {
            preloader.classList.add('hide');
            setTimeout(() => preloader.remove(), 500);
        }, 1500);
    });
    
    // ========================
    // Product Filter (Future Enhancement)
    // ========================
    
    // Placeholder for product filtering functionality
    // Can be expanded when product pages are added
    
    console.log('%c🎵 Spendor Audio - Luxury Website Loaded Successfully', 'color: #D4AF37; font-size: 16px; font-weight: bold;');
    console.log('%cExperience the Art of Perfect Sound', 'color: #666; font-size: 12px;');
});

// ========================
// Mobile Menu Styles (Dynamic)
// ========================

if (window.innerWidth <= 992) {
    const mobileMenuStyle = document.createElement('style');
    mobileMenuStyle.textContent = `
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: rgba(10, 22, 40, 0.98);
            backdrop-filter: blur(20px);
            padding: 40px;
            gap: 30px;
            animation: slideDown 0.3s ease;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(mobileMenuStyle);
}

// ========================
// Performance Optimization
// ========================

// Debounce function for scroll events
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

// Apply debounce to scroll handlers
const handleScroll = debounce(() => {
    // Scroll handling code
}, 10);