async function loadScene(sceneId) {
    try {
        // Load scene config
        const configRes = await fetch(`assets/scenes/${sceneId}.json`);
        if (!configRes.ok) throw new Error("Config not found");
        const config = await configRes.json();

        // Set background layers
        if (config.sky) document.querySelector('.sky-layer img').src = config.sky;
        if (config.hyperdistal) document.querySelector('.hyperdistal-layer img').src = config.hyperdistal;
        if (config.distal) document.querySelector('.distal-layer img').src = config.distal;
        if (config.close) document.querySelector('.close-layer img').src = config.close;
        if (config.closer) document.querySelector('.closer-layer img').src = config.closer;
        if (config.frame) document.querySelector('.frame-layer img').src = config.frame;

        // Load text
        const textRes = await fetch(config.text);
        const text = await textRes.text();
        document.querySelector('.text-content').innerHTML = text;

        // Process stickers
        if (config.stickers) {
            config.stickers.forEach(sticker => {
                const img = document.createElement('img');
                img.src = sticker.image;
                img.className = `sticker sticker-${sticker.align}`;
                img.style.left = sticker.x;
                img.style.top = sticker.y;
                document.querySelector('.text-container').appendChild(img);
            });
        }

    } catch (error) {
        console.error("Scene load error:", error);
        document.querySelector('.text-content').innerHTML = 
            `<h2>Loading Error</h2><p>${error.message}</p>`;
    }
}

// Initialize first scene
document.addEventListener('DOMContentLoaded', () => {
    loadScene('01_01');
});