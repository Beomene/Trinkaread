	// Ultra-subtle parallax speeds
const layers = {
    sky: 0,          // Static
    hyperdistal: 0.02,
    distal: 0.05,
    close: 0.1,
    closer: 0.15,
    frame: 0,        // Static
    text: 1,
    stickers: 1,
    proximal: 1.2
};

window.addEventListener('load', () => {
    document.querySelector('.loader').style.display = 'none';
    initParallax();
});

function initParallax() {
    window.addEventListener('scroll', () => {
        const scrollPos = window.pageYOffset;
        
        Object.entries(layers).forEach(([layer, speed]) => {
            const element = document.querySelector(`.${layer}-layer`);
            if (element) {
                element.style.transform = `translateY(${scrollPos * speed}px)`;
            }
        });
    });
}