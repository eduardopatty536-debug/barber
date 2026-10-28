/* ═════════════════════════════════════════════════════════════════════════
   DEMO DEL DÍA 7 - Objetos, arreglos y clases

   Hoy los datos del cliente empiezan a EXISTIR en el código. Hasta ayer las
   funciones recibían números sueltos; a partir de hoy trabajan sobre datos
   con forma.

   El ciclo 2 de este archivo (los métodos de arreglo) es el que más rinde de
   todo el módulo: aparece en el Lab 2, en el Lab 3, en los dos parciales y en
   el proyecto final.

   Todo se comprueba en la consola. La página se pinta mañana.
   ═════════════════════════════════════════════════════════════════════════ */

// ── 1. OBJETO LITERAL ───────────────────────────────────────────────────
// Un objeto agrupa datos que describen UNA cosa. Cada dato es una propiedad:
// un nombre y un valor, separados por dos puntos.
//
// Frente a tener variables sueltas (nombrePan, precioPan, stockPan...), el
// objeto mantiene junto lo que va junto, y se puede pasar completo a una
// función con un solo argumento.
const panDelDia = {
  nombre: "Pan del día",
  precio: 0.5,
  categoria: "panes",
  stock: 40,
  disponible: true,
};

// Dos formas de leer una propiedad:
//   con punto      cuando el nombre se conoce al escribir el código
//   con corchetes  cuando el nombre está en una variable, o tiene espacios
console.log(panDelDia.nombre);

const propiedad = "precio";
console.log(panDelDia[propiedad]);      // con punto esto NO funcionaría

// Los objetos se modifican, se amplían y se recortan aunque sean const.
// const impide REASIGNAR la variable, no cambiar lo que hay adentro.
panDelDia.stock = 35;                   // modificar
panDelDia.integral = false;             // agregar una propiedad nueva
delete panDelDia.integral;              // quitarla

// ── 2. DESTRUCTURING ────────────────────────────────────────────────────
// Saca propiedades de un objeto y las deja como variables sueltas, en una
// línea. Los nombres entre llaves tienen que coincidir con las propiedades.
//
// Es lo mismo que escribir:
//     const nombre = panDelDia.nombre;
//     const precio = panDelDia.precio;
// pero se lee mucho mejor cuando son varias.
const { nombre, precio } = panDelDia;
console.log(`${nombre} cuesta Bs ${precio}`);

// El spread ... copia todas las propiedades de un objeto en otro nuevo.
// Sirve para copiar cambiando algo, sin tocar el original.
const panDeAyer = { ...panDelDia, precio: 0.3, nombre: "Pan de ayer" };
console.log(panDeAyer);

// ── 3. ARREGLO DE OBJETOS ───────────────────────────────────────────────
// La estructura más común de toda la programación web: una LISTA de cosas,
// donde cada cosa tiene la MISMA forma.
//
// Que todos los objetos tengan las mismas propiedades no es un detalle: es lo
// que permite recorrerlos con un solo bloque de código.
const productos = [
  { nombre: "Corte Clásico", precio: 35.0, categoria: "clasicos", stock: 20, disponible: true },
  { nombre: "Corte Escolar", precio: 25.0, categoria: "clasicos", stock: 20, disponible: true },
  { nombre: "Corte Ejecutivo", precio: 40.0, categoria: "clasicos", stock: 20, disponible: true },
  { nombre: "Corte Fade (Degradado)", precio: 45.0, categoria: "modernos", stock: 20, disponible: true },
  { nombre: "Corte Undercut", precio: 45.0, categoria: "modernos", stock: 20, disponible: true },
  { nombre: "Corte Texturizado", precio: 50.0, categoria: "modernos", stock: 20, disponible: true },
  { nombre: "Diseño Tribal", precio: 20.0, categoria: "navaja", stock: 20, disponible: true },
  { nombre: "Línea Freestyle", precio: 15.0, categoria: "navaja", stock: 20, disponible: true }
];

// ── 4. LOS MÉTODOS QUE IMPORTAN ─────────────────────────────────────────
// Todos reciben una FUNCIÓN como argumento, que es lo que se vio ayer.
// Cada uno la aplica a cada elemento y hace algo distinto con el resultado.
//
// La diferencia clave, y la que más confunde al principio:
//
//     forEach   recorre y NO DEVUELVE NADA. Es para hacer algo con cada uno.
//     map       recorre y DEVUELVE un arreglo nuevo, del mismo largo.
//     filter    recorre y DEVUELVE un arreglo nuevo, solo con los que pasan.
//     find      recorre y DEVUELVE el PRIMERO que pasa (un objeto, no lista).
//     reduce    recorre y DEVUELVE UN SOLO valor acumulado.
//
// Ninguno modifica el arreglo original: todos devuelven algo nuevo.

