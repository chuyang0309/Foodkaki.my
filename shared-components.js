// Shared Header & Footer JavaScript
function initSharedComponents() {
    const headerHTML = `
    <div class="site-header-container">
        <!-- Logo -->
        <a href="home.html" class="site-logo">
            <img src="imageshome/foodkaki-logo.png" alt="Food Kaki Logo">
        </a>

        <!-- Navigation -->
        <nav class="site-nav">
            <a href="home.html" class="site-nav-link">Home</a>
            <a href="foodList.html" class="site-nav-link">Dishes</a>
            <a href="vendors.html" class="site-nav-link">Vendors</a>
            <a href="blog.html" class="site-nav-link">Stories</a>
            <a href="about.html" class="site-nav-link">About</a>
            <a href="favorites.html" class="site-login" title="Account" id="userMenuBtn">
                <i class="fas fa-user"></i>
            </a>
            <div class="user-dropdown" id="userDropdown">
                <a href="favorites.html">My Favorites</a>
                <a href="#" id="logoutBtn">Logout</a>
            </div>
            <button class="theme-toggle" id="themeToggle">🌙</button>
        </nav>

        <!-- Mobile Toggle -->
        <button class="site-mobile-toggle">☰</button>
    </div>
    `;

    const footerHTML = `
    <div class="site-footer-container">
        <div class="site-footer-content">
            <div class="site-footer-section">
                <a class="site-logo mb-4 d-inline-block" href="home.html">
                    <img src="imageshome/foodkaki-logo.png" alt="Food Kaki Logo" style="height: 40px;">
                </a>
                <p>Celebrating Malaysia's vibrant street food culture through authentic flavors and stories.</p>
                
                <!-- Social Icons -->
                <div class="mt-4">
                    <a href="https://www.facebook.com/sharer/sharer.php?u=https://yourwebsite.com" target="_blank" class="social-icon"><i class="fab fa-facebook"></i></a>
                    <a href="https://twitter.com/intent/tweet?url=https://yourwebsite.com&text=Check%20out%20this%20awesome%20Malaysian%20street%20food!" target="_blank" class="social-icon"><i class="fab fa-twitter"></i></a>
                    <a href="https://api.whatsapp.com/send?text=Check%20out%20this%20Malaysian%20street%20food!%20https://yourwebsite.com" target="_blank" class="social-icon"><i class="fab fa-whatsapp"></i></a>
                </div>
            </div>
            
            <div class="site-footer-section">
                <h3>Explore</h3>
                <div class="footer-links">
                    <a href="home.html">Home</a>
                    <a href="foodList.html">Dishes</a>
                    <a href="vendors.html">Vendors</a>
                    <a href="blog.html">Stories</a>
                </div>
            </div>
            
            <div class="site-footer-section">
                <h3>About</h3>
                <div class="footer-links">
                    <a href="about.html">Heritage</a>
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                </div>
            </div>
            
            <div class="site-footer-section">
                <h3>Contact Us</h3>
                <p><i class="fas fa-envelope me-2"></i> hello@foodkaki.my</p>
                <p><i class="fas fa-phone me-2"></i> +60 3-1234 5678</p>
                <p><i class="fas fa-map-marker-alt me-2"></i> Kuala Lumpur, Malaysia</p>
            </div>
        </div>
        
        <div class="site-footer-bottom">
            <p>&copy; ${new Date().getFullYear()} FOODKAKI.my. All rights reserved.</p>
        </div>
    </div>
    `;

    const header = document.querySelector('header');
    if (header) {
        header.className = 'site-header';
        header.innerHTML = headerHTML;
    }

    const footer = document.querySelector('footer');
    if (footer) {
        footer.className = 'site-footer';
        footer.innerHTML = footerHTML;
    }

    const mobileToggle = document.querySelector('.site-mobile-toggle');
    const siteNav = document.querySelector('.site-nav');
    if (mobileToggle && siteNav) {
        mobileToggle.addEventListener('click', function () {
            siteNav.classList.toggle('active');
        });
    }

    // Navbar scroll effect - updated for fluid behavior
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.site-header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Update the theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme') || 'light';
            const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.body.setAttribute('data-theme', nextTheme);
            themeToggle.textContent = nextTheme === 'light' ? '🌙' : '☀️';
            
            // Save theme preference only if cookies are accepted
            if (localStorage.getItem('cookiesAccepted') === 'true') {
                localStorage.setItem('theme', nextTheme);
            }
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.setAttribute('data-theme', savedTheme);
            themeToggle.textContent = savedTheme === 'light' ? '🌙' : '☀️';
        }
    }

    setActiveNavLink();
}

function initUserMenu() {
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userDropdown = document.getElementById('userDropdown');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (userMenuBtn && userDropdown) {
        userMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            userDropdown.style.display = userDropdown.style.display === 'block' ? 'none' : 'block';
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (userDropdown && userMenuBtn && 
                !userMenuBtn.contains(e.target) && 
                !userDropdown.contains(e.target)) {
                userDropdown.style.display = 'none';
            }
        });
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Clear login cookies
            document.cookie = 'isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
            document.cookie = 'currentUser=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
            document.cookie = 'userEmail=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
            document.cookie = 'rememberMe=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
            
            // Redirect to login page
            window.location.href = 'index.html';
        });
    }
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    const navLinks = document.querySelectorAll('.site-nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initSharedComponents();
    initUserMenu();
});

// Cookie Consent Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if user has already made a choice
    if (!localStorage.getItem('cookiesChoiceMade')) {
        // Show cookie consent modal
        const cookieModal = new bootstrap.Modal(document.getElementById('cookieConsentModal'));
        cookieModal.show();
    }
    
    // Handle agree button
    const agreeCookiesBtn = document.getElementById('agreeCookies');
    if (agreeCookiesBtn) {
        agreeCookiesBtn.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            localStorage.setItem('cookiesChoiceMade', 'true');
            const cookieModal = bootstrap.Modal.getInstance(document.getElementById('cookieConsentModal'));
            cookieModal.hide();
            
            // Enable theme toggle
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) {
                themeToggle.style.opacity = '1';
                themeToggle.style.pointerEvents = 'auto';
            }
        });
    }
    
    // Handle disagree button
    const disagreeCookiesBtn = document.getElementById('disagreeCookies');
    if (disagreeCookiesBtn) {
        disagreeCookiesBtn.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'false');
            localStorage.setItem('cookiesChoiceMade', 'true');
            const cookieModal = bootstrap.Modal.getInstance(document.getElementById('cookieConsentModal'));
            cookieModal.hide();
            
            // Disable theme toggle
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) {
                themeToggle.style.opacity = '0.5';
                themeToggle.style.pointerEvents = 'none';
            }
            
            // Show message about accepting cookies
            alert('Please accept the cookies to save your theme settings!');
        });
    }
    
    // Check cookies acceptance status and adjust theme toggle accordingly
    if (localStorage.getItem('cookiesAccepted') === 'false') {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.style.opacity = '0.5';
            themeToggle.style.pointerEvents = 'none';
        }
    }
    
    // Clear storage button functionality
    const clearStorageBtn = document.getElementById('clearStorageBtn');
    if (clearStorageBtn) {
        clearStorageBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to clear all Cookies and LocalStorage data? This action cannot be undone!')) {
                localStorage.clear();
                // Clear cookies
                document.cookie.split(";").forEach(function(c) {
                    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                });
                alert('All storage data has been cleared!');
                // Reload to show cookie consent again
                location.reload();
            }
        });
    }
});