document.addEventListener('DOMContentLoaded', () => {

    // 1. MENÚ MÓVIL (Manipulación del DOM y Eventos)
    const btnMenu = document.querySelector('.icono-menu');
    const navMenu = document.querySelector('.nav-desktop'); 
    const enlacesMenu = document.querySelectorAll('.nav-desktop a'); // Seleccionamos todos los enlaces

    if (btnMenu && navMenu) {
        // Abrir/cerrar al tocar la hamburguesa
        btnMenu.addEventListener('click', () => {
            navMenu.classList.toggle('menu-abierto');
        });

        // Cerrar el menú automáticamente al tocar cualquier enlace
        enlacesMenu.forEach(enlace => {
            enlace.addEventListener('click', () => {
                navMenu.classList.remove('menu-abierto');
            });
        });
    }

    // 2. CABECERA 
    const cabecera = document.querySelector('.cabecera');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            // Si el usuario baja, fijamos la cabecera
            cabecera.classList.add('cabecera-scrolled');
        } else {
            // Si vuelve arriba, vuelve a ser transparente
            cabecera.classList.remove('cabecera-scrolled');
        }
    });

    // 3. ANIMACIONES SCROLL
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Se activa cuando el 15% del elemento es visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añade la clase que dispara la animación CSS
                entry.target.classList.add('visible');
                // Dejamos de observarlo para que no se repita la animación
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Seleccionamos las tarjetas, los pasos y el bento grid para animarlos
    const elementosAnimar = document.querySelectorAll('.servicio-card, .timeline__paso, .bento-item, .portfolio-card');
    elementosAnimar.forEach(el => {
        el.classList.add('fade-in'); // Preparamos el elemento ocultándolo
        observer.observe(el);
    });

    // 4. ACORDEONES EXCLUSIVOS (Lógica algorítmica)
    const acordeones = document.querySelectorAll('.capsula-desplegable');
    
    acordeones.forEach(acordeon => {
        acordeon.addEventListener('toggle', (e) => {
            if (acordeon.open) {
                // Si abrimos uno, cerramos todos los demás
                acordeones.forEach(otroAcordeon => {
                    if (otroAcordeon !== acordeon && otroAcordeon.open) {
                        otroAcordeon.open = false;
                    }
                });
            }
        });
    });

    // 5. FORMULARIO DE CONTACTO (Consumo de API con Fetch / Async-Await)
    const formContacto = document.getElementById('formulario-contacto');
    const msjEstado = document.getElementById('form-status');

    if(formContacto) {
        formContacto.addEventListener('submit', async (e) => {
            e.preventDefault(); // Evitamos que la página se recargue
            
            const btnSubmit = formContacto.querySelector('button');
            const textoOriginal = btnSubmit.innerHTML;
            
            // Estado de carga
            btnSubmit.innerHTML = 'ENVIANDO...';
            btnSubmit.disabled = true;

            const formData = new FormData(formContacto);
            
            try {
                // Aquí conectarías con Formspree u otra API de correo
                const response = await fetch('https://formspree.io/f/TU_ENDPOINT_AQUI', {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    msjEstado.textContent = "¡Mensaje enviado con éxito! Hablamos pronto.";
                    msjEstado.className = "status-success";
                    formContacto.reset(); // Vaciamos el formulario
                } else {
                    throw new Error('Error en la API');
                }
            } catch (error) {
                msjEstado.textContent = "Hubo un error al enviar el mensaje. Inténtalo de nuevo.";
                msjEstado.className = "status-error";
            } finally {
                // Restauramos el botón
                btnSubmit.innerHTML = textoOriginal;
                btnSubmit.disabled = false;
            }
        });
    }
    // 6. BOTTOM SHEET DE CONTACTO
    const btnAbrirContacto = document.getElementById('btn-abrir-contacto');
    const btnCerrarContacto = document.getElementById('btn-cerrar-contacto');
    const overlayContacto = document.getElementById('contacto-overlay');
    const sheetContacto = document.getElementById('contacto-sheet');

    function toggleContacto() {
        if (overlayContacto && sheetContacto) {
            overlayContacto.classList.toggle('activo');
            sheetContacto.classList.toggle('activo');
        }
    }

    if (btnAbrirContacto) btnAbrirContacto.addEventListener('click', toggleContacto);
    if (btnCerrarContacto) btnCerrarContacto.addEventListener('click', toggleContacto);
    if (overlayContacto) overlayContacto.addEventListener('click', toggleContacto);
});