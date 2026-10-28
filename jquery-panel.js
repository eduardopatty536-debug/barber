// ── PANEL DE INFORMACIÓN (ACORDEÓN, MENÚ Y AVISOS) ──────────────────────
(function () {
  function iniciarConJQuery() {
    // 1. Menú desplegable móvil
    $("#menu-toggle").off("click").on("click", function () {
      const $menu = $("#menu-movil");
      const abierto = $(this).attr("aria-expanded") === "true";
      $(this).attr("aria-expanded", !abierto);

      if (abierto) {
        $menu.slideUp(200, function () {
          $menu.attr("hidden", true);
        });
      } else {
        $menu.removeAttr("hidden").hide().slideDown(200);
      }
    });

    // 2. Acordeón interactivo
    $("#acordeon").off("click", ".titulo").on("click", ".titulo", function () {
      const $titulo = $(this);
      const $cuerpo = $titulo.next(".cuerpo");
      const estaAbierto = $titulo.attr("aria-expanded") === "true";

      // Cerrar otros acordeones
      $("#acordeon .titulo").not($titulo).attr("aria-expanded", "false");
      $("#acordeon .cuerpo").not($cuerpo).slideUp(200, function () {
        $(this).attr("hidden", true);
      });

      // Alternar el actual
      if (estaAbierto) {
        $titulo.attr("aria-expanded", "false");
        $cuerpo.slideUp(200, function () {
          $cuerpo.attr("hidden", true);
        });
      } else {
        $titulo.attr("aria-expanded", "true");
        $cuerpo.removeAttr("hidden").hide().slideDown(200);
      }
    });

    // 3. Avisos con fade escalonado
    let avisosVisibles = false;
    $("#mostrar-avisos").off("click").on("click", function () {
      const $btn = $(this);
      const $avisos = $("#avisos li");

      if (!avisosVisibles) {
        $avisos.each(function (indice) {
          const $item = $(this);
          $item.removeAttr("hidden").hide();
          $item.stop(true, true).delay(indice * 120).fadeIn(250);
        });
        $btn.text("Ocultar avisos del día");
        avisosVisibles = true;
      } else {
        $avisos.stop(true, true).fadeOut(200, function () {
          $(this).attr("hidden", true);
        });
        $btn.text("Mostrar avisos del día");
        avisosVisibles = false;
      }
    });
  }

  // Fallback nativo en caso de que jQuery no esté cargado
  function iniciarFallbackNativo() {
    const btnMenu = document.querySelector("#menu-toggle");
    const menuMovil = document.querySelector("#menu-movil");
    if (btnMenu && menuMovil) {
      btnMenu.addEventListener("click", () => {
        const abierto = btnMenu.getAttribute("aria-expanded") === "true";
        btnMenu.setAttribute("aria-expanded", !abierto);
        menuMovil.hidden = abierto;
      });
    }

    const acordeon = document.querySelector("#acordeon");
    if (acordeon) {
      acordeon.addEventListener("click", (e) => {
        const btn = e.target.closest(".titulo");
        if (!btn) return;
        const cuerpo = btn.nextElementSibling;
        const abierto = btn.getAttribute("aria-expanded") === "true";

        acordeon.querySelectorAll(".titulo").forEach(t => t.setAttribute("aria-expanded", "false"));
        acordeon.querySelectorAll(".cuerpo").forEach(c => c.hidden = true);

        if (!abierto && cuerpo) {
          btn.setAttribute("aria-expanded", "true");
          cuerpo.hidden = false;
        }
      });
    }

    const btnAvisos = document.querySelector("#mostrar-avisos");
    const listaAvisos = document.querySelectorAll("#avisos li");
    let visibles = false;
    if (btnAvisos && listaAvisos.length > 0) {
      btnAvisos.addEventListener("click", () => {
        visibles = !visibles;
        listaAvisos.forEach((li) => {
          li.hidden = !visibles;
        });
        btnAvisos.textContent = visibles ? "Ocultar avisos del día" : "Mostrar avisos del día";
      });
    }
  }

  // Comprobar disponibilidad de jQuery
  if (typeof $ !== "undefined" && $.fn && $.fn.jquery) {
    iniciarConJQuery();
  } else {
    // Si jQuery se carga de forma asíncrona o no está disponible
    document.addEventListener("DOMContentLoaded", () => {
      if (typeof $ !== "undefined" && $.fn && $.fn.jquery) {
        iniciarConJQuery();
      } else {
        iniciarFallbackNativo();
      }
    });
  }
})();
