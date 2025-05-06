// Wait for all assets to load
window.addEventListener('load', () => {
    document.querySelector('.loader').style.display = 'none';
    initParallax();
});

function initParallax() {
    const layers = {
        sky: 0,
        hyperdistal: 0.05,
        distal: 0.3,
        character: 1,
        text: 1,
        proximal: 1.5
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

        // Show/hide next chapter button
        const docHeight = document.body.scrollHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = (scrollPos / (docHeight - winHeight)) * 100;

        if (scrollPercent > 90) {
            document.querySelector('.next-chapter-btn').style.display = 'block';
        } else {
            document.querySelector('.next-chapter-btn').style.display = 'none';
        }
    });
}