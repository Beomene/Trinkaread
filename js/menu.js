// Menu Toggle
document.querySelector('.menu-dots, .mobile-menu').addEventListener('click', (e) => {
    const menu = document.querySelector('.menu-content');
    if (menu) menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
});

// Bookmark System
if (document.getElementById('bookmark-btn')) {
    document.getElementById('bookmark-btn').addEventListener('click', () => {
        localStorage.setItem('trinkaread_bookmark', window.pageYOffset);
        alert('Progress saved!');
    });
}