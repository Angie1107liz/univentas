// inicio Presentacion de pagina slider
document.addEventListener("DOMContentLoaded", function () {
    const logos = document.querySelectorAll(".logo-slider img");
    const categoryButtons = document.querySelectorAll(".category-buttons button");

    // Mantener el estado de la categoría actual
    let currentCategory = "bellezaBienestar";

    // Mostrar los logos con deslizamiento
    function filterImages(category) {
        if (currentCategory === category) return; // No hacer nada si la categoría es la misma
        const direction = category === currentCategory ? 'slide-left' : 'slide-right';
        
        // Ocultar logos actuales
        logos.forEach(logo => {
            if (logo.classList.contains(currentCategory)) {
                logo.classList.remove("active");
                logo.classList.add(direction);
            }
        });

        // Mostrar nuevos logos
        logos.forEach(logo => {
            if (logo.classList.contains(category)) {
                logo.classList.add("active");
                logo.classList.remove("slide-left", "slide-right");
            }
        });

        // Actualizar la categoría actual
        currentCategory = category;
    }

    // Agregar evento de clic a los botones de categoría
    categoryButtons.forEach(button => {
        button.addEventListener("click", function () {
            const category = this.getAttribute("onclick").match(/'([^']+)'/)[1];
            filterImages(category);
        });
    });

    // Mostrar logos de la primera categoría por defecto
    filterImages("bellezaBienestar");
});

// fin de pagina de presentacion slider 