// dashboard.js - Specific to Dashboard Interactions

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sidebar Mobile Toggle
    const dashboardMenuBtn = document.getElementById('dashboard-menu-btn');
    const sidebar = document.getElementById('dashboard-sidebar');
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    function toggleSidebar() {
        sidebar.classList.toggle('active');
        if (sidebar.classList.contains('active')) {
            overlay.style.display = 'block';
        } else {
            overlay.style.display = 'none';
        }
    }

    if (dashboardMenuBtn && sidebar) {
        dashboardMenuBtn.addEventListener('click', toggleSidebar);
        overlay.addEventListener('click', toggleSidebar);
    }

    // 2. SPA Tab Switching Logic
    const navLinks = document.querySelectorAll('.sidebar-link[id^="nav-"]');
    const contentPanels = document.querySelectorAll('.dashboard-content-panel');

    function switchTab(tabId) {
        // 1. Hide all panels
        contentPanels.forEach(panel => panel.classList.remove('active'));
        
        // 2. Show target panel
        const targetPanel = document.getElementById(`content-${tabId}`);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }

        // 3. Update active link state
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.getElementById(`nav-${tabId}`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // 4. Close sidebar on mobile
        if (window.innerWidth <= 1024) {
            sidebar.classList.remove('active');
            overlay.style.display = 'none';
        }

        // 5. Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = link.id.replace('nav-', '');
            switchTab(tabId);
        });
    });

    // 3. Simple Dynamic Stats Simulation
    const statsElements = document.querySelectorAll('.dynamic-stat');
    
    function animateValue(obj, start, end, duration, prefix = '', suffix = '') {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            obj.innerHTML = `${prefix}${current.toLocaleString()}${suffix}`;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    statsElements.forEach(el => {
        const finalValue = parseInt(el.getAttribute('data-value'));
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        if(!isNaN(finalValue)) {
            animateValue(el, 0, finalValue, 1500, prefix, suffix);
        }
    });

    // 3. Logout action
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Simulate logout delay
            const icon = logoutBtn.querySelector('svg');
            icon.style.opacity = '0.5';
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 500);
        });
    }
});
