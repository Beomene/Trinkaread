let currentScene = null;
const sceneOrder = ['01_01', '01_02', '01_03', '01_04', '01_05']; // Add all scene IDs in order

async function loadScene(sceneId) {
    try {
        currentScene = sceneId;
        const configRes = await fetch(`assets/scenes/${sceneId}.json`);
        const config = await configRes.json();

        // Set layer images
        document.querySelector('.sky-layer img').src = config.sky;
        document.querySelector('.hyperdistal-layer img').src = config.hyperdistal;
        document.querySelector('.distal-layer img').src = config.distal;
        document.querySelector('.close-layer img').src = config.close;
        document.querySelector('.closer-layer img').src = config.closer;
        document.querySelector('.frame-layer img').src = config.frame;

        // Load stickers
        const stickerLayer = document.querySelector('.sticker-layer');
        stickerLayer.innerHTML = '';
        config.stickers.forEach(sticker => {
            const img = document.createElement('img');
            img.src = sticker.image;
            img.className = `sticker sticker-${sticker.align || 'left'}`;
            img.style.left = sticker.x;
            img.style.top = sticker.y;
            img.alt = sticker.alt || '';
            stickerLayer.appendChild(img);
        });

        // Load text
        const textRes = await fetch(config.text);
        document.querySelector('.text-content').innerHTML = await textRes.text();

    } catch (error) {
        console.error("Scene load error:", error);
        document.querySelector('.text-content').innerHTML = `
            <div class="error">
                <h2>Loading Error</h2>
                <p>${error.message}</p>
            </div>
        `;
    }
}

// Initialize first scene
document.addEventListener('DOMContentLoaded', () => {
    loadScene(sceneOrder[0]);
});

// Next chapter button handler
document.querySelector('.next-chapter-btn').addEventListener('click', () => {
    const currentIndex = sceneOrder.indexOf(currentScene);
    if (currentIndex < sceneOrder.length - 1) {
        loadScene(sceneOrder[currentIndex + 1]);
    }
});