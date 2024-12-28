const menuToggle = document.querySelector('.menu-toggle');
const closeMenu = document.querySelector('.close-menu');
const navLinks = document.querySelector('.nav-links');
const body = document.body;
const logoContainer = document.querySelector('.logo-container');

// Lógica para abrir el menú lateral y ocultar el ícono de menú
menuToggle.addEventListener('click', () => {
    navLinks.classList.add('open');
    body.classList.add('no-scroll');
    logoContainer.classList.add('shift-right'); // Mueve el logo
    menuToggle.style.display = 'none'; // Oculta el ícono de menú
});

// FUNCION PARA QUE ICONO DE BARRA LATERAL
closeMenu.addEventListener('click', () => {
    if (window.innerWidth <= 1024) { // Aplica la lógica solo para pantallas medianas y pequeñas (máximo 1024px de ancho)
        navLinks.classList.remove('open');
        body.classList.remove('no-scroll');
        logoContainer.classList.remove('shift-right'); // Devuelve el logo
        menuToggle.style.display = 'block'; // Muestra el ícono de menú nuevamente
    }
});

// MARCAS
// Inicio de los slider de la página de presentación.
let currentCategory = '';
let currentIndex = 0;
let interval;
let isCategoryOpen = false; // Estado para verificar si la categoría está abierta

// Función para filtrar y mostrar imágenes
function filterImages(category) {
  // Verifica si la misma categoría ya está abierta
  if (isCategoryOpen && currentCategory === category) {
    closeSlider(); // Llama a la función para cerrar el slider
    return;
  }

  // Abre o cambia la categoría
  clearInterval(interval); // Limpia cualquier intervalo previo
  currentCategory = category;
  currentIndex = 0;
  isCategoryOpen = true; // Marca que la categoría está abierta
  
  const images = document.querySelectorAll('.logo-slider img');
  images.forEach(img => {
    img.classList.remove('active');
    img.style.display = 'none'; // Oculta todas las imágenes
  });

  // Muestra el primer grupo de 4 imágenes de la categoría seleccionada
  const categoryImages = document.querySelectorAll(`.logo-slider img.${category}`);
  displayImagesGroup(categoryImages, currentIndex);

  // Configura el desplazamiento automático cada 2 segundos
  interval = setInterval(() => {
    slideImages(categoryImages);
  }, 2000);
}

// Función para mostrar un grupo de 4 imágenes
function displayImagesGroup(images, startIndex) {
  // Muestra un grupo de 4 imágenes a partir del índice indicado
  for (let i = startIndex; i < startIndex + 4; i++) {
    if (images[i % images.length]) { // % asegura que vuelva al inicio si el índice supera la cantidad de imágenes
      images[i % images.length].style.display = 'inline-block';
      images[i % images.length].classList.add('active');
    }
  }
}

// Función para deslizar las imágenes
function slideImages(images) {
  // Oculta el grupo actual de 4 imágenes
  images.forEach(img => {
    img.classList.remove('active');
    img.style.display = 'none';
  });

  // Actualiza el índice para mostrar el siguiente grupo de 4 imágenes
  currentIndex = (currentIndex + 4) % images.length;

  // Muestra el siguiente grupo de 4 imágenes
  displayImagesGroup(images, currentIndex);
}

// Función para cerrar el slider
function closeSlider() {
  // Oculta todas las imágenes y limpia el intervalo
  const images = document.querySelectorAll('.logo-slider img');
  images.forEach(img => {
    img.classList.remove('active');
    img.style.display = 'none';
  });

  clearInterval(interval); // Detiene el intervalo de desplazamiento
  isCategoryOpen = false;  // Marca que la categoría está cerrada
  currentCategory = ''; // Reinicia la categoría actual
}

// Función para resetear el color del botón al cerrar la categoría
function resetRadioColor(radio) {
  // Obtiene el label asociado al radio botón
  const label = document.querySelector(`label[for="${radio.id}"]`);

  // Verifica si la categoría está abierta y coincide con la actual
  if (isCategoryOpen && currentCategory === radio.value) {
    closeSlider(); // Cierra el slider
    // Resetea el color del botón
    label.style.backgroundColor = '#013e9b'; // Color de fondo predeterminado
    label.style.color = 'white'; // Color de texto predeterminado
    label.style.borderColor = '#ccc'; // Color del borde predeterminado
  }
}


// INICIO NOSOTROS

$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
      items: 3,
      loop: true,
      autoplay: true,
      autoplayTimeout: 2000,
      autoplayHoverPause: true,
      margin: 10
  });
});


let lastScrollTop = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scroll hacia abajo - oculta la barra
    navbar.style.top = "-70px";
  } else {
    // Scroll hacia arriba - muestra la barra
    navbar.style.top = "0";
  }

  lastScrollTop = scrollTop;
});  

// FIN NOSOTROS

// INICIO CONTACTANOS 

// INICIO MARCAR NUMERO TELEFONICO CONTACTANOS
function marcarNumero(numero) {
  // Aquí puedes realizar la acción de marcar el número, por ejemplo, redirigir a una URL tel: con el número deseado
  window.location.href = 'tel:' + numero;
}
// slider

// FIN MARCAR NUMERO TELEFONICO CONTACTANOS


// INICIO CORREO ELECTRONICO CONTACTANOS
function enviarCorreo(correo) {
  // Redirige al esquema mailto: para iniciar un correo electrónico
  window.location.href = 'mailto:' + correo;
}

// FIN CORREO ELECTRONICO CONTACTANOS 

// FIN CONTACTANOS 