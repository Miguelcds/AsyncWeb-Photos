import "./Main.css";

// Genera los 4 contenedores de página vacíos.
// Cada página (Home, Explore, Favorites, About) inyecta
// su propio HTML dentro cuando el router la activa.
export const Main = () => `
  <div class="page" id="page-home"></div>
  <div class="page" id="page-explore"></div>
  <div class="page" id="page-favorites"></div>
  <div class="page" id="page-about"></div>
`;


// const acces = `https://api.unsplash.com/search/photos?query=gatos&per_page=20&client_id=9ZTYaTHYYbWrLsJ1o6MagjlViJ1RfNNUKbVxJasOx7I`



