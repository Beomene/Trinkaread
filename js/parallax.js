// Wait for all assets to load
window.addEventListener('load', () => {
    document.querySelector('.loader').style.display = 'none';
    initParallax();
});

function initParallax() {
    const layers = {
        sky: 0,          // Static
        hyperdistal: 0.02, // Barely moves
        distal: 0.05,     // Very slight
        close: 0.1,       // Gentle
        closer: 0.15,     // Slightly more
        frame: 0,         // Static
        text: 1,          // Normal scroll
        stickers: 1,      // Matches text
        proximal: 1.2     // Slightly faster than text
    };

    // Set initial positions
    Object.keys(layers).forEach(layer => {
        const element = document.querySelector(`.${layer}-layer`);
        if (element) element.style.willChange = 'transform';
    });

    // Scroll handler
    window.addEventListener('scroll', () => {
        const scrollPos = window.pageYOffset;

        // Update layer positions
        Object.entries(layers).forEach(([layer, speed]) => {
            const element = document.querySelector(`.${layer}-layer`);
            if (element) {
                const yPos = scrollPos * speed;
                element.style.transform = `translateY(${yPos}px)`;
            }
        });

        // Show next chapter button at 90% scroll
        const docHeight = document.body.scrollHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = (scrollPos / (docHeight - winHeight)) * 100;

        document.querySelector('.next-chapter-btn').style.display = 
            scrollPercent > 90 ? 'block' : 'none';
    });
}