document.addEventListener("DOMContentLoaded", function () {
    const formRestablecer = document.getElementById("formRestablecer");

    // Obtener el token de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (!token) {
        alert("Token no válido.");
        window.location.href = "recuperarContrasena.html";
        return;
    }

    formRestablecer.addEventListener("submit", async function (event) {
        event.preventDefault();

        const nuevaContrasena = document.getElementById("nueva_contrasena").value;

        if (!nuevaContrasena) {
            alert("Por favor, ingresa una nueva contraseña.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5002/restablecer-contrasena", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, nueva_contrasena: nuevaContrasena })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Contraseña restablecida con éxito.");
                window.location.href = "login.html";
            } else {
                alert("Error: " + data.error);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("Hubo un problema al restablecer la contraseña.");
        }
    });
});
