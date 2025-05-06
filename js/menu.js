// Menu toggle functionality
document.querySelector('.menu-dots').addEventListener('click', (e) => {
    e.stopPropagation();
    const menu = document.querySelector('.menu-content');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const menu = document.querySelector('.menu-content');
    if (menu.style.display === 'flex' && !e.target.closest('.menu-content') && !e.target.closest('.menu-dots')) {
        menu.style.display = 'none';
    }
});

// Sound toggle functionality
document.getElementById('sound-toggle')?.addEventListener('click', () => {
    const btn = document.getElementById('sound-toggle');
    if (btn.textContent.includes('ON')) {
        btn.textContent = 'Sound: OFF';
        // Implement sound off logic here
    } else {
        btn.textContent = 'Sound: ON';
        // Implement sound on logic here
    }
});

// Bookmark system
document.getElementById('bookmark-btn')?.addEventListener('click', () => {
    const position = window.pageYOffset;
    const scene = currentScene;
    
    localStorage.setItem('trinkaread_bookmark', JSON.stringify({
        scene,
        position
    }));
    
    alert('Your place has been bookmarked!');
});

// Check for bookmark on load
window.addEventListener('load', () => {
    const bookmark = localStorage.getItem('trinkaread_bookmark');
    if (bookmark) {
        try {
            const { scene, position } = JSON.parse(bookmark);
            if (scene && position) {
                // Optional: Add a "Resume from bookmark" button
                console.log('Bookmark found:', scene, position);
            }
        } catch (e) {
            console.warn('Invalid bookmark data');
        }
    }
});

// Next chapter button
document.querySelector('.next-chapter-btn')?.addEventListener('click', () => {
    // Implement chapter navigation logic here
    alert('Next chapter functionality will be implemented here');
});