// main.js - Core functionality for all pages

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Change icon
            if (navMenu.classList.contains('active')) {
                mobileToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
            } else {
                mobileToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
            }
        });
    }

    // 2. Dark Mode Toggle
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('fwra_theme');
    if (savedTheme === 'dark') {
        htmlElement.classList.add('dark-mode');
    } else if (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        htmlElement.classList.add('dark-mode');
    }

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            htmlElement.classList.toggle('dark-mode');
            const isDark = htmlElement.classList.contains('dark-mode');
            localStorage.setItem('fwra_theme', isDark ? 'dark' : 'light');
            updateThemeIcons(isDark);
        });
    });

    function updateThemeIcons(isDark) {
        const icons = document.querySelectorAll('.theme-icon-path');
        icons.forEach(icon => {
            if (isDark) {
                // Sun Icon for dark mode
                icon.setAttribute('d', 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z');
            } else {
                // Moon Icon for light mode
                icon.setAttribute('d', 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z');
            }
        });
    }
    // Set initial icon
    updateThemeIcons(htmlElement.classList.contains('dark-mode'));

    // 3. RTL Toggle
    const rtlToggles = document.querySelectorAll('.rtl-toggle');
    
    const savedRTL = localStorage.getItem('fwra_rtl');
    if (savedRTL === 'true') {
        htmlElement.setAttribute('dir', 'rtl');
    }

    rtlToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const isRTL = htmlElement.getAttribute('dir') === 'rtl';
            if (isRTL) {
                htmlElement.setAttribute('dir', 'ltr');
                localStorage.setItem('fwra_rtl', 'false');
            } else {
                htmlElement.setAttribute('dir', 'rtl');
                localStorage.setItem('fwra_rtl', 'true');
            }
        });
    });

    // 4. Password Eye Icon Toggle
    const eyeIcons = document.querySelectorAll('.eye-icon');
    eyeIcons.forEach(eye => {
        eye.addEventListener('click', (e) => {
            const input = e.target.previousElementSibling;
            if (input && input.type === 'password') {
                input.type = 'text';
                // Update SVG to eye-off
                e.target.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
            } else if (input && input.type === 'text') {
                input.type = 'password';
                // Update SVG to eye
                e.target.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
            }
        });
    });
});
