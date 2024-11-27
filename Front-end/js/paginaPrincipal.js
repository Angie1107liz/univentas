function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('expanded');
}
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});



// Función para asignar la clase 'active' al enlace actual
function setActiveMenu() {
    // Obtener todas las tarjetas de menú
    const menuItems = document.querySelectorAll('.menu-item');

    // Obtener la URL actual
    const currentPath = window.location.pathname;

    // Iterar sobre los elementos del menú
    menuItems.forEach(item => {
        // Obtener todos los enlaces dentro de cada elemento del menú
        const links = item.querySelectorAll('a');
        let isActive = false;

        // Verificar cada enlace en el elemento del menú
        links.forEach(link => {
            // Compara la ruta del enlace con la URL actual
            if (link && link.href && link.href.includes(currentPath)) {
                isActive = true;
            }
        });

        // Aplicar o remover la clase 'active'
        if (isActive) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Llamar a la función cuando se cargue la página
window.addEventListener('load', setActiveMenu);

window.addEventListener('DOMContentLoaded', () => {
    const titulo = document.querySelector('.textoTituloMarca');
    if (titulo) {
        setTimeout(() => {
            titulo.classList.add('loaded');
        }, 100); // Elimina el retraso si quieres que sea inmediato
    }
});
