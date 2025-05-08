class TrinkareadEngine {
  constructor() {
    this.scenes = [];
    this.currentScene = 0;
    this.sceneHeight = 1600;
    this.init();
  }

  async init() {
    await this.loadSceneSequence('01_01');
    this.renderScene(0);
    this.setupInertialScroll();
    this.hideLoader();
  }

  async loadSceneSequence(chapterPage) {
    this.scenes = [
      `${chapterPage}_001`,
      `${chapterPage}_002`,
      `${chapterPage}_003`,
      `${chapterPage}_004`,
      `${chapterPage}_005`
    ];
  }

  async renderScene(index) {
    const sceneId = this.scenes[index];
    const config = await this.loadConfig(sceneId);
    const text = await this.loadText(config.text);
    
    document.getElementById('page-container').innerHTML = `
      <div class="block" data-scene="${sceneId}">
        ${this.generateLayers(config)}
        <div class="text-cutout">
          ${text}
        </div>
      </div>
    `;
    
    this.currentScene = index;
    window.scrollTo(0, this.sceneHeight * index);
  }

  async loadConfig(sceneId) {
    const res = await fetch(`assets/blocks/${sceneId}/config.json`);
    return await res.json();
  }

  async loadText(textPath) {
    const res = await fetch(textPath);
    return await res.text();
  }

  generateLayers(config) {
    let layers = '';
    
    // Standard layers
    ['sky', 'hyperdistal', 'distal', 'close', 'closer'].forEach(layer => {
      if (config.layers[layer]) {
        layers += `
          <div class="${layer}-layer parallax-layer">
            <img src="${config.layers[layer]}" alt="${layer} layer">
          </div>
        `;
      }
    });

    // Stickers
    if (config.stickers) {
      config.stickers.forEach(sticker => {
        layers += `
          <img class="sticker" src="${sticker.image}" 
               style="${sticker.side || 'left'}: 50px; 
                      top: ${sticker.y_offset || '30%'};">
        `;
      });
    }

    return layers;
  }

  setupInertialScroll() {
    let velocity = 0;
    let damping = 0.93;
    let isScrolling = false;

    window.addEventListener('wheel', (e) => {
      e.preventDefault();
      velocity += e.deltaY * 0.2;
      if (!isScrolling) requestAnimationFrame(scrollTick);
    }, { passive: false });

    const scrollTick = () => {
      isScrolling = true;
      velocity *= damping;
      window.scrollBy(0, velocity);
      
      if (Math.abs(velocity) > 0.5) {
        requestAnimationFrame(scrollTick);
      } else {
        isScrolling = false;
      }
    };
  }

  hideLoader() {
    document.querySelector('.loader').style.display = 'none';
  }
}

// Initialize
const engine = new TrinkareadEngine();