
(function() {
    'use strict';
    
   
    const CONFIG = {
        loadingTime: 4000, // 4 seconds total loading time
        fadeOutTime: 800,  // 800ms fade out animation
        fallbackTime: 5000 // 5 second fallback timeout
    };
    
    
    const KORNET_LOGO_URL = "https://raw.githubusercontent.com/mane131/Kornet-Wiki/refs/heads/main/kornet.png";
    

    function preloadLogoImage() {
        const logoImg = document.getElementById('kornet-logo');
      
        if (logoImg) {
            if (!logoImg.src || logoImg.src.includes('placeholder')) {
                logoImg.src = KORNET_LOGO_URL;
            }
            
            console.log('Preloading Kornet logo image:', logoImg.src);
            
            
            const img = new Image();
            img.onload = function() {
                console.log('Kornet logo image loaded successfully');
               
                adjustLogoStyle(img.width, img.height);
            };
            img.onerror = function() {
                console.error('Failed to load Kornet logo image from:', KORNET_LOGO_URL);
                
                fallbackToTextLogo();
            };
            img.src = logoImg.src;
        }
    }
    
  
    function adjustLogoStyle(width, height) {
        const logoImg = document.getElementById('kornet-logo');
        if (!logoImg) return;
        
    
        if (width > 400) {
            logoImg.style.maxWidth = '400px';
        }
        
      
        if (height > 150) {
            logoImg.style.maxHeight = '150px';
        }
    
        logoImg.style.display = 'block';
        logoImg.style.margin = '0 auto';
    }
    

    function fallbackToTextLogo() {
        const logoContainer = document.querySelector('.loading-logo');
        if (logoContainer) {
            logoContainer.innerHTML = `
                <div style="color: #ff0000; font-size: 3em; text-shadow: 0 0 15px rgba(255, 0, 0, 0.7); font-family: 'Press Start 2P', cursive; animation: pulse 2s infinite;">
                    KORNET
                </div>
            `;
            console.log('Using fallback text logo');
        }
    }
    
    function handleLoadingScreen() {
       
        window.addEventListener('load', function() {
            console.log('Page fully loaded, starting loading screen transition');
            
            // Add a small delay to ensure the loading animation completes
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
            }, CONFIG.loadingTime);
        });

     
        setTimeout(function() {
            if (document.body.classList.contains('loading')) {
                console.log('Fallback timeout triggered, forcing content display');
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
    

    window.KornetLoading = {
        
        show: function() {
            document.body.classList.add('loading');
            document.body.classList.remove('loaded');
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.style.display = 'flex';
                loadingScreen.style.opacity = '1';
                loadingScreen.style.visibility = 'visible';
            }
            console.log('Loading screen manually shown');
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
            console.log('Loading screen manually hidden');
        },
        
  
        simulate: function(duration = 3000) {
            this.show();
            
            setTimeout(() => {
                this.hide();
            }, duration);
        },
        

        updateLogo: function(newSrc) {
            const logoImg = document.getElementById('kornet-logo');
            if (logoImg) {
                logoImg.src = newSrc;
                preloadLogoImage();
                console.log('Logo image updated to:', newSrc);
            }
        },
        
 
        getLogoUrl: function() {
            const logoImg = document.getElementById('kornet-logo');
            return logoImg ? logoImg.src : KORNET_LOGO_URL;
        }
    };
})();
