import "./About.css";

let aboutReady = false;

export function initAbout() {
  if (aboutReady) return;
  aboutReady = true;

  document.getElementById("page-about").innerHTML = `
    <div class="about-wrap">
      <span class="about-badge">Portfolio Project</span>

      <h1 class="about-title">Hecho con<br><em>curiosidad</em> y código</h1>

      <p class="about-body">
        Pintarest es una aplicación de búsqueda visual construida como proyecto de portfolio.
        Conecta con la API de Unsplash para ofrecer acceso a millones de fotografías de alta calidad,
        permitiendo explorar, descubrir y guardar imágenes que te inspiren.
      </p>
      <p class="about-body">
        El proyecto nació con el objetivo de practicar el consumo de APIs REST, la manipulación del DOM,
        diseño responsive y arquitectura de componentes en JavaScript moderno (ES Modules + Vite).
      </p>

      <div class="about-divider"></div>

      <p class="section-label">Stack tecnológico</p>
      <div class="tech-stack">
        <span class="tech-tag">HTML5</span>
        <span class="tech-tag">CSS3</span>
        <span class="tech-tag">JavaScript ES6+</span>
        <span class="tech-tag">Unsplash API</span>
        <span class="tech-tag">Vite</span>
        <span class="tech-tag">CSS Masonry</span>
      </div>

      <div class="about-divider"></div>

      <p class="section-label">Funcionalidades</p>
      <div class="tech-stack">
        <span class="tech-tag">🔍 Búsqueda en tiempo real</span>
        <span class="tech-tag">🤍 Sistema de favoritos</span>
        <span class="tech-tag">🖼️ Lightbox con info</span>
        <span class="tech-tag">📥 Descarga de imágenes</span>
        <span class="tech-tag">⚡ Skeleton loading</span>
        <span class="tech-tag">📱 Totalmente responsive</span>
        <span class="tech-tag">🗂️ Categorías rápidas</span>
        <span class="tech-tag">⌨️ Buscar con Enter</span>
      </div>
    </div>
  `;
}