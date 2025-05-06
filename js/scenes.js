// Updated scenes.js
async function loadScene(sceneId) {
    try {
        // 1. Load scene config
        const configRes = await fetch(`assets/scenes/${sceneId}.json`);
        if (!configRes.ok) throw new Error("Config not found");
        const config = await configRes.json();

        // 2. Set background layers
        document.querySelector('.sky-layer img').src = 
            `assets/backgrounds/${config.sky}`;
        
        // 3. Load text content
        const textRes = await fetch(`assets/scenes/${config.text}`);
        const text = await textRes.text();
        document.querySelector('.text-content').innerHTML = text;

    } catch (error) {
        console.error("Scene load failed:", error);
        // Fallback content
        document.querySelector('.text-content').innerHTML = 
            `<h2>Scene load error</h2><p>${error.message}</p>`;
    }
}