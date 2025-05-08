class TrinkareadEngine {
  constructor() {
    this.scenes = [];
    this.currentScene = 0;
    this.textScrollRatio = 0.5;
    this.init();
  }

  async init() {
    await this.loadPage('01_01');
    this.createTextContainer();
    this.renderScenes();
    this.setupParallax();
    this.setupUI();
    this.hideLoader();
  }

  async loadPage(pageId) {
    this.scenes = [
      `${pageId}_001`,
      `${pageId}_002`,
      `${pageId}_003`,
      `${pageId}_004`,
      `${pageId}_005`
    ];
    
    const textRes = await fetch(`assets/blocks/${pageId}_page/text.md`);
    this.fullText = await textRes.text();
  }

  createTextContainer() {
    document.getElementById('page-container').innerHTML = `
      <div class="scenes-container" id="scenes-container"></div>
      <div class="global-text-cutout">
        <div class="text-content">${this.fullText}</div>
      </div>
      <div class="ui-menu">☰</div>
    `;
  }

  async renderScenes() {
    const container = document.getElementById('scenes-container');
    
    for (const sceneId of this.scenes) {
      const config = await this.loadConfig(sceneId);
      const sceneDiv = document.createElement('div');
      sceneDiv.className = 'block';
      sceneDiv.dataset.scene = sceneId;
      sceneDiv.innerHTML = this.generateLayers(config);
      container.appendChild(sceneDiv);
    }

    // Inject page-level stickers
    const stickerConfig = await this.loadConfig('01_01_page');
    stickerConfig.stickers.forEach(sticker => {
      const img = document.createElement('img');
      img.src = sticker.image;
      img.className = `sticker ${sticker.side}`;
      img.style.width = sticker.width;
      img.style.top = sticker.y_offset;
      document.querySelector('.text-content').appendChild(img);
    });
  }

  async loadConfig(sceneId) {
    const res = await fetch(`assets/blocks/${sceneId}/config.json`);
    return await res.json();
  }

  generateLayers(config) {
    let layers = '';
    
    ['sky', 'hyperdistal', 'distal', 'close', 'closer'].forEach(layer => {
      if (config.layers[layer]) {
        layers += `
          <div class="${layer}-layer parallax-layer" data-depth="${layer.charAt(0)}">
            <img src="${config.layers[layer]}" alt="${layer} layer">
          </div>
        `;
      }
    });

    return layers;
  }

  setupParallax() {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      
      document.querySelectorAll('.parallax-layer').forEach(layer => {
        const depth = parseFloat(layer.dataset.depth) * 0.2;
        layer.style.transform = `translateY(${scrollY * (1 - depth)}px)`;
      });
      
      document.querySelector('.global-text-cutout').style.transform = 
        `translateX(-50%) translateY(${scrollY * this.textScrollRatio}px)`;
    });
  }

  setupUI() {
    const menu = document.querySelector('.ui-menu');
    const panel = document.createElement('div');
    panel.className = 'ui-panel';
    panel.innerHTML = `
      <label>Text Opacity: <input type="range" min="0.3" max="1" value="0.6" step="0.1"></label>
      <button class="audio-toggle">Audio: ON</button>
      <a href="https://patreon.com/trinkaread" target="_blank">Support</a>
    `;
    document.body.appendChild(panel);

    menu.addEventListener('click', (e) => {
      e.stopPropagation();
      panel.classList.toggle('visible');
    });

    document.addEventListener('click', () => {
      panel.classList.remove('visible');
    });

    panel.querySelector('input').addEventListener('input', (e) => {
      document.querySelector('.global-text-cutout').style.opacity = e.target.value;
    });

    panel.querySelector('.audio-toggle').addEventListener('click', (e) => {
      const btn = e.target;
      btn.textContent = btn.textContent.includes('ON') ? 'Audio: OFF' : 'Audio: ON';
    });
  }

  hideLoader() {
    document.querySelector('.loader').style.display = 'none';
  }
}

const engine = new TrinkareadEngine();