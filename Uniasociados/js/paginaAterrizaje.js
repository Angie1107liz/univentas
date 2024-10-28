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
const sliderWidth = logoSlider.scrollWidth / 2; // Mitad para mantener un loop infinito
let offset = 0;

function slideLogos() {
    offset += 100; // Ajusta este valor para el ancho de desplazamiento
    if (offset >= sliderWidth) {
        offset = 0; // Reinicia el desplazamiento al llegar al final
    }
    logoSlider.style.transform = `translateX(-${offset}px)`;
}

setInterval(slideLogos, 1000); // Desplaza cada 3 segundos
