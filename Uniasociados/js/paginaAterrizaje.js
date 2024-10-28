let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => slide.classList.remove('active'));

    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Inicializa el carrusel mostrando la primera diapositiva
showSlide(currentSlide);


// Segundo carrusel 
const logoSlider = document.getElementById('logoSlider');
let autoScroll;
let scrollAmount = 200; // Controla cuánto se desplaza el carrusel con cada clic

// Iniciar desplazamiento automático
function startAutoScroll() {
    autoScroll = setInterval(() => {
        logoSlider.scrollLeft += 1;
    }, 20);
}

// Detener desplazamiento automático
function stopAutoScroll() {
    clearInterval(autoScroll);
}

// Avanzar y retroceder usando los botones
document.getElementById('nextButton').addEventListener('click', () => {
    logoSlider.scrollLeft += scrollAmount;
});

document.getElementById('prevButton').addEventListener('click', () => {
    logoSlider.scrollLeft -= scrollAmount;
});

// Iniciar desplazamiento automático al cargar la página
startAutoScroll();
