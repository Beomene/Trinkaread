document.querySelector('.menu-dots').addEventListener('click', () => {
    const menu = document.querySelector('.menu-content');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
});

document.getElementById('bookmark-btn')?.addEventListener('click', () => {
    localStorage.setItem('trinkaread_bookmark', JSON.stringify({
        scene: currentScene,
        position: window.pageYOffset
    }));
    alert('Progress saved!');
});