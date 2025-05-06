// Current scene management
let currentScene = null;

async function loadScene(sceneId) {
    try {
        currentScene = sceneId;
        
        // Show loader while loading
        document.querySelector('.loader').style.display = 'flex';
        document.querySelector('.loader').style.opacity = '1';
        
        // Load scene configuration
        const configRes = await fetch(`assets/scenes/${sceneId}.json`);
        if (!configRes.ok) throw new Error(`Scene configuration not found: ${sceneId}`);
        const config = await configRes.json();
        
        // Set layer images with error handling
        const setLayerImage = (selector, src) => {
            if (!src) return;
            const element = document.querySelector(selector);
            if (element) {
                const img = element.querySelector('img');
                if (img) {
                    img.src = src;
                    img.style.display = 'block';
                    img.onerror = () => {
                        console.warn(`Failed to load image: ${src}`);
                        img.style.display = 'none';
                    };
                }
            }
        };
        
        // Load all layer images
        setLayerImage('.sky-layer', config.sky);
        setLayerImage('.hyperdistal-layer', config.hyperdistal);
        setLayerImage('.distal-layer', config.distal);
        setLayerImage('.close-layer', config.close);
        setLayerImage('.closer-layer', config.closer);
        setLayerImage('.frame-layer', config.frame);
        
        // Load and position stickers
        const stickerLayer = document.querySelector('.sticker-layer');
        stickerLayer.innerHTML = '';
        
        if (config.stickers && config.stickers.length > 0) {
            config.stickers.forEach(sticker => {
                const img = document.createElement('img');
                img.src = sticker.image;
                img.className = `sticker sticker-${sticker.align || 'left'}`;
                img.style.left = sticker.x || '10%';
                img.style.top = sticker.y || '20%';
                img.alt = sticker.alt || '';
                img.loading = 'lazy';
                
                img.onerror = () => {
                    console.warn(`Failed to load sticker: ${sticker.image}`);
                    img.style.display = 'none';
                };
                
                stickerLayer.appendChild(img);
            });
        }
        
        // Load text content
        const textRes = await fetch(config.text);
        if (!textRes.ok) throw new Error(`Text content not found for: ${sceneId}`);
        let textContent = await textRes.text();
        
        // Process markdown images into stickers
        textContent = textContent.replace(
            /!\[sticker-(left|right)\]\((.*?)\)/g, 
            (match, align, src) => {
                return `<img src="${src}" class="sticker sticker-${align}" alt="" loading="lazy">`;
            }
        );
        
        // Apply text to container
        document.querySelector('.text-content').innerHTML = textContent;
        
        // Hide loader
        document.querySelector('.loader').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.loader').style.display = 'none';
        }, 500);
        
    } catch (error) {
        console.error("Scene load error:", error);
        document.querySelector('.text-content').innerHTML = `
            <div class="error">
                <h2>Loading Error</h2>
                <p>${error.message}</p>
                <p>Please try refreshing the page.</p>
            </div>
        `;
        
        document.querySelector('.loader').style.display = 'none';
    }
}

// Initialize first scene when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Load default scene or get from URL
    const urlParams = new URLSearchParams(window.location.search);
    const sceneParam = urlParams.get('scene');
    loadScene(sceneParam || '01_01');
});