document.addEventListener('DOMContentLoaded', function() {

    // === SMOOTH SCROLL PARA ÂNCORAS INTERNAS ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.length > 1 && href.startsWith("#") && document.querySelector(href)) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                let headerOffset = 0;
                const headerElement = document.getElementById('main-header');
                if (headerElement) {
                    headerOffset = headerElement.offsetHeight;
                }
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                const nav = document.querySelector('#main-header nav');
                const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
                if (nav && nav.classList.contains('active') && this.closest('nav')) {
                    nav.classList.remove('active');
                    if (mobileMenuToggle) {
                       mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
            }
        });
    });

    // === HEADER SCROLL EFFECT & ACTIVE LINK ===
    const header = document.getElementById('main-header');
    const navLinks = document.querySelectorAll('#main-header nav a');
    const sections = Array.from(document.querySelectorAll('section[id], .hero-section[id]'));

    function changeHeaderOnScroll() {
        if (header) {
            if (window.scrollY > 50) {
                header.style.backgroundColor = 'rgba(10, 10, 10, 0.9)';
            } else {
                header.style.backgroundColor = 'rgba(18, 18, 18, 0.9)';
            }
        }
        
        let currentSectionId = sections.length > 0 ? sections[0].id : "inicio";
        const headerHeight = header ? header.offsetHeight + 20 : 20;

        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            const sectionTop = section.offsetTop - headerHeight;
            if (window.pageYOffset >= sectionTop) {
                currentSectionId = section.id;
                break;
            }
        }
        if (window.pageYOffset < (sections.length > 0 ? sections[0].offsetTop - headerHeight : 200) ) {
             currentSectionId = "inicio";
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', changeHeaderOnScroll);
    changeHeaderOnScroll();
    setTimeout(changeHeaderOnScroll, 100);


    // === MOBILE MENU TOGGLE ===
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const nav = document.querySelector('#main-header nav');

    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            if (nav.classList.contains('active')) {
                mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }


    // === SCROLL REVEAL ANIMATIONS (REMOVIDO) ===
    // Todo o bloco if (typeof ScrollReveal !== 'undefined') { ... } foi removido.


    // === SERVICE MODALS ===
    const modalTriggers = document.querySelectorAll('.service-modal-trigger');
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.dataset.modalTarget;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const closeButtons = document.querySelectorAll('.modal .close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    window.addEventListener('click', (event) => {
        document.querySelectorAll('.modal').forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });


    // === CURRENT YEAR FOR FOOTER ===
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

});
document.addEventListener("DOMContentLoaded", function() {

    // Seu código JavaScript existente pode vir aqui (se houver)
    // Exemplo: Código para o menu mobile, modais, etc.

    // Código para o ano atual no rodapé (parece que você já tem isso ou planeja)
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- CÓDIGO PARA O EFEITO FADE-IN ---
    const fadeElements = document.querySelectorAll('.fade-in-element');

    if (fadeElements.length > 0) { // Verifica se existem elementos para observar
        const observerOptions = {
            root: null, // Observa em relação ao viewport
            rootMargin: '0px', // Sem margens adicionais
            threshold: 0.1 // 10% do elemento precisa estar visível para disparar
                           // Ajuste este valor (0.0 a 1.0) conforme sua preferência
                           // 0.01 = assim que 1 pixel entrar na tela
                           // 0.25 = 25% visível
                           // 1.0 = somente quando 100% do elemento estiver visível
        };

        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observerInstance.unobserve(entry.target); // Para de observar o elemento após ele se tornar visível
                }
            });
        }, observerOptions);

        fadeElements.forEach(element => {
            observer.observe(element);
        });
    }
    // --- FIM DO CÓDIGO FADE-IN ---


    // Seu código JavaScript existente para modais, menu mobile, etc. pode continuar aqui
    // Exemplo de código para modal (adapte ao seu código existente se já tiver um)
    const modalTriggers = document.querySelectorAll('.service-modal-trigger');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-button');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.dataset.modalTarget;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'flex'; // ou 'block', dependendo do seu CSS de modal
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    window.addEventListener('click', function(event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Código para o menu mobile (adapte ao seu código existente se já tiver um)
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const nav = document.querySelector('#main-header nav');

    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', () => {
            nav.classList.toggle('active'); // Você precisará de CSS para a classe .active no menu
        });
    }

});