const contenedor = document.querySelector("#lista-productos");
const titulos = document.querySelectorAll("h2");

function crearTarjeta(producto) {
  const articulo = document.createElement("article");

  articulo.classList.add("tarjeta");
  if (!producto.disponible) {
    articulo.classList.add("agotado");
  }

  articulo.dataset.nombre = producto.nombre;
  articulo.dataset.categoria = producto.categoria;

  const categoriaNombre = producto.categoria === "clasicos" ? "Corte Clásico" :
                          producto.categoria === "modernos" ? "Corte Moderno" : "Diseño con Navaja";
  const icono = producto.categoria === "navaja" ? "📐" : "✂️";

  articulo.innerHTML = `
    <div class="tarjeta-top">
      <span class="categoria-badge">${icono} ${categoriaNombre}</span>
    </div>
    <h3>${producto.nombre}</h3>
    <p class="precio">Bs ${producto.precio.toFixed(2)}</p>
    <p class="stock">${producto.disponible ? `Disponible (${producto.stock} cupos)` : "Agotado temporalmente"}</p>
    <button type="button" class="btn-reservar-corte" data-corte="${producto.nombre}" ${!producto.disponible ? "disabled" : ""}>
      ${producto.disponible ? "Reservar este corte ➔" : "No disponible"}
    </button>
  `;

  return articulo;
}

function render(lista) {
  if (!contenedor) return;
  contenedor.innerHTML = "";

  lista.forEach(producto => {
    contenedor.append(crearTarjeta(producto));
  });

  if (lista.length === 0) {
    contenedor.innerHTML = `
      <div class="mensaje-vacio">
        <p>No se encontraron servicios que coincidan con la búsqueda.</p>
        <button type="button" id="btn-restablecer" class="btn-restablecer">Mostrar todos los cortes</button>
      </div>
    `;
  }
}

// Ejecutamos el render inicial con la lista de la barbería
if (typeof productos !== "undefined" && Array.isArray(productos)) {
  render(productos);
}



