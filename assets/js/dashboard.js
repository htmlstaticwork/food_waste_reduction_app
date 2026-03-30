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

    // 2. Simple Dynamic Stats Simulation
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
