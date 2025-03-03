function cerrarSesion() {
    localStorage.removeItem("usuario");  // Borrar datos del usuario
    window.location.href = "login.html"; // Redirigir al login
}
