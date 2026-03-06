import "./Header.css"

export const  Header = () => `
<div class="headerDiv">
<img src="logo.png" alt="Image of Pintarest">
<h1> Pintarest</h1>
       
</div>
      <nav>
        <a href="#">Inicio</a>
        <a href="#"> Contacto</a>

        <div class="divInput">
          <input type="text" id="searchInput" placeholder="Que buscas..."/>
          <button id="searchBtn"> Buscar </button>
        </div>
      </nav>
`