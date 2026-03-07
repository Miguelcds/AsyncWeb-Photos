import "./Lightbox.css";
import { CLIENT_ID, state, toggleFavorite, isFavorite } from "../../main.js";

export const Lightbox = () => `
<div class="lightbox-backdrop" id="lightboxBackdrop">
  <div class="lb-inner">
    <img id="lbImg" src="" alt="" />

    <div class="lb-info">
      <div class="lb-author">
        <strong id="lbName">Fotógrafo</strong>
        <span   id="lbDesc">—</span>
      </div>
      <div class="lb-actions">
        <button class="lb-btn lb-btn-save" id="lbSaveBtn">🤍 Guardar</button>
        <a      class="lb-btn lb-btn-dl"   id="lbDlBtn" download target="_blank">↓ Descargar</a>
      </div>
    </div>

    <button class="lb-close" id="lbClose">✕</button>
  </div>
</div>
`;

// ─── Lógica del lightbox ─────────────────────────────────────────
// Se llama después de que el HTML esté en el DOM
let initialized = false;

function initLightboxEvents() {
  if (initialized) return;
  initialized = true;

  document.getElementById("lbClose").addEventListener("click", closeLightbox);
  document.getElementById("lightboxBackdrop").addEventListener("click", e => {
    if (e.target === document.getElementById("lightboxBackdrop")) closeLightbox();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeLightbox();
  });
  document.getElementById("lbSaveBtn").addEventListener("click", () => {
    if (!state.currentPhoto) return;
    toggleFavorite(state.currentPhoto);
    updateSaveBtn();
  });
}

export function openLightbox(photo) {
  state.currentPhoto = photo;
  initLightboxEvents();

  document.getElementById("lbImg").src   = photo.urls.regular;
  document.getElementById("lbImg").alt   = photo.alt_description || "";
  document.getElementById("lbName").textContent = photo.user?.name  || "Desconocido";
  document.getElementById("lbDesc").textContent = photo.alt_description || "Sin descripción";
  document.getElementById("lbDlBtn").href =
    (photo.links?.download || photo.urls.full) + `?client_id=${CLIENT_ID}`;

  updateSaveBtn();

  document.getElementById("lightboxBackdrop").classList.add("open");
  document.body.style.overflow = "hidden";
}

export function closeLightbox() {
  document.getElementById("lightboxBackdrop").classList.remove("open");
  document.body.style.overflow = "";
  state.currentPhoto = null;
}

function updateSaveBtn() {
  const btn = document.getElementById("lbSaveBtn");
  if (!btn || !state.currentPhoto) return;
  const saved = isFavorite(state.currentPhoto.id);
  btn.textContent = saved ? "❤️ Guardado" : "🤍 Guardar";
  btn.classList.toggle("saved", saved);
}