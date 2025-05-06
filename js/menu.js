// Menu toggle
document.querySelector('.menu-dots').addEventListener('click', (e) => {
    e.stopPropagation();
    const menu = document.querySelector('.menu-content');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const menu = document.querySelector('.menu-content');
    if (!e.target.closest('.menu-content') && !e.target.closest('.menu-dots')) {
        menu.style.display = 'none';
    }
});

// Bookmark system (now saves scene + position)
document.getElementById('bookmark-btn')?.addEventListener('click', () => {
    localStorage.setItem('trinkaread_bookmark', JSON.stringify({
        scene: currentScene,
        position: window.pageYOffset
    }));
    alert(`Bookmarked Scene ${currentScene}`);
});

// Sound toggle
document.getElementById('sound-toggle')?.addEventListener('click', function() {
    this.textContent = this.textContent.includes('ON') ? 'Sound: OFF' : 'Sound: ON';
    // Add sound logic here later
});

// Resume from bookmark (runs on load)
const bookmark = localStorage.getItem('trinkaread_bookmark');
if (bookmark) {
    try {
        const { scene, position } = JSON.parse(bookmark);
        if (sceneOrder.includes(scene)) {
            loadScene(scene).then(() => {
                window.scrollTo(0, position);
            });
        }
    } catch (e) {
        console.warn("Invalid bookmark data");
    }
}