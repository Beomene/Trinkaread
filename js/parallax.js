// Unified upward parallax scrolling
const layers = {
    sky: -0.03,          // Slowest rise (background)
    hyperdistal: -0.07,  // Distant elements
    distal: -0.12,       // Midground
    close: -0.18,        // Nearby elements
    closer: -0.25,       // Closest background
    frame: 0,            // Static frame
    text: 1,             // Normal scroll speed
    stickers: 1,         // Matches text
    proximal: 1.15       // Slightly faster (foreground)
};

function initParallax() {
    let ticking = false;
    const container = document.querySelector('.parallax-container');
    
    // Set container height based on scene count
    container.style.height = `${sceneOrder.length * 200}vh`;
    
    function update() {
        const scrollPos = window.pageYOffset;
        Object.entries(layers).forEach(([layer, speed]) => {
            const element = document.querySelector(`.${layer}-layer`);
            if (element) {
                element.style.transform = `translateY(${scrollPos * speed}px)`;
            }
        });
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    });

    // Initialize positions
    update();
}

window.addEventListener('load', initParallax);