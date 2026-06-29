// Wait for shared components to load
        document.addEventListener('DOMContentLoaded', function() {
            // Hero background parallax effect
            document.addEventListener('mousemove', (e) => {
                const hero = document.querySelector('.about-hero');
                const bg = document.getElementById('heroBackground');
                const rect = hero.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const moveX = (x - centerX) / 30;
                const moveY = (y - centerY) / 30;
                
                bg.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
            });
            
            // Scroll animation for sections
            function checkVisibility() {
                const sections = document.querySelectorAll('.section-title, .culture-card, .mission-image, .blog-preview, .team-member');
                
                sections.forEach(section => {
                    const rect = section.getBoundingClientRect();
                    const isVisible = (rect.top <= window.innerHeight * 0.8) && 
                                     (rect.bottom >= window.innerHeight * 0.2);
                    
                    if (isVisible) {
                        section.classList.add('visible');
                    }
                });
            }
            
            // Initial check
            checkVisibility();
            window.addEventListener('scroll', checkVisibility);
            
            // Create floating food icons dynamically
            function createFloatingIcons() {
                const container = document.querySelector('.floating-icons');
                const icons = ['utensils', 'wok', 'mortar-pestle', 'pepper-hot', 'fish', 'ice-cream', 'bread-slice', 'hamburger', 'drumstick-bite', 'egg'];
                
                for (let i = 0; i < 15; i++) {
                    const icon = document.createElement('i');
                    icon.className = `fas fa-${icons[Math.floor(Math.random() * icons.length)]} floating-icon`;
                    
                    // Random position
                    const top = Math.random() * 100;
                    const left = Math.random() * 100;
                    const delay = Math.random() * 5;
                    const duration = 10 + Math.random() * 20;
                    
                    icon.style.top = `${top}%`;
                    icon.style.left = `${left}%`;
                    icon.style.animationDelay = `${delay}s`;
                    icon.style.animationDuration = `${duration}s`;
                    
                    container.appendChild(icon);
                }
            }
            
            createFloatingIcons();
            
            // Mission image rotation on scroll
            let lastScroll = 0;
            window.addEventListener('scroll', () => {
                const missionImg = document.querySelector('.mission-image');
                const rect = missionImg.getBoundingClientRect();
                const scrollPercent = (rect.top - window.innerHeight) / window.innerHeight;
                
                if (scrollPercent < 0 && scrollPercent > -1) {
                    const rotate = -5 + (scrollPercent * -10);
                    missionImg.style.transform = `rotate(${rotate}deg)`;
                }
                
                lastScroll = window.scrollY;
            });
        });