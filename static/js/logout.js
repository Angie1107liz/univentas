document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById("logoutButton");

    if (!logoutButton) {
        console.error("⚠️ Error: No se encontró el botón con id 'logoutButton'. Revisa tu HTML.");
        return;
    }

    logoutButton.addEventListener("click", function () {
        // 1️⃣ Eliminar datos del usuario
        localStorage.removeItem("usuario");

        // 2️⃣ Redirigir a login.html
        window.location.href = "login.html";
    });

    // 3️⃣ Evitar que el usuario regrese con "atrás"
    history.pushState(null, "", location.href);
    window.onpopstate = function () {
        history.pushState(null, "", location.href);
    };
});
document.addEventListener("DOMContentLoaded", function () {
    let usuario = localStorage.getItem("usuario");

    if (!usuario) {
        console.log("🔴 No hay sesión activa. Redirigiendo al login...");
        window.location.href = "login.html";
    } else {
        console.log("✅ Sesión activa: ", usuario);

        // Bloquear botón "Atrás"
        sessionStorage.setItem("sesion_activa", "true");
        history.pushState(null, "", location.href);
        window.onpopstate = function () {
            if (sessionStorage.getItem("sesion_activa") === "true") {
                history.pushState(null, "", location.href);
            }
        };
    }

    // Asegurar que el botón de cerrar sesión existe
    const btnCerrarSesion = document.getElementById("cerrarSesion");
    if (btnCerrarSesion) {
        console.log("✅ Botón de cerrar sesión encontrado.");
        btnCerrarSesion.addEventListener("click", confirmarCerrarSesion);
    } else {
        console.error("⚠️ No se encontró el botón de cerrar sesión. Revisa tu HTML.");
    }
});

// Función para confirmar y cerrar sesión
function confirmarCerrarSesion() {
    console.log("🔍 Mostrando alerta de confirmación...");

    Swal.fire({
        title: "¿Cerrar sesión?",
        text: "Tendrás que iniciar sesión nuevamente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, salir",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            console.log("🔴 Cerrando sesión...");
            localStorage.removeItem("usuario");
            sessionStorage.removeItem("sesion_activa");
            window.location.href = "login.html";
        } else {
            console.log("✅ Cancelado, el usuario sigue en sesión.");
        }
    });
}
