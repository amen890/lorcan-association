// Navigation template
const navigationHTML = `
<nav id="main-nav" class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
            <a href="index.html" class="flex items-center space-x-3">
                <div class="w-10 h-10 gold-bg rounded-lg flex items-center justify-center">
                    <span class="text-xl font-bold text-gray-900">L</span>
                </div>
                <span id="nav-title" class="heading-font text-xl font-semibold">Lorcan Leader Boards</span>
            </a>
            <div class="hidden md:flex items-center space-x-8">
                <a href="index.html" class="nav-link text-white/90 hover:text-white">Home</a>
                <a href="associations.html" class="nav-link text-white/90 hover:text-white">Associations</a>
                <a href="contact.html" class="nav-link text-white/90 hover:text-white">Contact</a>
            </div>
            <button onclick="toggleMobileMenu()" class="md:hidden text-white bg-transparent border-none cursor-pointer">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewbox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </div>
    </div>
    <!-- Mobile Menu -->
    <div id="mobile-menu" class="hidden md:hidden bg-black/90 backdrop-blur-md">
        <div class="px-4 py-4 space-y-3">
            <a href="index.html" onclick="toggleMobileMenu()" class="block w-full text-left text-white/90 hover:text-white py-2">Home</a>
            <a href="associations.html" onclick="toggleMobileMenu()" class="block w-full text-left text-white/90 hover:text-white py-2">Associations</a>
            <a href="contact.html" onclick="toggleMobileMenu()" class="block w-full text-left text-white/90 hover:text-white py-2">Contact</a>
        </div>
    </div>
</nav>`;

// Footer template
const footerHTML = `
<footer class="bg-black/30 border-t border-white/10 py-12 px-4">
    <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-4 gap-8 mb-8">
            <div>
                <div class="flex items-center space-x-3 mb-4">
                    <div class="w-10 h-10 gold-bg rounded-lg flex items-center justify-center">
                        <span class="text-xl font-bold text-gray-900">L</span>
                    </div>
                    <span class="heading-font text-xl font-semibold">Lorcan</span>
                </div>
                <p class="text-white/60 text-sm">Empowering healthcare leaders across Ethiopia and beyond.</p>
            </div>
            <div>
                <h4 class="font-semibold mb-4">Quick Links</h4>
                <ul class="space-y-2 text-white/60 text-sm">
                    <li><a href="index.html" class="hover:text-white transition-colors">Home</a></li>
                    <li><a href="associations.html" class="hover:text-white transition-colors">Associations</a></li>
                    <li><a href="contact.html" class="hover:text-white transition-colors">Contact</a></li>
                </ul>
            </div>
            <div>
                <h4 class="font-semibold mb-4">Associations</h4>
                <ul class="space-y-2 text-white/60 text-sm">
                    <li><a href="associations/ehpsa.html" class="hover:text-white transition-colors">EHPSA</a></li>
                    <li><a href="associations/emsa.html" class="hover:text-white transition-colors">EMSA</a></li>
                    <li><a href="associations/edsa.html" class="hover:text-white transition-colors">EDSA</a></li>
                    <li><a href="associations/lordental.html" class="hover:text-white transition-colors">LOR-DENTAL ASCENT</a></li>
                </ul>
            </div>
            <div>
                <h4 class="font-semibold mb-4">Connect</h4>
                <div class="flex gap-3">
                    <a href="https://www.instagram.com/p/DUnpJ-FkaUq/?igsh=NXd4OGttODJzZnV5" class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Instagram">
                        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg" alt="Instagram" class="w-5 h-5 invert">
                    </a>
                    <a href="https://snssdk1340.onelink.me/k3Nj?domain_source=tiktok&af_dp=snssdk1340%3A%2F%2Fuser%2Fprofile%2F7530117177774720006%3Fparams_url%3Dhttps%253A%252F%252Fwww.tiktok.com%252Fdiscover%252Florcan-medical-college-addis-ababa%26needlaunchlog%3D1%26ug_medium%3Dfe_component%26page_name%3Dkeyword_lorcan-medical-college-addis-ababa%26enter_from%3Dkeyword_expansion_page%26wid%3D7635310792208418311%26referer%3Dorganic%26vidab%3D70508271%252C75876588%252C75971973%252C76003147%252C76024531%252C73004916%252C73281058%252C73281067%252C73282888%252C73549932%252C73841972%252C74276214%252C74276218%252C74736088%26seo_vidab%3D73675307%252C75743008%252C75987329%252C76013620%26ug_launch_category%3Dseo%26media_source%3Dtiktokwebseo%26activation_method%3Dclick_wap%26release%3D1.5.0.3101%26utm_campaign%3Dtiktokwebseo%26referrer_url%3Dgoogle%26gd_label%3Dclick_wap_user_card_user%26position%3Duser_card_user&pid=tiktokwebseo&c=keyword_lorcan-medical-college-addis-ababa&af_adset=organic&af_siteid=mobile&af_ad_id=google&wid=7635310792208418311&canonical=https%3A%2F%2Fwww.tiktok.com%2Fdiscover%2Florcan-medical-college-addis-ababa&af_adset_id=&af_channel=&vidab=70508271%2C75876588%2C75971973%2C76003147%2C76024531%2C73004916%2C73281058%2C73281067%2C73282888%2C73549932%2C73841972%2C74276214%2C74276218%2C74736088&seo_vidab=73675307%2C75743008%2C75987329%2C76013620&browser_name=Chrome%2520Mobile&release=1.5.0.3101&utm_campaign=tiktokwebseo_kep&af_ad=user_card_user" class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="TikTok">
                        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tiktok.svg" alt="TikTok" class="w-5 h-5 invert">
                    </a>
                    <a href=" lorcan!doesn't!have!a!linkedIn!account " class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="LinkedIn">
                        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg" alt="LinkedIn" class="w-5 h-5 invert">
                    </a>
                    <a href="https://lorcancm.edu.et/" class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Telegram">
                        <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/telegram.svg" alt="Telegram" class="w-5 h-5 invert">
                    </a>
                </div>
            </div>
        </div>
        <div class="border-t border-white/10 pt-8 text-center text-white/50 text-sm">
            <p>© 2024 Lorcan Leader Boards. All rights reserved.</p>
        </div>
    </div>
</footer>`;

// Mobile menu toggle function
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

// Load navigation and footer when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Load navigation
    const navContainer = document.getElementById('navigation-container');
    if (navContainer) {
        navContainer.innerHTML = navigationHTML;
    }
    
    // Load footer
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = footerHTML;
    }
    
    // Update relative paths based on current directory
    updateRelativePaths();
});

// Function to update relative paths for nested pages
function updateRelativePaths() {
    const currentPath = window.location.pathname;
    const isInAssociationsFolder = currentPath.includes('/associations/');
    
    if (isInAssociationsFolder) {
        // Update navigation links for associations pages
        const navLinks = document.querySelectorAll('#main-nav a');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('/') && !href.startsWith('#')) {
                link.setAttribute('href', '../' + href);
            }
        });
        
        // Update footer links
        const footerLinks = document.querySelectorAll('footer a');
        footerLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('/') && !href.startsWith('#')) {
                if (href.includes('associations/')) {
                    link.setAttribute('href', '../' + href);
                } else {
                    link.setAttribute('href', '../' + href);
                }
            }
        });
    }
}