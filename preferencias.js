/* ═════════════════════════════════════════════════════════════════════════
   DEMO DEL DÍA 13 - Web Storage y Geolocation

   Hoy se responde la pregunta que quedó abierta el Día 5: al recargar, los
   cambios desaparecían, porque JavaScript modificaba el DOM y no el archivo.

   localStorage es el lugar donde el navegador guarda datos de una página
   ENTRE VISITAS. No es un servidor: vive en la máquina del usuario, y otro
   usuario en otra computadora no ve nada de esto.
   ═════════════════════════════════════════════════════════════════════════ */

// ── 1. localStorage Y sessionStorage ────────────────────────────────────
// Los dos tienen la misma API. La diferencia es cuánto duran:
//
//   localStorage     persiste. Sigue ahí mañana, y el mes que viene.
//   sessionStorage   muere al cerrar la pestaña.
//
// Cuatro métodos, y son todos:
//   setItem(clave, valor)   guardar
//   getItem(clave)          leer. Devuelve null si no existe
//   removeItem(clave)       borrar uno
//   clear()                 borrar todo
//
// ⚠️ SOLO GUARDA TEXTO. Esto es lo que más confunde:
//
//     localStorage.setItem("n", 42);
//     localStorage.getItem("n") === 42     // false: es "42", con comillas
//
// Por eso se usa JSON.stringify al guardar y JSON.parse al leer.

const CLAVE = "panaderia:preferencias";

// Un solo objeto con todas las preferencias, bajo una sola clave. Mejor que
// una clave por dato: se lee y se guarda de una vez, y no quedan claves
// sueltas de versiones viejas.
const PREFERENCIAS_POR_DEFECTO = { tema: "oscuro", orden: "nombre" };

// ── 2. LEER CON try/catch ───────────────────────────────────────────────
// El dato guardado puede estar CORRUPTO: lo escribió una versión anterior del
// código, el usuario lo editó a mano en el inspector, o quedó a medias.
//
// JSON.parse de un texto inválido LANZA UN ERROR. Sin try/catch, ese error
// rompe todo el script y la página deja de funcionar entera, no solo las
// preferencias.
//
// La regla: leer de localStorage SIEMPRE dentro de try/catch, y tener un
// valor por defecto listo.
function leerPreferencias() {
  try {
    const texto = localStorage.getItem(CLAVE);
    if (!texto) return { ...PREFERENCIAS_POR_DEFECTO };   // primera visita

    const guardado = JSON.parse(texto);
    // Se mezcla con los valores por defecto: si el objeto guardado es de una
    // versión vieja y le falta una propiedad, igual funciona.
    return { ...PREFERENCIAS_POR_DEFECTO, ...guardado };

  } catch (error) {
    console.warn("Preferencias corruptas, se usan las por defecto:", error.message);
    return { ...PREFERENCIAS_POR_DEFECTO };
  }
}

// Guardar también puede fallar: el usuario puede tener el almacenamiento
// deshabilitado, o estar en modo incógnito, o haber llegado al límite.
function guardarPreferencias(prefs) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(prefs));
    return true;
  } catch (error) {
    console.warn("No se pudo guardar:", error.message);
    return false;
  }
}

// ── 3. APLICAR LO GUARDADO AL CARGAR ────────────────────────────────────
let preferencias = leerPreferencias();

function aplicarPreferencias() {
  // El tema: una clase en el <body>. El CSS decide qué significa.
  document.body.classList.toggle("tema-oscuro", preferencias.tema === "oscuro");

  const boton = document.querySelector("#tema-toggle");
  boton.setAttribute("aria-pressed", preferencias.tema === "oscuro");
  boton.textContent = preferencias.tema === "oscuro" ? "Modo claro" : "Modo oscuro";

  document.querySelector("#orden").value = preferencias.orden;

  document.querySelector("#estado-prefs").textContent =
    `Tema ${preferencias.tema}, ordenado por ${preferencias.orden}.`;
}

aplicarPreferencias();   // al cargar, ANTES de que el usuario toque nada

// ── 4. GUARDAR AL CAMBIAR ───────────────────────────────────────────────
document.querySelector("#tema-toggle").addEventListener("click", () => {
  preferencias.tema = preferencias.tema === "oscuro" ? "claro" : "oscuro";
  guardarPreferencias(preferencias);
  aplicarPreferencias();
});

document.querySelector("#orden").addEventListener("change", (event) => {
  preferencias.orden = event.target.value;
  guardarPreferencias(preferencias);
  aplicarPreferencias();
});

