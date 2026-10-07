// ==========================================================================
//  PORTFOLIO SCRIPT — Rakshitha KB
//  Handles: Theme toggle, Hamburger / Mobile Nav, Form submission
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // -------------------------------------------------------------------------
    // THEME TOGGLE
    // -------------------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Check saved user theme preference or system preference
    const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');

    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateToggleIcon('dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        updateToggleIcon('light');
    }

    themeToggleBtn.addEventListener('click', () => {
        const activeTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = activeTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleIcon(newTheme);
    });

    // Listen for OS/browser default theme changes when user hasn't manually overridden
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const systemTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', systemTheme);
            updateToggleIcon(systemTheme);
        }
    });

    function updateToggleIcon(theme) {
        if (!themeToggleBtn) return;
        const isDark = theme === 'dark';
        const iconSpan = themeToggleBtn.querySelector('.theme-icon, .pixel-toggle-icon');
        const textSpan = themeToggleBtn.querySelector('.theme-text, .pixel-toggle-text');

        if (iconSpan && textSpan) {
            iconSpan.textContent = isDark ? '☀️' : '🌙';
            textSpan.textContent = isDark ? 'LIGHT MODE' : 'NIGHT MODE';
        } else {
            themeToggleBtn.innerHTML = isDark ? '☀️' : '🌙';
        }

        themeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to night mode');
        themeToggleBtn.title = isDark ? 'Switch to light mode' : 'Switch to night mode';
    }

    // -------------------------------------------------------------------------
    // HAMBURGER / MOBILE NAV
    // -------------------------------------------------------------------------
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinks     = document.getElementById('nav-links');
    const navOverlay   = document.getElementById('nav-overlay');

    function openNav() {
        navLinks.classList.add('nav-open');
        navOverlay.classList.add('overlay-visible');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
        hamburgerBtn.setAttribute('aria-label', 'Close navigation menu');
        document.body.style.overflow = 'hidden'; // prevent background scroll
    }

    function closeNav() {
        navLinks.classList.remove('nav-open');
        navOverlay.classList.remove('overlay-visible');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        hamburgerBtn.setAttribute('aria-label', 'Open navigation menu');
        document.body.style.overflow = '';
    }

    function toggleNav() {
        const isOpen = hamburgerBtn.getAttribute('aria-expanded') === 'true';
        isOpen ? closeNav() : openNav();
    }

    if (hamburgerBtn && navLinks && navOverlay) {
        hamburgerBtn.addEventListener('click', toggleNav);

        // Close when overlay (backdrop) is clicked
        navOverlay.addEventListener('click', closeNav);

        // Close when any nav link is clicked (smooth-scroll then close)
        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                // Small delay so the smooth-scroll animation starts before the drawer closes
                setTimeout(closeNav, 80);
            });
        });

        // Close nav on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && hamburgerBtn.getAttribute('aria-expanded') === 'true') {
                closeNav();
                hamburgerBtn.focus(); // return focus for accessibility
            }
        });

        // Reset state on resize back to desktop (so nav isn't accidentally stuck closed)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) {
                closeNav();
            }
        });
    }

    // -------------------------------------------------------------------------
    // CONTACT FORM HANDLER
    // -------------------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for reaching out, Rakshitha has received your message note!');
            contactForm.reset();
        });
    }

});
