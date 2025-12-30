// loading.js - Fixed version
(function() {
    'use strict';
    
    const CONFIG = {
        loadingTime: 3000, // 3 seconds total loading time
        fadeOutTime: 800,  // 800ms fade out animation
        fallbackTime: 5000 // 5 second fallback timeout
    };
    
    // Preload the logo image
    function preloadLogoImage() {
        const logoImg = document.getElementById('kornet-logo');
        if (logoImg && logoImg.src) {
            const img = new Image();
            img.onload = function() {
                console.log('Kornet logo image loaded successfully');
            };
            img.onerror = function() {
                console.error('Failed to load Kornet logo image');
                fallbackToTextLogo();
            };
            img.src = logoImg.src;
        }
    }
    
    // Animate the loading bar
    function animateLoadingBar() {
        const loadingBar = document.querySelector('.loading-bar');
        if (!loadingBar) return;
        
        // Start the animation
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
                return;
            }
            width += 1;
            loadingBar.style.width = width + '%';
        }, CONFIG.loadingTime / 100); // Divide by 100 for smooth animation
    }
    
    // Main loading screen handler
    function handleLoadingScreen() {
        // Start animating the loading bar immediately
        animateLoadingBar();
        
        // Wait for the page to fully load
        window.addEventListener('load', function() {
            console.log('Page fully loaded, starting loading screen transition');
            
            // Ensure loading bar reaches 100%
            setTimeout(function() {
                const loadingBar = document.querySelector('.loading-bar');
                if (loadingBar) {
                    loadingBar.style.width = '100%';
                }
                
                // Add a small delay to show 100% completion
                setTimeout(function() {
                    document.body.classList.remove('loading');
                    document.body.classList.add('loaded');
                    
                    // Remove loading screen from DOM after transition
                    setTimeout(function() {
                        const loadingScreen = document.getElementById('loading-screen');
                        if (loadingScreen) {
                            loadingScreen.style.display = 'none';
                            console.log('Loading screen hidden');
                        }
                    }, CONFIG.fadeOutTime);
                }, 500); // Show 100% for half a second
            }, CONFIG.loadingTime);
        });

        // Fallback: If page takes too long to load, show content anyway
        setTimeout(function() {
            if (document.body.classList.contains('loading')) {
                console.log('Fallback timeout triggered, forcing content display');
                
                // Set loading bar to 100%
                const loadingBar = document.querySelector('.loading-bar');
                if (loadingBar) {
                    loadingBar.style.width = '100%';
                }
                
                document.body.classList.remove('loading');
                document.body.classList.add('loaded');
                
                setTimeout(function() {
                    const loadingScreen = document.getElementById('loading-screen');
                    if (loadingScreen) {
                        loadingScreen.style.display = 'none';
                        console.log('Loading screen hidden (fallback)');
                    }
                }, CONFIG.fadeOutTime);
            }
        }, CONFIG.fallbackTime);
    }
    
    // Fallback to text logo if image fails to load
    function fallbackToTextLogo() {
        const logoContainer = document.querySelector('.loading-logo');
        if (logoContainer) {
            logoContainer.innerHTML = `
                <div style="color: #ff66b2; font-size: 3em; font-family: 'Bangers', cursive; letter-spacing: 3px; text-shadow: 0 0 10px #ff3385;">
                    KORNET
                </div>
            `;
            console.log('Using fallback text logo');
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM ready, initializing loading screen');
            preloadLogoImage();
            handleLoadingScreen();
        });
    } else {
        console.log('DOM already ready, initializing loading screen');
        preloadLogoImage();
        handleLoadingScreen();
    }
    
    // Public API for testing
    window.KornetLoading = {
        simulate: function(duration = 3000) {
            document.body.classList.add('loading');
            document.body.classList.remove('loaded');
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.style.display = 'flex';
                loadingScreen.style.opacity = '1';
                loadingScreen.style.visibility = 'visible';
            }
            
            // Animate loading bar
            const loadingBar = document.querySelector('.loading-bar');
            if (loadingBar) {
                loadingBar.style.width = '0%';
                let width = 0;
                const interval = setInterval(() => {
                    if (width >= 100) {
                        clearInterval(interval);
                        setTimeout(() => {
                            this.hide();
                        }, 500);
                        return;
                    }
                    width += 1;
                    loadingBar.style.width = width + '%';
                }, duration / 100);
            }
        },
        
        hide: function() {
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
            
            setTimeout(function() {
                const loadingScreen = document.getElementById('loading-screen');
                if (loadingScreen) {
                    loadingScreen.style.display = 'none';
                }
            }, CONFIG.fadeOutTime);
        }
    };
})();
