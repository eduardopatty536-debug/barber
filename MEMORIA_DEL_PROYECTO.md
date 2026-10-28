# MEMORIA TÉCNICA DEL PROYECTO
## Sistema Web de Barbería y Reserva de Horarios: "Barber-Shop"

---

| **Metadato** | **Detalle** |
| :--- | :--- |
| **Proyecto** | Barber-Shop Web App |
| **Estudiante / Desarrollador** | Eduardo Patty Churqui |
| **Cliente / Caso de Estudio** | Barber-Shop |
| **Materia / Especialidad** | Desarrollo Web / Programación Web Frontend |
| **Versión** | 1.0.0 (Fase Frontend Interactiva) |
| **Fecha de Elaboración** | Octubre 2026 |
| **Estado del Proyecto** | En producción frontend / Listo para integración backend |

---

## 1. INTRODUCCIÓN Y CONTEXTO

El proyecto **Barber-Shop** surge de la necesidad real que tienen los negocios del rubro de estética y peluquería masculina de modernizar la atención al cliente, ordenar los flujos de reservas y brindar información clara, transparente e interactiva sobre sus servicios, precios y horarios.

### 1.1. Problemática Identificada
1. **Desorden y saturación en la atención:** Los clientes solían acudir sin cita previa o coordinar de forma manual mediante mensajería dispersa, ocasionando tiempos de espera excesivos o cruces de horarios.
2. **Falta de visibilidad de los servicios:** Muchos clientes desconocían la variedad de estilos que la barbería ofrece (cortes clásicos, degradados modernos, diseños personalizados a navaja) y sus tarifas exactas.
3. **Ausencia de un canal centralizado:** Inexistencia de un portal donde consultar ubicación, métodos de pago rápido (como transferencias por QR), horarios de disponibilidad y avisos o promociones del día.

### 1.2. Solución Propuesta
Una aplicación web responsiva, accesible y visualmente atractiva construida con tecnologías web fundamentales (HTML5 semántico, CSS3 moderno con variables y layouts flexibles, JavaScript modular ES6+ y jQuery para enriquecimiento dinámico). Permite al usuario:
- Explorar el catálogo completo de cortes y diseños con filtrado instantáneo por categoría.
- Realizar búsquedas de servicios en tiempo real con tolerancia a plurales y tildes.
- Agendar turnos mediante un formulario validado con autofill directo desde las tarjetas de servicio.
- Consultar un panel interactivo con preguntas frecuentes (acordeón), menú móvil y anuncios del día.

---

## 2. OBJETIVOS DEL PROYECTO

### 2.1. Objetivo General
Diseñar y desarrollar un sitio web interactivo y dinámico para "Barber-Shop" que permita la exhibición de servicios de peluquería y el agendamiento estructurado de citas de clientes, garantizando una experiencia de usuario (UX) fluida, intuitiva y adaptable a cualquier dispositivo.

