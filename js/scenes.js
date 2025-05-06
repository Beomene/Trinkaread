let currentScene = null;

async function loadScene(sceneId) {
    try {
        currentScene = sceneId;
        const configRes = await fetch(`assets/scenes/${sceneId}.json`);
        const config = await configRes.json();

        // Set layer images
        document.querySelector('.sky-layer img').src = config.sky || '';
        document.querySelector('.hyperdistal-layer img').src = config.hyperdistal || '';
        document.querySelector('.distal-layer img').src = config.distal || '';
        document.querySelector('.close-layer img').src = config.close || '';
        document.querySelector('.closer-layer img').src = config.closer || '';
        document.querySelector('.frame-layer img').src = config.frame || '';

        // Load stickers
        const stickerLayer = document.querySelector('.sticker-layer');
        stickerLayer.innerHTML = '';
        if (config.stickers) {
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
            /!\[sticker-(left|right)\]\((.*?)\)/g, 
            '<img src="$2" class="sticker sticker-$1" alt="">'
        );
        document.querySelector('.text-content').innerHTML = textContent;

    } catch (error) {
        console.error("Scene load error:", error);
        document.querySelector('.text-content').innerHTML = `
            <h2>Loading Error</h2>
            <p>${error.message}</p>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadScene('01_01');
});