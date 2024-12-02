document.getElementById('category-selector').addEventListener('change', function() {
    const selectedCategory = this.value;  // Obtiene el valor de la categoría seleccionada
    const cards = document.querySelectorAll('.card');  // Obtiene todas las tarjetas

    cards.forEach(card => {
        // Si la categoría seleccionada es "all", mostramos todas las tarjetas
        if (selectedCategory === 'all') {
            card.style.display = 'block';
        } else {
            // Si la tarjeta tiene la categoría seleccionada, la mostramos, si no, la ocultamos
            if (card.getAttribute('data-category') === selectedCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        }
    });
});
