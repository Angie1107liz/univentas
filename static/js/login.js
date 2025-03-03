document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("loginForm");

    if (!form) {
        console.error("⚠️ Error: No se encontró el formulario con id 'loginForm'.");
        return;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        let datos = {
            correo_electronico: document.getElementById("correo_electronico").value,
            contrasena: document.getElementById("contrasena").value
        };

        try {
            let respuesta = await fetch("http://127.0.0.1:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos)
            });

            let resultado = await respuesta.json();

            if (respuesta.ok) {
                // ✅ Guardamos el usuario en localStorage
                localStorage.setItem("usuario", JSON.stringify(resultado.usuario));

                // ✅ Guardamos en sessionStorage que la sesión está activa
                sessionStorage.setItem("sesion_activa", "true");

                // ✅ Redirigir a ciclos.html
                window.location.href = "ciclos.html";
            } else {
                alert("❌ " + resultado.error);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    });
});
