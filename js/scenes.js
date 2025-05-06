// Load scene data
async function loadScene(sceneId) {
    try {
        const response = await fetch(`assets/scenes/${sceneId}.json`);
        const sceneData = await response.json();

        // Set background
        document.querySelector('.sky-layer img').src = sceneData.sky;

        // Load text content
        const textResponse = await fetch(sceneData.text);
        const textContent = await textResponse.text();
        document.querySelector('.text-content').innerHTML = textContent;

        // Play ambient sound if exists
        if (sceneData.audio) {
            const audio = new Audio(sceneData.audio);
            audio.loop = true;
            audio.id = 'ambient-audio';
            document.body.appendChild(audio);
        }

    } catch (error) {
        console.error('Error loading scene:', error);
    }
}

// Initialize first scene
document.addEventListener('DOMContentLoaded', () => {
    loadScene('01_01');
});