// Dar la forma de BORRAR lo guardado no es un extra: es parte de tratar bien
// al usuario. Si una página guarda cosas, tiene que dejar borrarlas.
document.querySelector("#olvidar").addEventListener("click", () => {
  localStorage.removeItem(CLAVE);
  preferencias = { ...PREFERENCIAS_POR_DEFECTO };
  aplicarPreferencias();
  document.querySelector("#estado-prefs").textContent = "Preferencias olvidadas.";
});

// ── 5. LO QUE NUNCA VA EN localStorage ──────────────────────────────────
// Cualquiera con acceso al navegador lo lee: basta abrir el inspector,
// pestaña Application, y ahí está todo en texto plano. Y cualquier script que
// corra en la página también puede leerlo.
//
// NUNCA:  contraseñas · tokens de sesión · datos personales sensibles
//         números de tarjeta · documentos de identidad
//
// SÍ:     preferencias de interfaz · el borrador de un formulario
//         qué filtro tenía puesto · datos públicos que tardan en llegar
//
// Otros dos límites que conviene conocer:
//   ~5 MB por sitio. Guardar más lanza un error, y por eso el try/catch.
//   Es SÍNCRONO: guardar mucho de golpe bloquea la interfaz.

// ── 6. GEOLOCATION ──────────────────────────────────────────────────────
// navigator.geolocation.getCurrentPosition(exito, error, opciones)
//
// EL PERMISO ES DEL USUARIO. El navegador pregunta, y puede decir que no.
// Por eso la función de error NO es opcional: es la mitad del trabajo.
//
// Y el permiso se pide CUANDO SE NECESITA, no al cargar la página. Una página
// que lo pide apenas se abre, sin explicar para qué, recibe un "no" casi
// siempre, y ese "no" suele ser permanente.

const LOCAL = { lat: -16.5, lng: -68.15 };   // coordenadas del negocio

// Distancia en línea recta entre dos puntos de la Tierra (fórmula de
// Haversine). No hace falta entenderla: hace falta saber que existe y que la
// Tierra es curva, así que no se resta y ya.
function distanciaKm(lat1, lng1, lat2, lng2) {
  const R = 6371;                                   // radio de la Tierra en km
  const aRad = (g) => (g * Math.PI) / 180;
  const dLat = aRad(lat2 - lat1);
  const dLng = aRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(aRad(lat1)) * Math.cos(aRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const $ubic = document.querySelector("#estado-ubicacion");

document.querySelector("#ubicarme").addEventListener("click", () => {
  // Primero: ¿existe la API? En un navegador viejo o sin soporte, no.
  if (!navigator.geolocation) {
    $ubic.textContent = "Tu navegador no permite compartir la ubicación.";
    $ubic.className = "error";
    return;
  }

  $ubic.textContent = "Pidiendo permiso...";
  $ubic.className = "cargando";

  navigator.geolocation.getCurrentPosition(
    // ÉXITO: llega un objeto position
    (position) => {
      const { latitude, longitude, accuracy } = position.coords;
      const km = distanciaKm(latitude, longitude, LOCAL.lat, LOCAL.lng);
      $ubic.textContent =
        `Estás a ${km.toFixed(1)} km del local (precisión: ${Math.round(accuracy)} m).`;
      $ubic.className = "ok";
    },

    // ERROR: y hay que distinguir cuál, porque la solución es distinta
    (error) => {
      const mensajes = {
        [error.PERMISSION_DENIED]:
          "No diste permiso. Puedes seguir usando la página igual.",
        [error.POSITION_UNAVAILABLE]:
          "No se pudo determinar tu ubicación. ¿Estás bajo techo?",
        [error.TIMEOUT]:
          "Tardó demasiado. Intenta de nuevo.",
      };
      $ubic.textContent = mensajes[error.code] || "No se pudo obtener la ubicación.";
      $ubic.className = "error";
    },

    // OPCIONES
    {
      enableHighAccuracy: false,  // true usa GPS: más preciso y más batería
      timeout: 10000,             // 10 s y se rinde
      maximumAge: 300000,         // acepta una posición de hasta 5 min de antigüedad
    }
  );
});

// ── 7. LO QUE SORPRENDE EN LA ENTREGA ───────────────────────────────────
// Geolocation REQUIERE HTTPS. En localhost funciona (el navegador lo trata
// como seguro), pero en un sitio publicado por HTTP la API simplemente no
// responde.
//
// GitHub Pages sirve por HTTPS, así que el proyecto funciona. Pero conviene
// saberlo: es el tipo de cosa que se descubre el día de la entrega.
//
// Y el plan B no es opcional: si el usuario dice que no, la página tiene que
// seguir siendo útil. Aquí, sin ubicación, el catálogo funciona igual.

