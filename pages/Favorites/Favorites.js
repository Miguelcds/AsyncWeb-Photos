import "./Favorites.css";
import { state, toggleFavorite, escapeHtml } from "../../main.js";

export function initFavorites() {
  const container = document.getElementById("page-favorites");

  // Siempre re-renderiza porque los favoritos cambian
  container.innerHTML = `
    <div class="favorites-header">
      <p class="section-label">Mi colección</p>
      <h2 class="section-title">Mis <em>favoritos</em></h2>
    </div>

    <div class="empty-fav" id="emptyFav" style="display:none">
      <div class="icon">🤍</div>
      <h3>Aún no tienes favoritos</h3>
      <p>Explora imágenes y presiona el corazón para guardarlas aquí</p>
      <button class="btn-primary" onclick="__showPage('explore')">Ir a explorar</button>
    </div>

    <div class="masonry-wrap" id="favWrap" style="display:none">
      <div class="masonry-grid" id="favGrid"></div>
    </div>
  `;

  renderFavGrid();
}

function renderFavGrid() {
  const grid  = document.getElementById("favGrid");
  const empty = document.getElementById("emptyFav");
  const wrap  = document.getElementById("favWrap");

  if (!state.favorites.length) {
    empty.style.display = "block";
    wrap.style.display  = "none";
    return;
  }

  empty.style.display = "none";
  wrap.style.display  = "block";
  grid.innerHTML      = "";

  state.favorites.forEach((photo, i) => {
    const item = document.createElement("div");
    item.className = "masonry-item";
    item.style.animationDelay = `${i * 0.05}s`;
    item.innerHTML = `
      <img src="${photo.urls.small}" alt="${escapeHtml(photo.alt_description)}" loading="lazy" />
      <div class="item-overlay">
        <div class="item-actions">
          <button class="item-btn btn-heart loved" data-id="${photo.id}">❤️</button>
        </div>
        <span class="item-author">${escapeHtml(photo.user?.name || "")}</span>
      </div>
    `;

    item.addEventListener("click", e => {
      if (!e.target.closest(".item-btn")) {
        window.__openLightbox(photo);
      }
    });

    item.querySelector(".btn-heart").addEventListener("click", e => {
      e.stopPropagation();
      toggleFavorite(photo);
      // Re-renderiza la página de favoritos
      renderFavGrid();
    });

    grid.appendChild(item);
  });
}
