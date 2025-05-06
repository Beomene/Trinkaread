// Menu Toggle
document.querySelector('.menu-dots').addEventListener('click', () => {
    const menu = document.querySelector('.menu-content');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
});

// Sound Toggle
document.getElementById('sound-toggle').addEventListener('click', () => {
    const audio = document.getElementById('ambient-audio');
    const btn = document.getElementById('sound-toggle');
    
    if (audio) {
        if (audio.paused) {
            audio.play();
            btn.textContent = 'Sound: ON';
        } else {
            audio.pause();
            btn.textContent = 'Sound: OFF';
        }
    }
});

// Bookmark System
document.getElementById('bookmark-btn').addEventListener('click', () => {
    localStorage.setItem('trinkaread_bookmark', window.pageYOffset);
    alert('Bookmark saved!');
});

// Load Bookmark
window.addEventListener('load', () => {
    const savedPos = localStorage.getItem('trinkaread_bookmark');
    if (savedPos) {
        window.scrollTo(0, savedPos);
    }
});