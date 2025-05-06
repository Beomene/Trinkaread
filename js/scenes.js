async function loadScene(sceneId) {
    try {
        const configRes = await fetch(`assets/scenes/${sceneId}.json`);
        const config = await configRes.json();

        // Set layer images
        document.querySelector('.sky-layer img').src = config.sky || '';
        document.querySelector('.hyperdistal-layer img').src = config.hyperdistal || '';
        document.querySelector('.distal-layer img').src = config.distal || '';
        document.querySelector('.close-layer img').src = config.close || '';
        document.querySelector('.closer-layer img').src = config.closer || '';
        document.querySelector('.frame-layer img').src = config.frame || '';

        // Load text
        const textRes = await fetch(config.text);
        document.querySelector('.text-content').innerHTML = await textRes.text();

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