/* Layer Base Styles */
[class*="-layer"] {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    will-change: transform;
    backface-visibility: hidden;
}

/* Z-Index Hierarchy */
.sky-layer { z-index: 1; }
.hyperdistal-layer { z-index: 2; }
.distal-layer { z-index: 3; }
.close-layer { z-index: 4; }
.closer-layer { z-index: 5; }
.text-container { z-index: 6; }
.sticker-layer { z-index: 7; }
.proximal-layer { z-index: 8; }
.frame-layer { z-index: 9; }

/* Image Handling */
[class*="-layer"] img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.frame-layer img {
    object-fit: contain;
    padding: 100px;
    pointer-events: none;
}

/* Text Container */
.text-container {
    position: relative;
    width: 80%;
    max-width: 800px;
    margin: 0 auto;
    padding: 100vh 0 50vh;
}

.text-content {
    background: rgba(0, 0, 0, 0.6);
    padding: 2.5rem;
    border-radius: 10px;
    line-height: 1.8;
    font-size: 1.1rem;
    backdrop-filter: blur(2px);
}

.text-content h1, 
.text-content h2, 
.text-content h3 {
    margin-bottom: 1.5rem;
    line-height: 1.3;
}

.text-content p {
    margin-bottom: 1.5rem;
}

/* Stickers */
.sticker {
    position: absolute;
    max-width: 40%;
    height: auto;
    shape-margin: 1.5rem;
    z-index: 7;
}

.sticker-left {
    float: left;
    margin-right: 2rem;
    margin-bottom: 1rem;
    shape-outside: margin-box;
}

.sticker-right {
    float: right;
    margin-left: 2rem;
    margin-bottom: 1rem;
    shape-outside: margin-box;
}

/* Mobile Landscape Recommendation */
.orientation-alert {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.95);
    z-index: 999;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    text-align: center;
    padding: 20px;
}

.orientation-alert h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
}

.orientation-alert p {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
}

.orientation-alert small {
    opacity: 0.8;
}

@media (max-width: 768px) and (orientation: portrait) {
    .orientation-alert {
        display: flex;
    }
    
    .text-container {
        width: 90%;
        padding: 80vh 0 40vh;
    }
    
    .text-content {
        padding: 1.5rem;
        font-size: 1rem;
    }
}