### 2.2. Objetivos Específicos
- **Estructuración Semántica:** Aplicar las mejores prácticas de HTML5 semántico (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<figure>`, `<table>`, `<aside>`, `<footer>`) priorizando la accesibilidad y SEO.
- **Diseño Responsivo y Estilizado:** Implementar una arquitectura CSS robusta basada en variables personalizadas (`:root`), Flexbox y CSS Grid para diagramar tablas, formularios, galerías y paneles interactivos.
- **Modelado de Datos:** Gestionar los servicios y cortes mediante arreglos de objetos, clases orientadas a objetos y programación funcional (`map`, `filter`, `reduce`, `find`, `sort`).
- **Renderizado Dinámico del DOM:** Manipular el Document Object Model (DOM) de manera nativa para generar las tarjetas de productos sin recargar la página.
- **Interactividad y Eventos:** Capturar entradas del usuario (teclado, clics y envíos de formulario), aplicando delegación de eventos, normalización de cadenas y validaciones con expresiones regulares.
- **Integración de jQuery con Fallback:** Utilizar jQuery para animaciones complejas (despliegues de acordeón, avisos escalonados) asegurando además un mecanismo de respaldo (*fallback*) en Vanilla JavaScript.

---

## 3. ARQUITECTURA Y ORGANIZACIÓN DEL CÓDIGO

El proyecto sigue una arquitectura desacoplada por responsabilidades, separando la estructura (HTML), la presentación (CSS), los datos del modelo (JS), la lógica de renderizado y el manejo de eventos e interactividad:

```text
proyecto web/
│
├── index.html              # Estructura semántica, accesibilidad y anclajes del DOM
├── estilos.css             # Hoja de estilos principal, tokens de diseño y media queries
│
├── app.js                  # Inicialización, constantes globales y conceptos base ES6
├── datos.js                # Modelo de datos: lista de productos, métodos funcionales y POO
├── funciones.js            # Lógica matemática, control de flujo, closures y funciones puras
├── render.js               # Renderizado dinámico de tarjetas y estados en el DOM
├── eventos.js              # Escuchadores de eventos: buscador en vivo, filtros, reservas
├── jquery-panel.js         # Módulo interactivo del panel (acordeón, avisos y menú móvil)
├── jquery-comparado.js     # Módulo de análisis comparativo (Vanilla JS vs jQuery)
│
├── imagen1.jpg             # Activo visual: Diseños con navaja
├── imagen2.jpg             # Activo visual: Cortes modernos
├── imagen3.jpg             # Activo visual: Cortes clásicos
├── cap1.PNG                # Captura de pantalla de la interfaz
└── README.md               # Resumen rápido del repositorio
```

---

## 4. DESCRIPCIÓN DETALLADA DE COMPONENTES Y MÓDULOS

### 4.1. Maquetado Semántico y Accesibilidad (`index.html`)
- **Cabecera (`<header>`):** Título principal, subtítulo y barra de navegación (`<nav>`) con hipervínculos internos para navegación rápida.
- **Sección de Servicios (`#SERVICIO`):** Incorpora una barra de controles con input tipo búsqueda (`<input type="search">`), botones de filtrado de categoría con atributos `data-categoria` y el contenedor dinámico `#lista-productos`.
- **Información de Horarios y Precios:** Presenta los días de atención y una tabla (`<table>`) con encabezados de columna (`<th scope="col">`), estructurada con `<thead>` y `<tbody>`.
- **Galería Visual (`<figure class="galeria-cortes">`):** Muestra imágenes representativas del trabajo realizado en el salón con sus respectivos `<figcaption>`.
- **Formulario de Registro y Reserva (`#pedido`):** Dividido con `<fieldset>` y `<legend>` para separar datos personales y detalles de la cita. Cuenta con campos obligatorios (`required`), validación de formato telefónico mediante atributo `pattern="[0-9]{7,8}"` y selector de horarios habilitados.
- **Panel de Información y Avisos (`#panel`):** Contiene el menú rápido móvil (`#menu-toggle`), un sistema de acordeón para preguntas frecuentes (`#acordeon`) y una lista desglosable de avisos (`#avisos`).
- **Barra Lateral y Pie (`<aside>`, `<footer>`):** Curiosidades sobre la higiene de máquinas y datos de contacto (`<address>`) con teléfono y dirección física.

### 4.2. Sistema de Diseño y Estilos (`estilos.css`)
- **Variables CSS (`:root`):**
  - Colores corporativos inspirados en la estética tradicional de barbería (azul `--color-principal: #4196eb`, acento `--color-acento: #b8471f`, contrastes oscuros `--color-fondo: #0f0f0f` y superficies limpias).
  - Espaciados y radios consistentes (`--espacio: 1rem`, `--espacio-lg: 2rem`, `--radio: 4px`).
- **Reset y Modelo de Caja:** Configuración universal `box-sizing: border-box`.
- **Layouts con Flexbox y CSS Grid:** Distribución de tarjetas en rejilla adaptable, barra de controles y acordeones que responden de manera fluida a pantallas de computadoras, tablets y móviles.
- **Micro-interacciones y Estados:** Estilos específicos para `:hover`, `:focus-visible`, estados activos (`.activo`) y tarjetas agotadas (`.agotado`).

### 4.3. Modelo y Transformación de Datos (`datos.js`)
Contiene la base de datos en memoria y ejemplifica las operaciones esenciales de JavaScript moderno:
- **Colección de Productos (`productos`):** Arreglo de objetos donde cada elemento cuenta con `nombre`, `precio`, `categoria`, `stock` y `disponible`.
- **Operaciones Funcionales Inmutables:**
  - `map()`: Para obtener listas proyectadas de nombres de servicios.
  - `filter()`: Para aislar cortes activos o pertenecientes a una categoría específica.
  - `find()`: Para localizar elementos específicos por umbrales de precio.
  - `sort()`: Implementado sobre copias inmutables utilizando el operador spread (`[...productos]`).
  - `reduce()`: Para calcular métricas clave del negocio, como el valor total del inventario proyectado (`valorInventario`).
- **Programación Orientada a Objetos (POO):**
  - Clase base `Producto` con métodos de instancia (`estaDisponible()`, `valorEnStock()`).
  - Herencia con `ProductoConDescuento extends Producto` empleando `super()` y polimorfismo mediante `precioFinal()`.

### 4.4. Motor de Renderizado en el DOM (`render.js`)
- **`crearTarjeta(producto)`:** Genera dinámicamente un nodo `<article class="tarjeta">`, inyectando atributos `dataset` (`data-nombre`, `data-categoria`) y formateando precios a dos decimales con `toFixed(2)`.
- **`render(lista)`:** Vacía el contenedor `#lista-productos` y apéndice los nodos correspondientes. En caso de no existir coincidencias tras una búsqueda o filtro, renderiza un mensaje amigable con un botón interactivo para restablecer el catálogo completo.

### 4.5. Controlador de Eventos e Interacción (`eventos.js`)
- **Buscador Inteligente en Tiempo Real:** 
  - Escucha el evento `input` del buscador.
  - Normaliza caracteres especiales y tildes mediante `.normalize("NFD").replace(/[\u0300-\u036f]/g, "")`.
  - Implementa tolerancia a palabras plurales/singulares mediante la función `raizPalabra()`, facilitando que búsquedas como "cortes" encuentren "Corte Clásico".
- **Filtros por Categoría:** Delegación de eventos en el contenedor `#filtros` para conmutar clases activas y filtrar dinámicamente entre "todos", "clasicos", "modernos" y "navaja".
- **Interconexión Catálogo-Formulario:** Al presionar "Reservar este corte" en cualquier tarjeta, la aplicación selecciona automáticamente dicho corte en el menú desplegable del formulario y traslada suavemente la vista (`scrollIntoView({ behavior: 'smooth' })`) enfocando el campo de nombre.
- **Procesamiento de Reservas (`submit`):**
  - Intercepción mediante `event.preventDefault()`.
  - Validación de que la fecha elegida no sea en el pasado.
  - Extracción limpia de datos con `Object.fromEntries(new FormData(formulario))`.
  - Retroalimentación visual al usuario con un banner de confirmación dinámico.

### 4.6. Módulos Interactivos con jQuery y Fallback (`jquery-panel.js` y `jquery-comparado.js`)
- **Componentes Acordeón y Menú Desplegable:** Uso de animaciones fluidas (`slideToggle`, `slideDown`, `slideUp`) sincronizadas con atributos de accesibilidad (`aria-expanded`).
- **Animaciones Escalonadas:** Visualización de los avisos del día mediante `.delay(indice * 120).fadeIn(250)`.
- **Estrategia de Fallback Nativo:** Si por problemas de red o políticas de CDN la librería jQuery no carga, el sistema ejecuta automáticamente `iniciarFallbackNativo()`, garantizando que la funcionalidad jamás quede inoperativa para el usuario final.
- **Análisis Comparativo:** `jquery-comparado.js` documenta y compara metodológicamente la sintaxis nativa frente a los métodos de manipulación de jQuery (`querySelector` vs `$()`, `textContent` vs `.text()`, `addEventListener` vs `.on()`).

---

## 5. BITÁCORA DEL DESARROLLO Y EVOLUCIÓN TÉCNICA

| Etapa / Hito | Temas Clave Implementados | Retos Encontrados y Soluciones |
| :--- | :--- | :--- |
| **Fase 1 (Estructura Base)** | Creación de `index.html`, maquetado inicial, encabezado, tabla y secciones. | Definición de una jerarquía semántica clara que contemplara todas las necesidades de la barbería. |
| **Fase 2 (Estilizado y Layouts)** | Reglas CSS, Flexbox, variables en `:root`, diseño responsivo. | Manejo de anchos en tablas y formularios en pantallas pequeñas; se resolvieron con `max-width` y márgenes fluidos. |
| **Fase 3 (Lógica JS y Fundamentos)** | `app.js` y `funciones.js`: tipos, template literals, funciones flecha y closures. | Pruebas directas en la consola del navegador para depurar el comportamiento de coerción y alcance de variables. |
| **Fase 4 (Estructura de Datos y POO)** | `datos.js`: Arreglo de cortes, métodos funcionales (`map`, `filter`, `reduce`) y clases. | Modelar de forma uniforme cada corte con propiedades comunes para facilitar su recorrido dinámico. |
| **Fase 5 (Renderizado del DOM)** | `render.js`: Inyección dinámica de tarjetas de cortes y manejo de estados vacíos. | Crear plantillas HTML en literales de texto limpias y vincular los atributos `dataset` para operaciones futuras. |
| **Fase 6 (Eventos y Búsqueda)** | `eventos.js`: Filtrado, buscador en vivo, normalización de cadenas y formulario con `FormData`. | Búsquedas que no coincidían por plurales o tildes; se implementó el algoritmo de normalización y raíz. |
| **Fase 7 (Librería jQuery y Paneles)** | `jquery-panel.js`: Acordeón de FAQs, avisos escalonados y fallback nativo. | Garantizar que si no hay conexión a internet (o CDN bloqueado), los botones y menús sigan funcionando con JS nativo. |

---

## 6. GUÍA DE EJECUCIÓN Y PRUEBAS

### 6.1. Requisitos Previos
No se requieren compiladores ni servidores complejos de Node.js para la ejecución básica, ya que el proyecto corre directamente en cualquier navegador moderno (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).

### 6.2. Cómo Abrir y Ejecutar el Proyecto
1. Abrir la carpeta del proyecto en su editor de preferencia (por ejemplo, Visual Studio Code).
2. Hacer doble clic en el archivo `index.html` o utilizar una extensión de servidor local como **Live Server** (`http://127.0.0.1:5500/index.html`).
3. Para monitorear la ejecución de los módulos JS, abrir las **Herramientas de Desarrollador** (`F12` o `Ctrl + Shift + I`) y revisar la pestaña **Console**.

### 6.3. Casos de Prueba Recomendados
- **Prueba de Búsqueda:** Escribir "fade", "clasico", "navaja" o "escolar" en el campo de búsqueda y verificar la actualización inmediata de la lista.
- **Prueba de Filtrado:** Hacer clic en los botones "Clásicos", "Modernos" o "Diseños con navaja" y comprobar que solo se exhiban las tarjetas pertinentes.
- **Prueba de Selección Rápida:** Presionar "Reservar este corte" en cualquier tarjeta; comprobar el scroll automático hacia el formulario y la auto-selección del corte en el elemento `<select>`.
- **Prueba de Validación de Formulario:** Intentar enviar el formulario con campos vacíos o con una fecha anterior al día de hoy para observar las alertas nativas.
- **Prueba de Acordeón y Avisos:** Hacer clic en las preguntas frecuentes del panel para comprobar la animación de despliegue y en "Mostrar avisos del día" para observar la aparición escalonada.

---

## 7. CONCLUSIONES Y TRABAJO FUTURO

### 7.1. Conclusiones
- Se logró una plataforma web completa, funcional y atractiva que resuelve satisfactoriamente la problemática de presentación y agendamiento de Barber-Shop.
- El proyecto demuestra una comprensión sólida tanto de las herramientas nativas del navegador (HTML5, CSS3, ES6+) como del uso de librerías complementarias (jQuery), manteniendo siempre código limpio, modular y mantenible.
- La separación de responsabilidades en archivos independientes (`datos`, `render`, `eventos`, `panel`) facilitó notablemente la depuración y escalabilidad del código.

### 7.2. Trabajo Futuro / Siguientes Pasos
- **Persistencia de Reservas:** Integrar `localStorage` para conservar las reservas localmente o conectar el formulario a una API REST (Node.js/Express o Firebase) con base de datos.
- **Generación Dinámica de Códigos QR:** Incorporar una pasarela o biblioteca JS generadora de QR para que el cliente pueda escanear y pagar el monto exacto del corte seleccionado al instante.
- **Despliegue en Producción:** Publicar el sitio web en una plataforma de alojamiento estático (GitHub Pages, Vercel o Netlify) para acceso público de clientes reales.

---

*Memoria elaborada con fines académicos y de documentación técnica para el proyecto Barber-Shop.*
