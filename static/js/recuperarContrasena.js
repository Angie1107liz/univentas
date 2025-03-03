document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("recuperar-form");

    if (!formulario) {
        console.error("❌ No se encontró el formulario con id 'miFormulario'");
        return;
    }

    formulario.addEventListener("submit", async function (event) {
        event.preventDefault(); // Evita que la página se recargue

        const correo = document.getElementById("correo").value;

        if (!correo) {
            alert("Por favor, ingresa tu correo electrónico.");
            return;
        }

        try {
            const response = await fetch("http://192.168.1.122:5000/recuperarContrasena", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ correo_electronico: correo })
            });

            if (!response.ok) {
                throw new Error("Error en la respuesta del servidor");
            }

            const data = await response.json();
            
            if (data.error) {
                alert("❌ " + data.error);
            } else {
                alert("✅ " + data.mensaje);
            }

        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("Hubo un problema al enviar la solicitud.");
        }
    });
});
