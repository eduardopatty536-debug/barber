// ── 1. LOS ELEMENTOS QUE SE VAN A ESCUCHAR ──────────────────────────────
const buscador = document.querySelector("#buscador");
const filtros = document.querySelector("#filtros");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario-reserva") || document.querySelector("form");
const contenedorTarjetas = document.querySelector("#lista-productos");
const alertaReserva = document.querySelector("#alerta-reserva");

let categoriaActiva = "todos";
let textoBuscado = "";

// ── 2. UTILIDAD PARA NORMALIZAR TEXTO (sin acentos, minúsculas, singular) ──
function normalizar(texto) {
  if (!texto) return "";
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function raizPalabra(palabra) {
  // Quitar la 's' final en palabras de más de 3 letras para coincidir plurales (cortes -> corte)
  if (palabra.length > 3 && palabra.endsWith("s")) {
    return palabra.slice(0, -1);
  }
  return palabra;
}

function coincideConBusqueda(producto, busqueda) {
  if (!busqueda) return true;

  const terminoLimpio = normalizar(busqueda);
  const nombreLimpio = normalizar(producto.nombre);
  const categoriaLimpia = normalizar(producto.categoria);

  // 1. Coincidencia directa en nombre o categoría
  if (nombreLimpio.includes(terminoLimpio) || categoriaLimpia.includes(terminoLimpio)) {
    return true;
  }

  // 2. Coincidencia por palabras clave (ej: "cortes que realizamos", "diseño navaja")
  const palabrasBusqueda = terminoLimpio
    .split(/\s+/)
    .filter(p => p.length >= 3 && !["que", "los", "las", "con", "por", "para", "una", "uno"].includes(p));

  if (palabrasBusqueda.length === 0) {
    return nombreLimpio.includes(terminoLimpio);
  }

  // Si alguna palabra clave coincide (con raíz en singular o completa)
  return palabrasBusqueda.some(palabra => {
    const raiz = raizPalabra(palabra);
    return nombreLimpio.includes(palabra) ||
      nombreLimpio.includes(raiz) ||
      categoriaLimpia.includes(palabra) ||
      categoriaLimpia.includes(raiz);
  });
}

// ── 3. FUNCIÓN PRINCIPAL QUE DECIDE QUÉ MOSTRAR ─────────────────────────
function actualizar() {
  if (typeof productos === "undefined" || !Array.isArray(productos)) {
    console.error("Variable 'productos' no está definida o no es un arreglo.");
    if (resultado) resultado.textContent = "0 de 0 servicios";
    if (typeof render === "function") render([]);
    return;
  }

  const visibles = productos
    .filter(p => categoriaActiva === "todos" || p.categoria === categoriaActiva)
    .filter(p => coincideConBusqueda(p, textoBuscado));

  if (typeof render === "function") {
    render(visibles);
  }

  const total = productos.length;
  if (resultado) {
    resultado.textContent = `Mostrando ${visibles.length} de ${total} servicios`;
  }
}

// Ejecutar al cargar
actualizar();

// ── 4. EVENTO input EN EL BUSCADOR ──────────────────────────────────────
if (buscador) {
  buscador.addEventListener("input", (event) => {
    textoBuscado = event.target.value;
    actualizar();
  });
}

// ── 5. DELEGACIÓN DE EVENTOS EN FILTROS ──────────────────────────────────
if (filtros) {
  filtros.addEventListener("click", (event) => {
    const boton = event.target.closest("button");
    if (!boton) return;

    categoriaActiva = boton.dataset.categoria || "todos";

    filtros.querySelectorAll("button").forEach(b => b.classList.remove("activo"));
    boton.classList.add("activo");

    actualizar();
  });
}

// ── 6. DELEGACIÓN DE EVENTOS EN LAS TARJETAS (RESERVAR CORTE Y RESTABLECER) ──
if (contenedorTarjetas) {
  contenedorTarjetas.addEventListener("click", (event) => {
    // Si hace click en "Reservar este corte"
    const btnReservar = event.target.closest(".btn-reservar-corte");
    if (btnReservar) {
      const nombreCorte = btnReservar.dataset.corte;
      const selectServicio = document.querySelector("#servicio-elegido");
      if (selectServicio && nombreCorte) {
        selectServicio.value = nombreCorte;
      }

      const seccionPedido = document.querySelector("#pedido");
      if (seccionPedido) {
        seccionPedido.scrollIntoView({ behavior: "smooth" });
        const inputNombre = document.querySelector("#nombre");
        if (inputNombre) inputNombre.focus();
      }
      return;
    }

    // Si hace click en "Mostrar todos los cortes" (cuando no hubo resultados)
    const btnRestablecer = event.target.closest("#btn-restablecer");
    if (btnRestablecer) {
      if (buscador) buscador.value = "";
      textoBuscado = "";
      categoriaActiva = "todos";
      if (filtros) {
        filtros.querySelectorAll("button").forEach(b => b.classList.remove("activo"));
        const btnTodos = filtros.querySelector('[data-categoria="todos"]');
        if (btnTodos) btnTodos.classList.add("activo");
      }
      actualizar();
    }
  });
}

// ── 7. EL EVENTO submit Y preventDefault EN EL FORMULARIO ───────────────
if (formulario) {
  formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!formulario.reportValidity()) {
      return;
    }

    const fechaInput = formulario.querySelector("#fecha");
    const hoy = new Date().toISOString().slice(0, 10);
    if (fechaInput && fechaInput.value < hoy) {
      fechaInput.setCustomValidity("La fecha de reserva no puede ser anterior a hoy.");
      fechaInput.reportValidity();
      fechaInput.addEventListener("input", () => fechaInput.setCustomValidity(""), { once: true });
      return;
    }

    const datos = Object.fromEntries(new FormData(formulario));
    console.log("Reserva recibida:", datos);

    // Mostrar confirmación visual en el formulario
    if (alertaReserva) {
      alertaReserva.hidden = false;
      alertaReserva.innerHTML = `
        <strong>¡Reserva Registrada con Éxito!</strong><br>
        Gracias <strong>${datos.nombre}</strong>. Hemos agendado tu cita para <strong>${datos.servicio || "tu corte"}</strong> el día <strong>${datos.fecha}</strong> a las <strong>${datos.hora || "hora acordada"}</strong>.<br>
        Te contactaremos al teléfono <strong>${datos.telefono}</strong> para confirmar tu turno.
      `;
      alertaReserva.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    if (resultado) {
      resultado.textContent = `Última reserva: ${datos.nombre} (${datos.servicio || "Corte"})`;
    }

    formulario.reset();
  });
}

// ── 8. EXPRESIONES REGULARES DE VALIDACIÓN ──────────────────────────────
const PATRONES = {
  telefono: /^[0-9]{7,8}$/,
  correo: /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i,
};
