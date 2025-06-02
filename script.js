 const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-solid');
            } else {
                navbar.classList.remove('navbar-solid');
            }
        });

        // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobileMenuButton');
        const mobileMenuClose = document.getElementById('mobileMenuClose');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        const mobileMenu = document.getElementById('mobileMenu');

        function toggleMobileMenu() {
            mobileMenuOverlay.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        }

        mobileMenuButton.addEventListener('click', toggleMobileMenu);
        mobileMenuClose.addEventListener('click', toggleMobileMenu);
        mobileMenuOverlay.addEventListener('click', toggleMobileMenu);

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (link.getAttribute('href').startsWith('#')) {
                    toggleMobileMenu();
                }
            });
        });

        // Dark mode toggle
        const darkModeToggle = document.getElementById('darkModeToggle');
        const mobileDarkModeToggle = document.getElementById('mobileDarkModeToggle');
        const darkModeIcon = document.getElementById('darkModeIcon');
        const mobileDarkModeIcon = document.getElementById('mobileDarkModeIcon');

        // Check for saved user preference or use system preference
        let darkMode = localStorage.getItem('darkMode');
        if (darkMode === null) {
            darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        } else {
            darkMode = darkMode === 'true';
        }

        // Apply the current mode
        function applyDarkMode(isDark) {
            if (isDark) {
                document.body.classList.add('dark-mode');
                darkModeIcon.textContent = 'light_mode';
                mobileDarkModeIcon.textContent = 'light_mode';
            } else {
                document.body.classList.remove('dark-mode');
                darkModeIcon.textContent = 'brightness_4';
                mobileDarkModeIcon.textContent = 'brightness_4';
            }
            localStorage.setItem('darkMode', isDark);
        }

        // Initialize
        applyDarkMode(darkMode);

        // Toggle handlers
        function toggleDarkMode() {
            darkMode = !darkMode;
            applyDarkMode(darkMode);
        }

        darkModeToggle.addEventListener('click', toggleDarkMode);
        mobileDarkModeToggle.addEventListener('click', () => {
            toggleDarkMode();
            toggleMobileMenu();
        });

        // Listen for system preference changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (localStorage.getItem('darkMode') === null) {
                applyDarkMode(e.matches);
            }
        });

        // Update current year
        document.getElementById('current-year').textContent = new Date().getFullYear();

        // Filter buttons functionality
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelector('.filter-btn.active').classList.remove('active');
                button.classList.add('active');
                // Here you would add logic to filter the gallery items
            });
        });

        // Loader de página
        const pageLoader = document.getElementById('pageLoader');

        function showLoader() {
            pageLoader.classList.add('active');
        }

        function hideLoader() {
            pageLoader.classList.remove('active');
        }

        // Mostrar loader al cargar
        window.addEventListener('DOMContentLoaded', () => {
            showLoader();

            // Simular carga (remover esto en producción)
            setTimeout(hideLoader, 1500);
        });

        // Ocultar cuando todo esté cargado
        window.addEventListener('load', hideLoader);

        // También ocultar si hay error
        window.addEventListener('error', hideLoader);

        // Efecto de scroll animado para secciones
        function animateOnScroll() {
            const sections = document.querySelectorAll('section:not(#hero)');
            const windowHeight = window.innerHeight;
            const windowTop = window.scrollY + (windowHeight * 0.75); // Activa animación al 75% de la ventana

            sections.forEach(section => {
                const sectionTop = section.offsetTop;

                if (windowTop > sectionTop) {
                    section.classList.add('visible');
                } else {
                    // Opcional: Remover la clase si quieres que se repita la animación
                    // section.classList.remove('visible');
                }
            });
        }

        // Configura el IntersectionObserver para mejor rendimiento
        function setupScrollAnimation() {
            const observerOptions = {
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // observer.unobserve(entry.target); // Descomenta si solo quieres animar una vez
                    }
                });
            }, observerOptions);

            document.querySelectorAll('section:not(#hero)').forEach(section => {
                observer.observe(section);
            });
        }

        // Scroll suave para enlaces internos
        function setupSmoothScrolling() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);

                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80, // Ajuste para el navbar
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }

        // Inicialización
        document.addEventListener('DOMContentLoaded', () => {
            setupScrollAnimation(); // Versión moderna con IntersectionObserver
            setupSmoothScrolling();

            // Opcional: Versión tradicional para navegadores muy antiguos
            window.addEventListener('scroll', animateOnScroll);
            animateOnScroll(); // Ejecutar una vez al cargar
        });

        // Datos de imágenes relacionadas (puedes cargarlos desde una API también)
        const projectsData = {
            "serene-infinity": {
                title: "Serene Infinity",
                description: "Size: 12m x 5m | Features: Vanishing edge, LED lighting",
                images: [
                    "https://res.cloudinary.com/dsfgqyp3d/image/upload/v1748751507/WhatsApp_Image_2025-05-28_at_22.07.59_1_vhhiht.jpg",
                    "https://res.cloudinary.com/dsfgqyp3d/image/upload/v1748751508/WhatsApp_Image_2025-05-28_at_22.07.59_uyll5l.jpg",
                ]
            },
            "lagoon-oasis": {
                title: "Lagoon Oasis",
                description: "Size: Irregular (approx. 150sqm) | Features: Rock waterfall, natural stone",
                images: [
                    "https://res.cloudinary.com/dsfgqyp3d/image/upload/v1748751507/WhatsApp_Image_2025-05-28_at_22.11.36_vmvl0n.jpg",
                    "https://res.cloudinary.com/dsfgqyp3d/image/upload/v1748751335/WhatsApp_Image_2025-05-28_at_22.11.48_cppbqh.jpg",
                    "https://res.cloudinary.com/dsfgqyp3d/image/upload/v1748751335/WhatsApp_Image_2025-05-28_at_22.11.48_2_ezzrks.jpg",
                    "https://res.cloudinary.com/dsfgqyp3d/image/upload/v1748751335/WhatsApp_Image_2025-05-28_at_22.11.48_3_m2blmo.jpg",
                    "https://res.cloudinary.com/dsfgqyp3d/image/upload/v1748822095/Image_2025-05-28_at_22.11.48_4_f3ty40.jpg",
                    "https://res.cloudinary.com/dsfgqyp3d/image/upload/v1748822095/Image_2025-05-28_at_22.11.48_5_iunacc.jpg",
                    "https://res.cloudinary.com/dsfgqyp3d/image/upload/v1748822096/Image_2025-05-28_at_22.11.48_6_f32wqc.jpg",
                    "https://res.cloudinary.com/dsfgqyp3d/image/upload/v1748822096/Image_2025-05-28_at_22.11.47_hug2nf.jpg"
                 ]    
            },
            "urban-lap": {
                title: "Urban Lap Pool",
                description: "Size: 15m x 3m | Features: Swim jets, minimalist design",
                images: [
                    "https://res.cloudinary.com/dsfgqyp3d/image/upload/v1748822955/Image_2025-05-28_at_22.11.33_kytwxk.jpg",
                    "https://res.cloudinary.com/dsfgqyp3d/image/upload/v1748822953/Image_2025-05-28_at_22.11.34_fwdqts.jpg",
                    "https://res.cloudinary.com/dsfgqyp3d/image/upload/v1748822954/Image_2025-05-28_at_22.11.34_1_idgsdr.jpg",
                    "https://res.cloudinary.com/dsfgqyp3d/image/upload/v1748822953/Image_2025-05-28_at_22.11.34_2_t8n9vn.jpg",
                    "https://res.cloudinary.com/dsfgqyp3d/image/upload/v1748822954/Image_2025-05-28_at_22.11.34_3_se3ovu.jpg",
                ]
            }
        };

        class ImageCarousel {
            constructor() {
                this.currentProject = null;
                this.currentSlide = 0;
                this.touchStartX = 0;
                this.touchEndX = 0;

                // Elementos del DOM
                this.elements = {
                    modal: document.getElementById('carouselModal'),
                    closeBtn: document.getElementById('closeCarousel'),
                    slideContainer: document.getElementById('carouselSlide'),
                    title: document.getElementById('carouselTitle'),
                    description: document.getElementById('carouselDescription'),
                    prevBtn: document.getElementById('prevSlide'),
                    nextBtn: document.getElementById('nextSlide')
                };

                // Inicializar eventos
                this.initEvents();
            }

            initEvents() {
                // Abrir carrusel desde la galería
                document.querySelectorAll('.gallery-item-link').forEach(link => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const projectId = link.dataset.project;
                        this.open(projectId);
                    });
                });

                // Controles del carrusel
                this.elements.closeBtn.addEventListener('click', () => this.close());
                this.elements.prevBtn.addEventListener('click', () => this.prev());
                this.elements.nextBtn.addEventListener('click', () => this.next());

                // Cerrar al hacer clic fuera del contenido
                this.elements.modal.addEventListener('click', (e) => {
                    if (e.target === this.elements.modal) {
                        this.close();
                    }
                });

                // Navegación con teclado
                document.addEventListener('keydown', (e) => {
                    if (!this.elements.modal.classList.contains('active')) return;

                    switch (e.key) {
                        case 'Escape':
                            this.close();
                            break;
                        case 'ArrowRight':
                            this.next();
                            break;
                        case 'ArrowLeft':
                            this.prev();
                            break;
                    }
                });

                // Eventos táctiles para dispositivos móviles
                this.elements.slideContainer.addEventListener('touchstart', (e) => {
                    this.touchStartX = e.changedTouches[0].screenX;
                }, { passive: true });

                this.elements.slideContainer.addEventListener('touchend', (e) => {
                    this.touchEndX = e.changedTouches[0].screenX;
                    this.handleSwipe();
                }, { passive: true });
            }

            open(projectId) {
                this.currentProject = projectsData[projectId];
                this.currentSlide = 0;

                if (!this.currentProject) return;

                // Actualizar contenido
                this.elements.title.textContent = this.currentProject.title;
                this.elements.description.textContent = this.currentProject.description;

                // Limpiar y cargar imágenes
                this.elements.slideContainer.innerHTML = '';
                this.currentProject.images.forEach(imgSrc => {
                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.alt = this.currentProject.title;
                    img.loading = 'lazy'; // Carga diferida para mejor rendimiento
                    this.elements.slideContainer.appendChild(img);
                });

                // Mostrar modal
                this.elements.modal.classList.add('active');
                document.body.style.overflow = 'hidden';

                // Posicionar primer slide
                this.updateSlidePosition();
            }

            close() {
                this.elements.modal.classList.remove('active');
                document.body.style.overflow = '';
            }

            updateSlidePosition() {
                this.elements.slideContainer.style.transform = `translateX(-${this.currentSlide * 100}%)`;
            }

            next() {
                if (this.currentSlide < this.currentProject.images.length - 1) {
                    this.currentSlide++;
                } else {
                    this.currentSlide = 0;
                }
                this.updateSlidePosition();
            }

            prev() {
                if (this.currentSlide > 0) {
                    this.currentSlide--;
                } else {
                    this.currentSlide = this.currentProject.images.length - 1;
                }
                this.updateSlidePosition();
            }

            handleSwipe() {
                const threshold = 50; // Mínimo desplazamiento para considerar un swipe

                if (this.touchStartX - this.touchEndX > threshold) {
                    // Swipe izquierda (siguiente)
                    this.next();
                } else if (this.touchEndX - this.touchStartX > threshold) {
                    // Swipe derecha (anterior)
                    this.prev();
                }
            }
        }

        // Inicializar el carrusel cuando el DOM esté listo
        document.addEventListener('DOMContentLoaded', () => {
            const carousel = new ImageCarousel();
        });
