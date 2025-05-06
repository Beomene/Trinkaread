// Unified upward movement parallax - by Parallux
const layers = {
    sky: -0.03,          // Slowest rise (distant sky)
    hyperdistal: -0.07,  // Distant clouds/mountains
    distal: -0.12,       // Midground
    close: -0.18,        // Nearby elements
    closer: -0.25,       // Closest background
    frame: 0,            // Static
    text: 1,             // Normal scroll speed
    stickers: 1,         // Matches text
    proximal: 1.15       // Slightly faster than text (foreground pop)
};

function initParallax() {
    let ticking = false;
    const update = () => {
        const scrollPos = window.pageYOffset;
        Object.entries(layers).forEach(([layer, speed]) => {
            const element = document.querySelector(`.${layer}-layer`);
            if (element) element.style.transform = `translateY(${scrollPos * speed}px)`;
        });
        ticking = false;
    };
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    });
    update(); // Initialize positions
}
window.addEventListener('load', initParallax);