document.addEventListener('DOMContentLoaded', function() {
    // Keyboard accessibility for gallery teaser images
    const galleryTeaserLinks = document.querySelectorAll('.gallery-teaser-link.animate-on-scroll');
    if (galleryTeaserLinks.length) {
        galleryTeaserLinks.forEach(link => {
            link.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    link.click();
                }
            });
        });
    }
    // ...existing code...
    const galleryLinks = document.querySelectorAll('.gallery-link');
    const galleryModal = document.getElementById('gallery-modal');
    const galleryModalImg = document.getElementById('gallery-modal-img');
    const galleryModalClose = document.getElementById('gallery-modal-close');
    const galleryModalPrev = document.getElementById('gallery-modal-prev');
    const galleryModalNext = document.getElementById('gallery-modal-next');

    let galleryImages = [];
    let currentIndex = 0;

    function showGalleryModal(index) {
        currentIndex = index;
        galleryModalImg.src = galleryImages[index].src;
        galleryModalImg.alt = galleryImages[index].alt;
        galleryModal.style.display = 'flex';
        
        // Add loading indicator
        galleryModalImg.classList.add('loading');
        galleryModalImg.onload = function() {
            galleryModalImg.classList.remove('loading');
        };
        galleryModalImg.onerror = function() {
            galleryModalImg.classList.remove('loading');
            galleryModalImg.alt = 'Image failed to load';
            console.error('Failed to load image:', galleryImages[index].src);
        };
    }

    if (galleryLinks.length && galleryModal && galleryModalImg && galleryModalClose && galleryModalPrev && galleryModalNext) {
        fetch('gallery-images.json')
            .then(response => response.json())
            .then(data => {
                galleryImages = data;
                galleryLinks.forEach(link => {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        const idx = parseInt(this.getAttribute('data-index'));
                        showGalleryModal(idx);
                    });
                });
            })
            .catch(error => console.error('Error fetching gallery images:', error));

        galleryModalClose.addEventListener('click', function() {
            galleryModal.style.display = 'none';
            galleryModalImg.src = '';
        });
        galleryModal.addEventListener('click', function(e) {
            if (e.target === galleryModal) {
                galleryModal.style.display = 'none';
                galleryModalImg.src = '';
            }
        });
        galleryModalPrev.addEventListener('click', function(e) {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            showGalleryModal(currentIndex);
        });
        galleryModalNext.addEventListener('click', function(e) {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % galleryImages.length;
            showGalleryModal(currentIndex);
        });
        document.addEventListener('keydown', function(e) {
            if (galleryModal.style.display === 'flex') {
                if (e.key === 'ArrowLeft') {
                    galleryModalPrev.click();
                } else if (e.key === 'ArrowRight') {
                    galleryModalNext.click();
                } else if (e.key === 'Escape') {
                    galleryModalClose.click();
                }
            }
        });
    }
    // Gallery teaser modal logic - use the same modal as gallery
    const teaserLinks = document.querySelectorAll('.gallery-teaser-link');

    if (teaserLinks.length && galleryModal && galleryModalImg && galleryModalClose) {
        teaserLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const imgSrc = this.getAttribute('data-img');
                const imgAlt = this.getAttribute('data-alt') || 'Gallery image';
                
                const imgIndex = galleryImages.findIndex(img => img.src === imgSrc);
                if (imgIndex >= 0) {
                    showGalleryModal(imgIndex);
                } else {
                    galleryModalImg.src = imgSrc;
                    galleryModalImg.alt = imgAlt;
                    galleryModal.style.display = 'flex';
                    
                    galleryModalImg.classList.add('loading');
                    galleryModalImg.onload = function() {
                        galleryModalImg.classList.remove('loading');
                    };
                    galleryModalImg.onerror = function() {
                        galleryModalImg.classList.remove('loading');
                        galleryModalImg.alt = 'Image failed to load';
                        console.error('Failed to load image:', imgSrc);
                    };
                }
            });
        });
    }
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('open');
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('open');
                }
            }
        });
    });

    // Scroll animation trigger with IntersectionObserver
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Animated counter for stats - optimized for performance
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    function animateCounter(counter, timestamp, startTime, startValue, endValue, duration) {
        if (!startTime) {
            startTime = timestamp;
            startValue = 0;
        }
        
        // Calculate progress
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Calculate current count value
        const currentValue = Math.floor(startValue + (endValue - startValue) * progress);
        counter.innerText = currentValue;
        
        // Continue animation if not complete
        if (progress < 1) {
            requestAnimationFrame((newTimestamp) => 
                animateCounter(counter, newTimestamp, startTime, startValue, endValue, duration)
            );
        } else {
            counter.innerText = endValue;
        }
    }
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            // Use requestAnimationFrame for smoother animation
            requestAnimationFrame((timestamp) => 
                animateCounter(counter, timestamp, null, 0, target, 1500)
            );
        });
    }
    
    // Start counting when impact section is visible
    const impactSection = document.querySelector('.impact');
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            observer.unobserve(impactSection);
        }
    }, { threshold: 0.5 });
    
    observer.observe(impactSection);

    // Scroll down button
    const scrollDownBtn = document.querySelector('.scroll-down');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Thank you for subscribing!');
            newsletterForm.reset();
        });
    }
});