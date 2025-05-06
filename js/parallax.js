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
    update();
}

window.addEventListener('load', () => {
    document.querySelector('.loader').style.display = 'none';
    initParallax();
    
    if (window.innerWidth < 768 && window.matchMedia("(orientation: portrait)").matches) {
        document.body.insertAdjacentHTML('beforeend', `
            <div class="orientation-alert">
                <h2>For Best Experience</h2>
                <p>Please rotate your device to landscape mode</p>
            </div>
        `);
    }
});