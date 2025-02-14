const menuToggle = document.querySelector('.menu-toggle');
const closeMenu = document.querySelector('.close-menu');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.add('open');
});

closeMenu.addEventListener('click', () => {
  navLinks.classList.remove('open');
});