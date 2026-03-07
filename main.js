import "./style.css";

import { Header }           from "./components/Header/Header.js";
import { Footer }           from "./components/Footer/Footer.js";
import { Main }             from "./components/Main/Main.js";
import { Lightbox }         from "./components/Lightbox/Lightbox.js";
import { initHome }         from "./pages/Home/Home.js";
import { initExplore }      from "./pages/Explore/Explore.js";
import { initFavorites }    from "./pages/Favorites/Favorites.js";
import { initAbout }        from "./pages/About/About.js";

// ─── CONSTANTES ─────────────────────────────────────────────────
export const CLIENT_ID = "9ZTYaTHYYbWrLsJ1o6MagjlViJ1RfNNUKbVxJasOx7I";

// ─── ESTADO GLOBAL ───────────────────────────────────────────────
export const state = {
  favorites:    [],
  currentQuery: "space",
  currentPage:  1,
  totalPages:   1,
  currentPhoto: null,   // foto abierta en lightbox
};

// ─── RENDER INICIAL ──────────────────────────────────────────────
document.getElementById("header").innerHTML   = Header();
document.getElementById("main").innerHTML     = Main();
document.getElementById("lightbox").innerHTML = Lightbox();
document.getElementById("footer").innerHTML   = Footer();

// ─── ROUTER ─────────────────────────────────────────────────────
export function showPage(id) {
  // Oculta todas las páginas
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  // Activa la página pedida
  const page = document.getElementById("page-" + id);
  if (page) page.classList.add("active");

  // Marca el link activo
  document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
  const link = document.querySelector(`[data-page="${id}"]`);
  if (link) link.classList.add("active");

  // Inicializa el contenido según la página
  if (id === "home")      initHome();
  if (id === "favorites") initFavorites();
  if (id === "about")     initAbout();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ─── API: BUSCAR FOTOS ───────────────────────────────────────────
export async function fetchPhotos(query, page = 1) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=20&page=${page}&orientation=squarish&client_id=${CLIENT_ID}`;
  const res  = await fetch(url);
  if (!res.ok) throw new Error("Error en la API");
  return res.json();
}

// ─── API: FOTO ALEATORIA ─────────────────────────────────────────
export async function fetchRandomPhoto(query) {
  const url = `https://api.unsplash.com/photos/random?query=${query}&client_id=${CLIENT_ID}`;
  const res  = await fetch(url);
  if (!res.ok) throw new Error("Error en la API");
  return res.json();
}

// ─── FAVORITOS ───────────────────────────────────────────────────
export function toggleFavorite(photo) {
  const idx = state.favorites.findIndex(f => f.id === photo.id);
  if (idx === -1) {
    state.favorites.push(photo);
  } else {
    state.favorites.splice(idx, 1);
  }
  updateFavBadge();
  refreshHeartBtns(photo.id);
}

export function isFavorite(id) {
  return state.favorites.some(f => f.id === id);
}

function updateFavBadge() {
  const badge = document.getElementById("favCount");
  if (!badge) return;
  if (state.favorites.length > 0) {
    badge.style.display = "inline-flex";
    badge.textContent   = state.favorites.length;
  } else {
    badge.style.display = "none";
  }
}

function refreshHeartBtns(id) {
  const fav = isFavorite(id);
  document.querySelectorAll(`.btn-heart[data-id="${id}"]`).forEach(btn => {
    btn.classList.toggle("loved", fav);
    btn.textContent = fav ? "❤️" : "🤍";
  });
}

// ─── UTILS ───────────────────────────────────────────────────────
export function escapeHtml(s) {
  return String(s || "")
    .replace(/&/g,"&amp;").replace(/</g,"&lt;")
    .replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

export function showSkeletons(containerId) {
  const heights = [200,280,170,320,240,190,260,210,300,180,230,270,190,340,220];
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `<div class="skeleton-grid">${
    heights.map(h => `<div class="skeleton-item" style="height:${h}px"></div>`).join("")
  }</div>`;
}

export function hideSkeletons(containerId) {
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = "";
}

// ─── LIGHTBOX (acceso global) ────────────────────────────────────
import { openLightbox } from "./components/Lightbox/Lightbox.js";
window.__openLightbox = openLightbox;
window.__toggleFavorite = toggleFavorite;
window.__showPage = showPage;

// ─── ARRANQUE ───────────────────────────────────────────────────
showPage("home");
initExplore();      // prepara la página Explore (chips + búsqueda inicial)