// forEach: hacer algo con cada uno. No sirve para obtener una lista.
productos.forEach(p => console.log(p.nombre));

// map: transformar cada elemento. Devuelve tantos elementos como había.
const nombres = productos.map(p => p.nombre);
console.log(nombres);

// filter: quedarse con los que cumplen. Devuelve los que pasan, o ninguno.
const disponibles = productos.filter(p => p.disponible);
console.log(disponibles.length, "de", productos.length, "disponibles");

// find: buscar UNO. Devuelve el objeto, o undefined si no hay ninguno.
const caro = productos.find(p => p.precio > 40);
console.log(caro);

// includes y some/every: preguntas de sí o no.
console.log(nombres.includes("Alfajor"));            // ¿está en la lista?
console.log(productos.some(p => p.stock === 0));     // ¿alguno agotado?
console.log(productos.every(p => p.precio > 0));     // ¿todos tienen precio?

// sort: ORDENA EL ARREGLO ORIGINAL, a diferencia de los anteriores.
// Por eso se ordena sobre una copia, hecha con spread, salvo que se quiera
// modificar el original a propósito.
// La función recibe dos elementos y devuelve un número: negativo si a va
// antes, positivo si b va antes.
const porPrecio = [...productos].sort((a, b) => a.precio - b.precio);
console.log(porPrecio.map(p => p.nombre));

// reduce: el más difícil y el más potente. Recorre acumulando un valor.
//   acumulador   lo que se lleva de las vueltas anteriores
//   p            el elemento de esta vuelta
//   0            el valor con el que arranca el acumulador
const valorInventario = productos.reduce((acumulador, p) => acumulador + p.precio * p.stock, 0);
console.log("Valor del inventario: Bs", valorInventario.toFixed(2));

// ── 5. ENCADENAR ────────────────────────────────────────────────────────
// Como filter y map devuelven arreglos, se les puede pedir otro método
// directamente. Se lee de izquierda a derecha, como una frase:
// "de los productos, los disponibles, y de esos, sus nombres".
const nombresDisponibles = productos
  .filter(p => p.disponible)
  .map(p => p.nombre);
console.log(nombresDisponibles);

// Tres preguntas de negocio resueltas encadenando:
const cortesClasicos = productos
  .filter(p => p.categoria === "dulces" && p.disponible)
  .reduce((total, p) => total + p.precio * p.stock, 0);
console.log("Dulces en stock: Bs", cortesClasicos.toFixed(2));

// Agrupar por categoría con reduce. El acumulador aquí es un OBJETO, no un
// número: se va llenando con una lista por cada categoría encontrada.
const porCategoria = productos.reduce((grupos, p) => {
  if (!grupos[p.categoria]) grupos[p.categoria] = [];
  grupos[p.categoria].push(p.nombre);
  return grupos;
}, {});
console.log(porCategoria);

// ── 6. CLASES ───────────────────────────────────────────────────────────
// Una clase es un molde para crear objetos que comparten forma Y
// comportamiento. El constructor recibe los datos y arma la instancia; this
// se refiere al objeto que se está creando.
//
// CUÁNDO CONVIENE: cuando cada objeto necesita METODOS propios, o cuando se
// van a crear muchos con la misma lógica.
// CUÁNDO NO: si solo se guardan datos, un objeto literal alcanza y es más
// simple. En un proyecto de este tamaño, muchas veces alcanza.
class Producto {
  constructor(nombre, precio, stock) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }

  // Un método es una función que vive dentro de la clase y puede usar this.
  estaDisponible() {
    return this.stock > 0;
  }

  valorEnStock() {
    return this.precio * this.stock;
  }
}

const alfajor = new Producto("Alfajor", 4.0, 50);
console.log(alfajor.nombre, alfajor.estaDisponible(), alfajor.valorEnStock());

// Herencia: una clase puede extender otra y quedarse con todo lo suyo.
// super(...) llama al constructor de la clase padre. Es obligatorio, y va
// antes de usar this.
class ProductoConDescuento extends Producto {
  constructor(nombre, precio, stock, descuento) {
    super(nombre, precio, stock);
    this.descuento = descuento;
  }

  precioFinal() {
    return this.precio * (1 - this.descuento / 100);
  }
}

const clasicos = new ProductoConDescuento("Clasicos", 1.0, 20, 25);
console.log(clasicos.precioFinal(), alfajor.estaDisponible());


//TABLA DE PAGINA WEB
