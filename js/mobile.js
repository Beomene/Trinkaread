// Simple mobile loader
async function loadMobileScene(sceneId) {
    try {
        const response = await fetch(`assets/scenes/${sceneId}_mobile.json`);
        const data = await response.json();
        document.querySelector('.mobile-text').innerHTML = data.text;
    } catch (error) {
        console.error("Mobile load error:", error);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadMobileScene('01_01');
});