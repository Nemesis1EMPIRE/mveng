// ===== JAVASCRIPT MODERNE POUR LE MINISTÈRE =====

(function() {
    'use strict';

    // Initialisation au chargement du DOM
    document.addEventListener('DOMContentLoaded', function() {
        
        // === 1. PRELOADER ===
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            window.addEventListener('load', function() {
                setTimeout(function() {
                    preloader.classList.add('hidden');
                }, 500);
            });
        }

        // === 2. ANNÉE DYNAMIQUE DANS LE COPYRIGHT ===
        const yearSpan = document.getElementById('yearCopyright');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }

        // === 3. BOUTON SCROLL TO TOP ===
        function createScrollTopButton() {
            const btn = document.createElement('button');
            btn.innerHTML = '<i class="fa fa-arrow-up"></i>';
            btn.className = 'scroll-top';
            btn.setAttribute('aria-label', 'Retour en haut');
            document.body.appendChild(btn);
            
            window.addEventListener('scroll', function() {
                if (window.scrollY > 300) {
                    btn.classList.add('show');
                } else {
                    btn.classList.remove('show');
                }
            });
            
            btn.addEventListener('click', function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
        createScrollTopButton();

        // === 4. RECHERCHE OVERLAY ===
        const searchLink = document.querySelector('.search-link');
        const searchOverlay = document.querySelector('.search-overlay');
        const closeSearch = document.querySelector('.close-btn');
        const searchInput = document.querySelector('#smallSearch');
        
        if (searchLink && searchOverlay) {
            searchLink.addEventListener('click', function(e) {
                e.preventDefault();
                searchOverlay.classList.add('active');
                if (searchInput) {
                    setTimeout(function() {
                        searchInput.focus();
                    }, 100);
                }
            });
            
            if (closeSearch) {
                closeSearch.addEventListener('click', function() {
                    searchOverlay.classList.remove('active');
                    if (searchInput) {
                        searchInput.value = '';
                    }
                });
            }
            
            // Fermer avec ECHAP
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                    searchOverlay.classList.remove('active');
                    if (searchInput) searchInput.value = '';
                }
            });
        }

        // === 5. NAVIGATION MOBILE : FERMETURE AUTO ===
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const navLinks = document.querySelectorAll('.navbar-nav a:not(.dropdown-toggle)');
        
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                if (window.innerWidth < 768 && navbarCollapse) {
                    $(navbarCollapse).collapse('hide');
                }
            });
        });

        // === 6. CARROUSEL AUTO (si présent) ===
        const carousel = document.querySelector('#slider');
        if (carousel && typeof $ !== 'undefined') {
            $('#slider').carousel({
                interval: 5000,
                pause: 'hover'
            });
        }

        // === 7. GESTION DES DROPDOWNS AU SURVOL (Desktop) ===
        function handleDropdownsOnHover() {
            if (window.innerWidth >= 768) {
                $('.dropdown').on('mouseenter', function() {
                    $(this).addClass('open');
                }).on('mouseleave', function() {
                    $(this).removeClass('open');
                });
            } else {
                $('.dropdown').off('mouseenter mouseleave');
            }
        }
        
        handleDropdownsOnHover();
        window.addEventListener('resize', handleDropdownsOnHover);

        // === 8. ANIMATION AU SCROLL DES ÉLÉMENTS ===
        const animatedElements = document.querySelectorAll('.item, .item-timeline');
        
        function checkVisibility() {
            animatedElements.forEach(function(el) {
                const rect = el.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                if (rect.top < windowHeight - 100) {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }
            });
        }
        
        // Initial styles
        animatedElements.forEach(function(el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        window.addEventListener('scroll', checkVisibility);
        window.addEventListener('load', checkVisibility);
        checkVisibility();

        // === 9. CHARGEMENT PLUS D'ACTUALITÉS (simulation) ===
        const loadMoreBtn = document.getElementById('load-more');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', function(e) {
                // Simulation - dans un vrai site, ce serait un appel AJAX
                e.preventDefault();
                const originalText = loadMoreBtn.textContent;
                loadMoreBtn.textContent = 'Chargement...';
                loadMoreBtn.disabled = true;
                
                setTimeout(function() {
                    window.location.href = loadMoreBtn.getAttribute('href');
                }, 500);
            });
        }

        // === 10. LIENS EXTERNES : OUVERTURE SECURISEE ===
        const externalLinks = document.querySelectorAll('a[target="_blank"]');
        externalLinks.forEach(function(link) {
            link.setAttribute('rel', 'noopener noreferrer');
        });

        // === 11. HEADER STICKY OPTIONNEL ===
        let header = document.querySelector('.banner');
        let menu = document.querySelector('.nav-container');
        let lastScroll = 0;
        
        if (header && menu) {
            window.addEventListener('scroll', function() {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > 100) {
                    menu.style.position = 'sticky';
                    menu.style.top = '0';
                    menu.style.zIndex = '1000';
                    
                    if (currentScroll > lastScroll && currentScroll > 200) {
                        // Scroll down - hide menu
                        menu.style.transform = 'translateY(-100%)';
                    } else {
                        // Scroll up - show menu
                        menu.style.transform = 'translateY(0)';
                    }
                } else {
                    menu.style.position = 'relative';
                    menu.style.transform = 'translateY(0)';
                }
                
                lastScroll = currentScroll;
            });
        }

        // === 12. AMÉLIORATION ACCESSIBILITÉ ===
        // Ajout aria-current pour la page active
        const currentPath = window.location.pathname;
        const allNavLinks = document.querySelectorAll('.navbar-nav a');
        
        allNavLinks.forEach(function(link) {
            const linkPath = link.getAttribute('href');
            if (linkPath && linkPath !== '#' && linkPath !== '/' && currentPath.includes(linkPath)) {
                link.setAttribute('aria-current', 'page');
                link.closest('li')?.classList.add('active');
            }
        });
        
        // Gestion des sous-menus pour lecteurs d'écran
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        dropdownToggles.forEach(function(toggle) {
            toggle.setAttribute('aria-haspopup', 'true');
            toggle.setAttribute('aria-expanded', 'false');
            
            toggle.addEventListener('click', function(e) {
                const expanded = this.getAttribute('aria-expanded') === 'true' ? false : true;
                this.setAttribute('aria-expanded', expanded);
            });
        });

        // === 13. CONSOLE FRIENDLY (pas de logs en prod) ===
        if (window.location.hostname !== 'localhost' && !window.location.href.includes('staging')) {
            console.log = function() {};
        }

        // === 14. DÉTECTION CONNEXION INTERNET ===
        window.addEventListener('online', function() {
            showNotification('Connexion rétablie', 'success');
        });
        
        window.addEventListener('offline', function() {
            showNotification('Connexion perdue. Vérifiez votre réseau.', 'error');
        });
        
        function showNotification(message, type) {
            const notif = document.createElement('div');
            notif.textContent = message;
            notif.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 20px;
                padding: 12px 20px;
                background-color: ${type === 'success' ? '#28a745' : '#dc3545'};
                color: white;
                border-radius: 8px;
                z-index: 10000;
                animation: slideIn 0.3s ease;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            `;
            document.body.appendChild(notif);
            
            setTimeout(function() {
                notif.style.animation = 'slideOut 0.3s ease';
                setTimeout(function() {
                    notif.remove();
                }, 300);
            }, 3000);
        }
        
        // Ajout des animations CSS pour les notifications
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(-100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(-100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    });
    
})();

// Support jQuery pour Bootstrap (si nécessaire)
if (typeof $ !== 'undefined') {
    $(document).ready(function() {
        // Activation des tooltips si présents
        $('[data-toggle="tooltip"]').tooltip();
        
        // Activation des popovers
        $('[data-toggle="popover"]').popover();
        
        // Smooth scroll pour les ancres
        $('a[href*="#"]:not([href="#"])').on('click', function() {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') 
                && location.hostname === this.hostname) {
                let target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top - 70
                    }, 800);
                    return false;
                }
            }
        });
    });
}
