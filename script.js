// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar elementos del DOM
    const filterButtons = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');
    const registerButtons = document.querySelectorAll('.register-btn');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    // Variables para el slider
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;
    
    // Inicializar la página
    initializeApp();
    
    function initializeApp() {
        setupSlider();
        setupNavigation();
        setupEventFiltering();
        setupRegistration();
        setupContactForm();
        setupNewsletterForm();
        setupScrollEffects();
        setupCounterAnimation();
        setupSmoothScrolling();
    }
    
    // ===== SLIDER FUNCTIONALITY =====
    function setupSlider() {
        // Iniciar slider automático
        startSlideShow();
        
        // Event listeners para navegación manual
        prevBtn.addEventListener('click', () => {
            stopSlideShow();
            previousSlide();
            startSlideShow();
        });
        
        nextBtn.addEventListener('click', () => {
            stopSlideShow();
            nextSlide();
            startSlideShow();
        });
        
        // Event listeners para dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopSlideShow();
                goToSlide(index);
                startSlideShow();
            });
        });
        
        // Pausar en hover
        const heroSlider = document.querySelector('.hero-slider');
        heroSlider.addEventListener('mouseenter', stopSlideShow);
        heroSlider.addEventListener('mouseleave', startSlideShow);
    }
    
    function goToSlide(slideIndex) {
        // Remover clase active de slides y dots actuales
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        // Actualizar índice actual
        currentSlide = slideIndex;
        
        // Añadir clase active a nuevos elementos
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        goToSlide(nextIndex);
    }
    
    function previousSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prevIndex);
    }
    
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000); // Cambiar cada 5 segundos
    }
    
    function stopSlideShow() {
        clearInterval(slideInterval);
    }
    
    // ===== NAVIGATION FUNCTIONALITY =====
    function setupNavigation() {
        // Menu toggle para móviles
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
        
        // Cerrar menú al hacer click en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                
                // Actualizar enlace activo
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
        
        // Cerrar menú al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                nav.classList.remove('active');
            }
        });
    }
    
    // ===== SCROLL EFFECTS =====
    function setupScrollEffects() {
        window.addEventListener('scroll', () => {
            // Header scroll effect
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Animaciones al hacer scroll
            animateOnScroll();
        });
    }
    
    function animateOnScroll() {
        const elements = document.querySelectorAll('.stat-item, .event-card, .feature-item, .contact-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate-fade-in-up');
            }
        });
    }
    
    // ===== SMOOTH SCROLLING =====
    function setupSmoothScrolling() {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Ajustar por header fijo
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Smooth scroll para CTA buttons
        const ctaButtons = document.querySelectorAll('.cta-button');
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = button.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // ===== COUNTER ANIMATION =====
    function setupCounterAnimation() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200; // Velocidad de animación
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / speed;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 1);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        };
        
        // Intersection Observer para animar cuando sea visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    if (!counter.classList.contains('animated')) {
                        counter.classList.add('animated');
                        animateCounter(counter);
                    }
                }
            });
        });
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
    
    // ===== EVENT FILTERING =====
    function setupEventFiltering() {
        // Función para filtrar eventos
        function filterEvents(filter) {
            eventCards.forEach(card => {
                const eventType = card.getAttribute('data-type');
                
                if (filter === 'todos' || eventType === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        }
        
        // Event listeners para botones de filtro
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remover clase active de todos los botones
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Añadir clase active al botón clickeado
                this.classList.add('active');
                
                // Obtener el filtro y aplicarlo
                const filter = this.getAttribute('data-filter');
                filterEvents(filter);
                
                // Efecto de vibración
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });
        
        // Inicializar mostrando todos los eventos
        filterEvents('todos');
        
        // Aplicar estilos iniciales para animaciones
        eventCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        });
        
        // Mostrar tarjetas con animación inicial
        setTimeout(() => {
            eventCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 200);
    }
    
    // ===== REGISTRATION FUNCTIONALITY =====
    function setupRegistration() {
        registerButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Añadir efecto de carga
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registrando...';
                this.disabled = true;
                
                setTimeout(() => {
                    // Restaurar botón
                    this.innerHTML = originalText;
                    this.disabled = false;
                    
                    // Obtener información del evento
                    const eventCard = this.closest('.event-card');
                    const eventTitle = eventCard.querySelector('h3').textContent;
                    const eventDate = eventCard.querySelector('.fa-calendar-alt').parentElement.textContent.trim();
                    const eventLocation = eventCard.querySelector('.fa-map-marker-alt').parentElement.textContent.trim();
                    const eventPrice = eventCard.querySelector('.price').textContent;
                    
                    // Mostrar modal de confirmación
                    showRegistrationModal(eventTitle, eventDate, eventLocation, eventPrice);
                }, 1500);
            });
        });
    }
    
    function showRegistrationModal(title, date, location, price) {
        const modal = document.getElementById('registrationModal');
        const modalMessage = document.getElementById('modalMessage');
        
        modalMessage.innerHTML = `
            <strong>Evento:</strong> ${title}<br>
            <strong>Fecha:</strong> ${date}<br>
            <strong>Ubicación:</strong> ${location}<br>
            <strong>Precio:</strong> ${price}<br><br>
            Recibirás un email de confirmación con todos los detalles.
        `;
        
        modal.style.display = 'block';
        
        // Efecto de confeti
        createConfetti();
    }
    
    // ===== CONTACT FORM =====
    function setupContactForm() {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            // Validar formulario
            if (!validateContactForm()) {
                return;
            }
            
            // Mostrar estado de carga
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            // Simular envío
            setTimeout(() => {
                // Restaurar botón
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Limpiar formulario
                this.reset();
                
                // Mostrar modal de confirmación
                showContactModal();
            }, 2000);
        });
    }
    
    function validateContactForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !subject || !message) {
            showNotification('Por favor, completa todos los campos obligatorios.', 'error');
            return false;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Por favor, ingresa un email válido.', 'error');
            return false;
        }
        
        return true;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showContactModal() {
        const modal = document.getElementById('contactModal');
        modal.style.display = 'block';
    }
    
    // ===== NEWSLETTER FORM =====
    function setupNewsletterForm() {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value.trim();
            
            if (!email) {
                showNotification('Por favor, ingresa tu email.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Por favor, ingresa un email válido.', 'error');
                return;
            }
            
            // Simular suscripción
            this.querySelector('input').value = '';
            showNotification('¡Te has suscrito exitosamente a nuestro newsletter!', 'success');
        });
    }
    
    // ===== MODAL FUNCTIONALITY =====
    function setupModals() {
        const modals = document.querySelectorAll('.modal');
        const closeButtons = document.querySelectorAll('.close');
        const modalButtons = document.querySelectorAll('.modal-btn');
        
        // Cerrar modales con X
        closeButtons.forEach(closeBtn => {
            closeBtn.addEventListener('click', function() {
                this.closest('.modal').style.display = 'none';
            });
        });
        
        // Cerrar modales con botones
        modalButtons.forEach(button => {
            button.addEventListener('click', function() {
                this.closest('.modal').style.display = 'none';
            });
        });
        
        // Cerrar modales haciendo click fuera
        modals.forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.style.display = 'none';
                }
            });
        });
    }
    
    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message, type = 'info') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: white;
                    padding: 15px 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    max-width: 400px;
                    transform: translateX(450px);
                    transition: transform 0.3s ease;
                }
                .notification.show {
                    transform: translateX(0);
                }
                .notification-success {
                    border-left: 4px solid #28a745;
                }
                .notification-error {
                    border-left: 4px solid #dc3545;
                }
                .notification-info {
                    border-left: 4px solid #17a2b8;
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    flex: 1;
                }
                .notification-content i {
                    font-size: 1.2rem;
                }
                .notification-success .notification-content i {
                    color: #28a745;
                }
                .notification-error .notification-content i {
                    color: #dc3545;
                }
                .notification-info .notification-content i {
                    color: #17a2b8;
                }
                .notification-close {
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: #6c757d;
                    font-size: 1rem;
                }
                .notification-close:hover {
                    color: #495057;
                }
            `;
            document.head.appendChild(styles);
        }
        
        // Añadir al DOM
        document.body.appendChild(notification);
        
        // Mostrar con animación
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Configurar cierre
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });
        
        // Auto-cerrar después de 5 segundos
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // ===== CONFETTI EFFECT =====
    function createConfetti() {
        const colors = ['#667eea', '#764ba2', '#f5576c', '#4facfe', '#00f2fe'];
        const confettiContainer = document.createElement('div');
        confettiContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(confettiContainer);
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                animation: confetti-fall 3s linear forwards;
                transform-origin: center;
            `;
            confettiContainer.appendChild(confetti);
        }
        
        // Añadir animación CSS si no existe
        if (!document.querySelector('#confetti-styles')) {
            const confettiStyles = document.createElement('style');
            confettiStyles.id = 'confetti-styles';
            confettiStyles.textContent = `
                @keyframes confetti-fall {
                    to {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(confettiStyles);
        }
        
        // Limpiar después de la animación
        setTimeout(() => {
            document.body.removeChild(confettiContainer);
        }, 3000);
    }
    
    // ===== INTERSECTION OBSERVER PARA ANIMACIONES =====
    function setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                }
            });
        }, observerOptions);
        
        // Observar elementos para animación
        const elementsToAnimate = document.querySelectorAll('.event-card, .stat-item, .feature-item, .contact-item');
        elementsToAnimate.forEach(el => observer.observe(el));
    }
    
    // ===== LAZY LOADING DE IMÁGENES =====
    function setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
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
    
    // Inicializar modales y otras funcionalidades
    setupModals();
    setupScrollAnimations();
    setupLazyLoading();
    
    // Manejar cambio de tamaño de ventana
    window.addEventListener('resize', () => {
        // Cerrar menú móvil si se redimensiona a escritorio
        if (window.innerWidth > 768) {
            nav.classList.remove('active');
        }
    });
    
    // Prevenir comportamiento por defecto en algunos elementos
    document.addEventListener('click', (e) => {
        if (e.target.matches('a[href="#"]')) {
            e.preventDefault();
        }
    });
    
    // Mejorar accesibilidad con teclado
    document.addEventListener('keydown', (e) => {
        // Cerrar modales con Escape
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal[style*="block"]');
            if (openModal) {
                openModal.style.display = 'none';
            }
        }
        
        // Cerrar menú móvil con Escape
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
    });
    
    console.log('🎉 EventConnect initialized successfully!');
});