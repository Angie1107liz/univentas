document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("registroForm");
    const mensaje = document.getElementById("mensajeRegistro"); // Elemento donde mostraremos el mensaje

    if (!form) {
        console.error("⚠️ Error: No se encontró el formulario con id 'registroForm'. Revisa tu HTML.");
        return;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        let datos = {
            nombre_usuario: document.getElementById("nombre_usuario").value,
            correo_electronico: document.getElementById("correo_electronico").value,
            tipo_identificacion: document.getElementById("tipo_identificacion").value,
            numero_identificacion: document.getElementById("numero_identificacion").value,
            contrasena: document.getElementById("contrasena").value
        };

        try {
            let respuesta = await fetch("http://127.0.0.1:5000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos)
            });

            let resultado = await respuesta.json();

            if (respuesta.ok) {
                // 🟢 Éxito: Mostrar mensaje en pantalla
                mensaje.innerHTML = `<p style="color: green;">✔️ ${resultado.mensaje}</p>`;
                form.reset(); // Opcional: Limpiar formulario después del registro
            } else {
                // 🔴 Error: Mostrar mensaje de error
                mensaje.innerHTML = `<p style="color: red;">❌ ${resultado.error}</p>`;
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            mensaje.innerHTML = `<p style="color: red;">❌ Ocurrió un error. Inténtalo de nuevo.</p>`;
        }
    });
});
