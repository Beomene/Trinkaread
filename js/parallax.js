// Parallax configuration - optimized for subtle depth
const layers = {
    sky: 0,           // Static background (now using .jpg)
    hyperdistal: 0.02, // Very slow movement (distant elements)
    distal: 0.05,     // Slow background movement
    close: 0.1,       // Midground elements
    closer: 0.15,     // Nearby elements
    frame: 0,         // Static frame (using .png)
    text: 1,          // Main content scrolls normally
    stickers: 1,      // Stickers move with text
    proximal: 1.2     // Slightly faster than text (foreground elements)
};

// Optimized parallax initialization
function initParallax() {
    let lastScrollPos = window.pageYOffset;
    let ticking = false;

    function updateParallax() {
        const scrollPos = window.pageYOffset;
        
        // Only update if scroll position changed significantly (>1px)
        if (Math.abs(scrollPos - lastScrollPos) > 1) {
            Object.entries(layers).forEach(([layer, speed]) => {
                const element = document.querySelector(`.${layer}-layer`);
                if (element) {
                    element.style.transform = `translateY(${scrollPos * speed}px)`;
                }
            });
            lastScrollPos = scrollPos;
        }
        ticking = false;
    }

    // Throttled scroll handler
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Handle viewport changes
    window.addEventListener('resize', () => {
        window.dispatchEvent(new Event('scroll'));
    });

    // Initial positioning
    updateParallax();
}

// Show next chapter button when near bottom
function handleChapterButton() {
    const btn = document.querySelector('.next-chapter-btn');
    if (!btn) return;
    
    window.addEventListener('scroll', () => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        
        btn.style.display = (scrollable - scrolled < 500) ? 'block' : 'none';
    });
}

// Initialize everything on load
window.addEventListener('load', () => {
    // Hide loader
    const loader = document.querySelector('.loader');
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 500);
    
    // Initialize systems
    initParallax();
    handleChapterButton();
    
    // Mobile orientation suggestion
    if (window.innerWidth < 768 && window.matchMedia("(orientation: portrait)").matches) {
        document.body.insertAdjacentHTML('beforeend', `
            <div class="orientation-alert">
                <h2>For Best Experience</h2>
                <p>Please rotate your device to landscape mode</p>
                <small>(Parallax works best in landscape)</small>
            </div>
        `);
    }
});