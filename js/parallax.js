const layers = {
    sky: -0.03,
    hyperdistal: -0.07,
    distal: -0.12,
    close: -0.18,
    closer: -0.25,
    frame: 0,
    text: 1,
    stickers: 1,
    proximal: 1.15
};

function initParallax() {
    let ticking = false;
    
    function update() {
        const scrollPos = window.pageYOffset;
        Object.entries(layers).forEach(([layer, speed]) => {
            const element = document.querySelector(`.${layer}-layer`);
            if (element) element.style.transform = `translateY(${scrollPos * speed}px)`;
        });
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    });
    
    // Set initial scene height
    document.querySelector('.parallax-container').style.height = 
        `${sceneOrder.length * 200}vh`;
}

window.addEventListener('load', initParallax);