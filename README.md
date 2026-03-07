# Pintarest 🌸

Aplicación de búsqueda visual de imágenes construida con **JavaScript vanilla + Vite**, conectada a la API de Unsplash. Proyecto de portfolio desarrollado para practicar arquitectura de componentes, consumo de APIs REST y diseño UI responsive.

---

## 🖼️ Demo

> Busca cualquier término y explora millones de fotografías de alta calidad al instante.

---

## ✨ Funcionalidades

- 🔍 **Búsqueda en tiempo real** con chips de categorías rápidas
- 🗂️ **Multipágina SPA** — Home, Explorar, Favoritos y Acerca
- 🖼️ **Masonry grid** estilo Pinterest con columnas CSS dinámicas
- 💡 **Lightbox** al clicar cualquier imagen, con info del autor
- 🤍 **Sistema de favoritos** con badge en el navbar y persistencia en sesión
- ⚡ **Skeleton loading** animado mientras cargan las fotos
- 📥 **Descarga directa** de imágenes desde el overlay y el lightbox
- 📄 **Paginación** con botón "Cargar más"
- ⌨️ Navegación por teclado: `Enter` para buscar, `Escape` para cerrar el lightbox
- 📱 **Totalmente responsive** desde 320px

---

## 🛠️ Stack tecnológico

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura semántica |
| CSS3 | Variables, Grid, Masonry, animaciones |
| JavaScript ES6+ | ES Modules, async/await, estado global |
| [Vite](https://vitejs.dev/) | Bundler y servidor de desarrollo |
| [Unsplash API](https://unsplash.com/developers) | Fuente de imágenes |

---

## 📁 Estructura del proyecto

```
pintarest/
├── index.html
├── main.js                    # Router, estado global y utilidades
├── style.css                  # Reset, variables y estilos compartidos
│
├── components/
│   ├── Header/                # Navbar con navegación y badge de favoritos
│   │   ├── Header.js
│   │   └── Header.css
│   ├── Footer/                # Footer fijo con créditos
│   │   ├── Footer.js
│   │   └── Footer.css
│   ├── Main/                  # Shell con los 4 contenedores de página
│   │   ├── Main.js
│   │   └── Main.css
│   └── Lightbox/              # Modal de imagen con acciones
│       ├── Lightbox.js
│       └── Lightbox.css
│
└── pages/
    ├── Home/                  # Hero + colecciones por categoría
    ├── Explore/               # Búsqueda, chips, masonry y paginación
    ├── Favorites/             # Colección personal guardada en sesión
    └── About/                 # Descripción del proyecto y stack
```

---

## 🚀 Instalación y uso

**1. Clona el repositorio**
```bash
git clone https://github.com/tu-usuario/pintarest.git
cd pintarest
```

**2. Instala dependencias**
```bash
npm install
```

**3. Configura tu API key de Unsplash**

Regístrate en [unsplash.com/developers](https://unsplash.com/developers), crea una app y copia tu `Access Key`. Luego en `main.js`:

```js
export const CLIENT_ID = "TU_ACCESS_KEY_AQUI";
```

**4. Arranca el servidor de desarrollo**
```bash
npm run dev
```

**5. Build para producción**
```bash
npm run build
```

---

## 🔑 Configuración de la API

Este proyecto usa la [Unsplash API](https://unsplash.com/developers) en su plan gratuito (50 peticiones/hora en modo demo).

| Endpoint | Uso |
|---|---|
| `GET /search/photos` | Búsqueda de imágenes por término |
| `GET /photos/random` | Imagen aleatoria para las tarjetas de categoría |

---

## 📸 Créditos

Todas las imágenes pertenecen a sus respectivos autores en [Unsplash](https://unsplash.com).

---

## 📄 Licencia

MIT — libre para usar, modificar y distribuir.
