import "./Home.css";
import { fetchRandomPhoto, escapeHtml } from "../../main.js";

const CATEGORIES = [
  { name: "Naturaleza",   query: "nature" },
  { name: "Arquitectura", query: "architecture" },
  { name: "Viaje",        query: "travel" },
  { name: "Comida",       query: "food" },
  { name: "Animales",     query: "animals" },
  { name: "Minimal",      query: "minimal" },
  { name: "Ciudad",       query: "city night" },
  { name: "Abstracto",    query: "abstract art" },
];

let homeReady = false;

export function initHome() {
  const container = document.getElementById("page-home");

  // Solo renderiza una vez
  if (homeReady) return;
  homeReady = true;

  container.innerHTML = `
    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <p class="hero-eyebrow">Descubre el mundo visual</p>
        <h1 class="hero-title">Inspírate<br>con cada <em>imagen</em></h1>
        <p class="hero-sub">Explora millones de fotografías de alta calidad,<br>guarda tus favoritas y crea tu colección.</p>
        <div class="hero-actions">
          <button class="btn-primary"    onclick="__showPage('explore')">Empezar a explorar</button>
          <button class="btn-secondary"  onclick="__showPage('favorites')">Mis favoritos</button>
        </div>
      </div>
    </section>

    <!-- Categorías -->
    <section class="categories-section">
      <p class="section-label">Explora por tema</p>
      <h2 class="section-title">Colecciones <em>populares</em></h2>
      <div class="categories-grid" id="categoriesGrid"></div>
    </section>
  `;

  loadCategoryCards();
}

async function loadCategoryCards() {
  const grid = document.getElementById("categoriesGrid");
  if (!grid) return;

  // Renderiza las tarjetas con fondo de color mientras cargan las imágenes
  CATEGORIES.forEach(cat => {
    const card = document.createElement("div");
    card.className = "category-card";
    card.style.background = "var(--blush)";
    card.innerHTML = `<div class="cat-overlay"><span class="cat-name">${cat.name}</span></div>`;
    card.addEventListener("click", () => {
      // Navega a Explore y lanza la búsqueda
      __showPage("explore");
      window.__exploreSearch(cat.query);
    });
    grid.appendChild(card);

    // Carga imagen de fondo de forma asíncrona
    fetchRandomPhoto(cat.query)
      .then(photo => {
        const img = document.createElement("img");
        img.className = "cat-img";
        img.src       = photo.urls.small;
        img.alt       = cat.name;
        card.insertBefore(img, card.querySelector(".cat-overlay"));
      })
      .catch(() => {}); // Si falla, queda el color de fondo
  });
}