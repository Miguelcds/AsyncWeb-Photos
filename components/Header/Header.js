import "./Header.css";

export const Header = () => `
<nav>
  <button class="nav-logo" onclick="__showPage('home')">
    <div class="logo-mark">P</div>
    <span class="logo-text">Pintarest</span>
  </button>

  <div class="nav-links">
    <button class="nav-link active" data-page="home"      onclick="__showPage('home')">
      <span>Inicio</span>
    </button>
    <button class="nav-link"        data-page="explore"   onclick="__showPage('explore')">
      <span>Explorar</span>
    </button>
    <button class="nav-link"        data-page="favorites" onclick="__showPage('favorites')">
      <span>Favoritos</span>
      <span class="fav-badge" id="favCount"></span>
    </button>
    <button class="nav-link"        data-page="about"     onclick="__showPage('about')">
      <span>Acerca</span>
    </button>
  </div>
</nav>
`;
