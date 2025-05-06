async function loadScene(sceneId) {
    try {
        console.log(`Loading scene ${sceneId}...`);
        
        // 1. Load scene config
        const configRes = await fetch(`assets/scenes/${sceneId}.json`);
        if (!configRes.ok) throw new Error("Config not found");
        const config = await configRes.json();
        console.log("Config loaded:", config);

        // 2. Set background layers
        if (config.sky) {
            document.querySelector('.sky-layer img').src = config.sky;
        }
        if (config.hyperdistal) {
            document.querySelector('.hyperdistal-layer img').src = config.hyperdistal;
        }
        if (config.distal) {
            document.querySelector('.distal-layer img').src = config.distal;
        }

        // 3. Load text content
        const textRes = await fetch(config.text);
        const textContent = await textRes.text();
        document.querySelector('.text-content').innerHTML = textContent;
        console.log("Text loaded");

    } catch (error) {
        console.error("SCENE LOAD ERROR:", error);
        document.querySelector('.text-content').innerHTML = 
            `<h2>Error Loading Scene</h2><p>${error.message}</p>`;
    }
}

// Initialize first scene
document.addEventListener('DOMContentLoaded', () => {
    loadScene('01_01');
});