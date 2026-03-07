import "./Explore.css";
import {
  CLIENT_ID, state,
  fetchPhotos,
  toggleFavorite, isFavorite,
  escapeHtml, showSkeletons, hideSkeletons,
} from "../../main.js";

const CHIPS = [
  "Space","Nature","Architecture","Ocean","Forest",
  "City","Food","Minimal","Animals","Flowers","Sunset","Portrait",
];

export function initExplore() {
  const container = document.getElementById("page-explore");

  container.innerHTML = `
    <div class="explore-header">
      <p class="section-label">Búsqueda</p>
      <h2 class="section-title" id="exploreTitle">Descubriendo <em>el espacio</em></h2>

      <div class="search-bar-wrap">
        <input type="text" id="searchInput" placeholder="Busca lo que imaginas…" autocomplete="off" />
        <button class="search-btn" id="searchBtn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2.5"
               stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          Buscar
        </button>
      </div>

      <div class="chips-wrap" id="chipsWrap"></div>
    </div>

    <div id="skeletonArea"></div>

    <div class="masonry-wrap" id="exploreResults" style="display:none">
      <p class="result-info" id="resultInfo"></p>
      <div class="masonry-grid" id="masonryGrid"></div>
      <div class="load-more-wrap" id="loadMoreWrap" style="display:none">
        <button class="load-more-btn" id="loadMoreBtn">Cargar más imágenes</button>
      </div>
    </div>

    <div class="no-results" id="noResults" style="display:none">
      <div class="emoji">🔍</div>
      <h3>Sin resultados</h3>
      <p>Prueba con otra búsqueda o elige una categoría</p>
    </div>
  `;

  renderChips();
  bindSearchEvents();

  // Búsqueda inicial
  searchPhotos("space");

  // Expone la función para que Home.js pueda llamarla
  window.__exploreSearch = searchPhotos;
}

// ─── BÚSQUEDA ────────────────────────────────────────────────────
export async function searchPhotos(query, page = 1) {
  state.currentQuery = query;
  state.currentPage  = page;

  if (page === 1) {
    document.getElementById("exploreResults").style.display = "none";
    document.getElementById("noResults").style.display      = "none";
    showSkeletons("skeletonArea");
    updateTitle(query);
    updateFooter(query);
  }

  try {
    const data = await fetchPhotos(query, page);
    state.totalPages = data.total_pages || 1;
    hideSkeletons("skeletonArea");

    if (!data.results?.length) {
      document.getElementById("noResults").style.display = "block";
      return;
    }

    renderPhotos(data.results, page);

    document.getElementById("exploreResults").style.display = "block";
    document.getElementById("resultInfo").textContent =
      `${data.total.toLocaleString()} imágenes encontradas para "${query}"`;

    const lmWrap = document.getElementById("loadMoreWrap");
    lmWrap.style.display = state.currentPage < state.totalPages ? "block" : "none";

  } catch {
    hideSkeletons("skeletonArea");
    document.getElementById("noResults").style.display = "block";
  }
}

// ─── RENDER FOTOS ────────────────────────────────────────────────
function renderPhotos(photos, page) {
  const grid = document.getElementById("masonryGrid");
  if (page === 1) grid.innerHTML = "";

  photos.forEach((photo, i) => {
    const fav = isFavorite(photo.id);
    const item = document.createElement("div");
    item.className = "masonry-item";
    item.style.animationDelay = `${(i % 10) * 0.05}s`;
    item.innerHTML = `
      <img src="${photo.urls.small}" alt="${escapeHtml(photo.alt_description)}" loading="lazy" />
      <div class="item-overlay">
        <div class="item-actions">
          <button class="item-btn btn-heart ${fav ? "loved" : ""}"
                  data-id="${photo.id}">
            ${fav ? "❤️" : "🤍"}
          </button>
          <a class="item-btn btn-dl"
             href="${photo.links.download}?client_id=${CLIENT_ID}"
             download target="_blank">↓</a>
        </div>
        <span class="item-author">${escapeHtml(photo.user.name)}</span>
      </div>
    `;

    // Abrir lightbox al clicar la imagen
    item.addEventListener("click", e => {
      if (!e.target.closest(".item-btn") && !e.target.closest("a")) {
        window.__openLightbox(photo);
      }
    });

    // Toggle favorito
    item.querySelector(".btn-heart").addEventListener("click", e => {
      e.stopPropagation();
      toggleFavorite(photo);
    });

    grid.appendChild(item);
  });
}

// ─── CHIPS ───────────────────────────────────────────────────────
function renderChips() {
  const wrap = document.getElementById("chipsWrap");
  CHIPS.forEach(chip => {
    const btn = document.createElement("button");
    btn.className   = "chip";
    btn.textContent = chip;
    btn.addEventListener("click", () => {
      document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById("searchInput").value = chip;
      searchPhotos(chip);
    });
    wrap.appendChild(btn);
  });
}

// ─── EVENTOS ─────────────────────────────────────────────────────
function bindSearchEvents() {
  document.getElementById("searchBtn").addEventListener("click", runSearch);
  document.getElementById("searchInput").addEventListener("keydown", e => {
    if (e.key === "Enter") runSearch();
  });
  document.getElementById("loadMoreBtn").addEventListener("click", () => {
    if (state.currentPage < state.totalPages) {
      searchPhotos(state.currentQuery, state.currentPage + 1);
    }
  });
}

function runSearch() {
  const val = document.getElementById("searchInput").value.trim();
  if (!val) return;
  document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
  searchPhotos(val);
}

// ─── HELPERS ─────────────────────────────────────────────────────
function updateTitle(query) {
  const el = document.getElementById("exploreTitle");
  if (el) el.innerHTML = `Explorando <em>${escapeHtml(query)}</em>`;
}

function updateFooter(query) {
  const el = document.getElementById("footerQuery");
  if (el) el.textContent = `Buscando: ${query}`;
}
