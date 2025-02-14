document.addEventListener("DOMContentLoaded", function () {
    const bookCiclo = document.getElementById("bookCiclo");
    const promoHeader = document.querySelector(".promo-header");
    const totalPages = 3; // Número total de páginas
    let currentPage = 0;
    let zoomLevel = 1; // Nivel de zoom inicial

    // Generar dinámicamente las imágenes del catálogo
    for (let i = 0; i < totalPages; i++) {
        const page = document.createElement("img");
        page.src = `../static/img/promociones/${i + 1}.jpg`; // Cambia la ruta si es necesario
        page.alt = `Página ${i + 1}`;
        page.classList.add("book-page");
        if (i === 0) page.classList.add("active");
        bookCiclo.appendChild(page);
    }

    const images = document.querySelectorAll(".book-page");

    function showPage(index) {
        images.forEach((img, i) => {
            img.classList.toggle("active", i === index);
        });
    }

    function nextPage() {
        if (currentPage < totalPages - 1) {
            currentPage++;
            showPage(currentPage);
        }
    }

    function prevPage() {
        if (currentPage > 0) {
            currentPage--;
            showPage(currentPage);
        }
    }

    // Agregar eventos a los botones
    document.getElementById("nextPage").addEventListener("click", nextPage);
    document.getElementById("prevPage").addEventListener("click", prevPage);

    // Navegación con teclas
    document.addEventListener("keydown", function (event) {
        if (event.key === "ArrowRight") nextPage();
        if (event.key === "ArrowLeft") prevPage();
        if (event.key === "+" || event.key === "=") zoomIn(); // + para zoom in
        if (event.key === "-") zoomOut(); // - para zoom out
    });

    // Hacer clic en la imagen para pasar página
    bookCiclo.addEventListener("click", nextPage);

    // Mostrar la primera página al cargar
    showPage(currentPage);

    // Función para actualizar el zoom
    function updateZoom() {
        bookCiclo.style.transform = `scale(${zoomLevel})`;
        bookCiclo.style.transition = "transform 0.3s ease";

        // Ocultar el título cuando el zoom es mayor a 1
        if (zoomLevel > 1) {
            promoHeader.classList.add("hidden");
        } else {
            promoHeader.classList.remove("hidden");
        }
    }

    function zoomIn() {
        zoomLevel += 0.2;
        updateZoom();
    }

    function zoomOut() {
        if (zoomLevel > 1) {
            zoomLevel -= 0.2;
            updateZoom();
        }
    }

    // Agregar eventos a los botones de zoom
    document.getElementById("zoomIn").addEventListener("click", zoomIn);
    document.getElementById("zoomOut").addEventListener("click", zoomOut);
});

// document.getElementById("downloadPdf").addEventListener("click", function () {
//     const pdfUrl = "./pdf/catalogo.pdf"; // Asegúrate de que esta ruta sea correcta
//     const link = document.createElement("a");
//     link.href = pdfUrl;
//     link.download = "Catalogo_Distribuidora_Univentas.pdf"; // Nombre del archivo al descargar
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
// });
