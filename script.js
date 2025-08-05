document.addEventListener('DOMContentLoaded', function() {
    // Animate on scroll for gallery teaser images
    const galleryTeaserLinks = document.querySelectorAll('.gallery-teaser-link.animate-on-scroll');
    if (galleryTeaserLinks.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.15 });
        galleryTeaserLinks.forEach(link => {
            observer.observe(link);
        });
    }

    // Keyboard accessibility for gallery teaser images
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
    // Animate on scroll for project cards (moved from index.html)
    const projectCards = document.querySelectorAll('.project-card.animate-on-scroll');
    if (projectCards.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.15 });
        projectCards.forEach(card => {
            observer.observe(card);
        });
    }
    // ...existing code...
    const galleryLinks = document.querySelectorAll('.gallery-link');
    const galleryModal = document.getElementById('gallery-modal');
    const galleryModalImg = document.getElementById('gallery-modal-img');
    const galleryModalClose = document.getElementById('gallery-modal-close');
    const galleryModalPrev = document.getElementById('gallery-modal-prev');
    const galleryModalNext = document.getElementById('gallery-modal-next');

    // Array of images and alt text for navigation
    const galleryImages = [
        { src: 'https://ik.imagekit.io/bansoko/Images/IMG-20250714-WA0003.jpg?updatedAt=1752597878323', alt: 'Bananas' },
        { src: 'https://ik.imagekit.io/bansoko/Images/IMG-20250622-WA0017.jpg?updatedAt=1752597866229', alt: 'Farmers Training' },
        { src: 'https://ik.imagekit.io/bansoko/Images/IMG-20250712-WA0007.jpg?updatedAt=1752597870855', alt: 'Banana Ripening Centre' },
        { src: 'https://ik.imagekit.io/bansoko/Images/IMG-20250713-WA0005.jpg?updatedAt=1752597875338', alt: 'Smart Banana Farming' },
        { src: 'https://ik.imagekit.io/bansoko/Images/IMG-20250714-WA0004.jpg?updatedAt=1752597879703', alt: 'Fibre Extraction' },
        { src: 'https://ik.imagekit.io/bansoko/Images/IMG-20250622-WA0002.jpg?updatedAt=1752597858575', alt: 'Ripening Centre' },
        { src: 'https://ik.imagekit.io/bansoko/Images/IMG-20250713-WA0003.jpg?updatedAt=1752597873095', alt: 'Sustainability' },
        { src: 'https://ik.imagekit.io/bansoko/Images/IMG-20250712-WA0008.jpg?updatedAt=1752597871373', alt: 'Hon. Gathoni Wamuchomba' },
        { src: 'https://ik.imagekit.io/bansoko/Images/IMG-20250712-WA0006.jpg?updatedAt=1752597870309', alt: 'Farmers inspecting banana crops' },
        { src: 'https://ik.imagekit.io/bansoko/Images/IMG-20250712-WA0005.jpg?updatedAt=1752597869555', alt: 'Banana processing facility' },
        { src: 'https://ik.imagekit.io/bansoko/Images/IMG-20250712-WA0004.jpg?updatedAt=1752597868462', alt: 'Banana farmer with harvest' },
        { src: 'https://ik.imagekit.io/bansoko/Images/IMG-20250712-WA0003.jpg?updatedAt=1752597867998', alt: 'Youth training program' },
        { src: 'https://ik.imagekit.io/bansoko/Images/IMG-20250622-WA0018.jpg?updatedAt=1752597866529', alt: 'Women entrepreneurs in banana textile production' },
        { src: 'https://ik.imagekit.io/bansoko/Images/IMG-20250622-WA0019.jpg?updatedAt=1752597866505', alt: 'Community meeting on sustainable farming' },
        { src: 'https://ik.imagekit.io/bansoko/Images/IMG-20250622-WA0009.jpg?updatedAt=1752597859014', alt: 'Banana products display' },
        { src: 'https://ik.imagekit.io/bansoko/Images/IMG-20250712-WA0009.jpg?updatedAt=1752597872404', alt: 'Agricultural training session' }
    ];
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
        galleryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const idx = parseInt(this.getAttribute('data-index'));
                showGalleryModal(idx);
            });
        });
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
                
                // Find image index if it exists in gallery array, otherwise use direct source
                const imgIndex = galleryImages.findIndex(img => img.src === imgSrc);
                if (imgIndex >= 0) {
                    showGalleryModal(imgIndex);
                } else {
                    // Direct display for images not in the gallery array
                    galleryModalImg.src = imgSrc;
                    galleryModalImg.alt = imgAlt;
                    galleryModal.style.display = 'flex';
                    
                    // Add loading indicator
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

    // Scroll animation trigger with debounce for performance
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    // Debounce function to limit execution frequency
    function debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll with debounce
    window.addEventListener('scroll', debounce(checkScroll, 15));

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