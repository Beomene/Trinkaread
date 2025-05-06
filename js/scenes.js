// scenes.js - Complete Updated Version
let currentScene = null;
const sceneOrder = ['01_01', '01_02', '01_03', '01_04']; // Your scene order

async function loadScene(sceneId) {
    try {
        currentScene = sceneId;
        document.querySelector('.loader').style.display = 'flex';

        // Load scene config
        const configRes = await fetch(`assets/scenes/${sceneId}.json`);
        const config = await configRes.json();

        // Helper to update layer images
        const updateLayer = (layerClass, imagePath) => {
            const layer = document.querySelector(`.${layerClass}`);
            if (layer && imagePath) {
                const img = layer.querySelector('img');
                if (img) {
                    img.dataset.src = imagePath; // Set future source
                    img.src = imagePath; // Immediate load
                    img.onerror = () => console.warn(`Failed to load: ${imagePath}`);
                }
            }
        };

        // Update all layers
        updateLayer('sky-layer', config.sky);
        updateLayer('hyperdistal-layer', config.hyperdistal);
        updateLayer('distal-layer', config.distal);
        updateLayer('close-layer', config.close);
        updateLayer('closer-layer', config.closer);
        updateLayer('frame-layer', config.frame);

        // Load stickers
        const stickerLayer = document.querySelector('.sticker-layer');
        stickerLayer.innerHTML = '';
        if (config.stickers?.length) {
            config.stickers.forEach(sticker => {
                const img = document.createElement('img');
                img.src = sticker.image;
                img.className = `sticker sticker-${sticker.align || 'left'}`;
                img.style.left = sticker.x;
                img.style.top = sticker.y;
                img.alt = sticker.alt || '';
                stickerLayer.appendChild(img);
            });
        }

        // Load text
        const textRes = await fetch(config.text);
        let textContent = await textRes.text();
        textContent = textContent.replace(
            /!\[sticker-(A|B|left|right)\]\((.*?)\)/g,
            '<img src="$2" class="sticker sticker-$1" alt="" loading="lazy">'
        );
        document.querySelector('.text-content').innerHTML = textContent;

        document.querySelector('.loader').style.display = 'none';

    } catch (error) {
        console.error("Scene load error:", error);
        document.querySelector('.text-content').innerHTML = `
            <div class="error">
                <h2>Loading Error</h2>
                <p>${error.message}</p>
            </div>
        `;
        document.querySelector('.loader').style.display = 'none';
    }
}

// Initialize first scene
document.addEventListener('DOMContentLoaded', () => {
    loadScene(sceneOrder[0]);
});

// Next chapter button
document.querySelector('.next-chapter-btn')?.addEventListener('click', () => {
    const currentIndex = sceneOrder.indexOf(currentScene);
    if (currentIndex < sceneOrder.length - 1) {
        loadScene(sceneOrder[currentIndex + 1]);
    }
});