
(function() {
    'use strict';
    
  
    const CONFIG = {
        wikiName: 'Kornet Wiki',
        version: '1.0.0',
        discordInvite: 'https://discord.gg/u5En32wvwM',
        kornetWebsite: 'https://kornet.lat',
        kornetLogo: 'https://raw.githubusercontent.com/mane131/Kornet-Wiki/refs/heads/main/kornet.png'
    };
    
 
    document.addEventListener('DOMContentLoaded', function() {
        console.log(`${CONFIG.wikiName} v${CONFIG.version} initialized`);
        console.log(`Kornet Logo: ${CONFIG.kornetLogo}`);
        
        
        setupExternalLinks();
        
       
        setupSmoothScrolling();
        
     
        setupWikiFeatures();
        
        updateFooterYear();
        
      
        console.log('Wiki initialization complete');
    });
    
 
    function setupExternalLinks() {
        const externalLinks = document.querySelectorAll('a[target="_blank"]');
        
        externalLinks.forEach(link => {
        
            if (!link.querySelector('.external-indicator')) {
                link.innerHTML += ' <span class="external-indicator" style="font-size: 0.7em;">↗</span>';
            }
            
          
            link.addEventListener('click', function(e) {
                console.log(`Opening external link: ${this.href}`);
            
            });
        });
        
        console.log(`Set up ${externalLinks.length} external links`);
    }
    
   
    function setupSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    
                 
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
               
                    targetElement.style.outline = '2px dashed #ff0000';
                    setTimeout(() => {
                        targetElement.style.outline = 'none';
                    }, 1000);
                }
            });
        });
    }
    

    function setupWikiFeatures() {
       
        const discordLink = document.querySelector('a[href*="discord.gg/u5En32wvwM"]');
        if (discordLink) {
            discordLink.title = 'Join Kornet Discord Server';
            
           
            discordLink.addEventListener('click', function(e) {
                console.log('Kornet Discord invite clicked');
             
            });
        }
        
      
        const websiteLink = document.querySelector('a[href*="kornet.lat"]');
        if (websiteLink) {
            websiteLink.title = 'Visit Kornet Website';
        }
        
        console.log('Wiki features initialized');
    }
  
    function updateFooterYear() {
        const currentYear = new Date().getFullYear();
        const footer = document.querySelector('footer');
        
        if (footer) {
           
            footer.innerHTML = footer.innerHTML.replace('2025', currentYear);
        }
    }
    
  
    window.getWikiSection = function(sectionName) {
        const sections = document.querySelectorAll('section');
        for (const section of sections) {
            const heading = section.querySelector('h2');
            if (heading && heading.textContent.toLowerCase().includes(sectionName.toLowerCase())) {
                return section;
            }
        }
        return null;
    };
    
   
    window.KornetWiki = {
        config: CONFIG,
        
    
        getStaffList: function() {
            const staffList = document.querySelector('.staff-list');
            if (!staffList) return { owners: [], admins: [], mods: [], devs: [] };
            
            const staff = {
                owners: [],
                admins: [],
                mods: [],
                devs: []
            };
            
            const lines = staffList.textContent.split('\n');
            
            lines.forEach(line => {
                if (line.includes('Owners:')) {
                    const names = line.split('Owners:')[1].trim();
                    staff.owners = names.split(',').map(name => name.trim());
                } else if (line.includes('Administrators:')) {
                    const names = line.split('Administrators:')[1].trim();
                    staff.admins = names.split(',').map(name => name.trim());
                } else if (line.includes('Moderators:')) {
                    const names = line.split('Moderators:')[1].trim();
                    staff.mods = names.split(',').map(name => name.trim());
                } else if (line.includes('Developers / Leads:')) {
                    const names = line.split('Developers / Leads:')[1].trim();
                    staff.devs = names.split(',').map(name => name.trim());
                }
            });
            
            return staff;
        },
        
       
        navigateToSection: function(sectionName) {
            const section = getWikiSection(sectionName);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return true;
            }
            return false;
        },
        
     
        getSectionNames: function() {
            const sections = document.querySelectorAll('section h2');
            return Array.from(sections).map(h2 => h2.textContent.trim());
        },
        
        
        getDiscordInvite: function() {
            return CONFIG.discordInvite;
        },
        
      
        getKornetWebsite: function() {
            return CONFIG.kornetWebsite;
        },
        
    
        getLogoUrl: function() {
            return CONFIG.kornetLogo;
        }
    };
    
    console.log(`${CONFIG.wikiName} JavaScript loaded`);
})();
