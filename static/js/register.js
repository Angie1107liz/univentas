document.getElementById("registroForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    let datos = {
        nombre_usuario: document.getElementById("nombre_usuario").value,
        correo_electronico: document.getElementById("correo_electronico").value,
        tipo_identificacion: document.getElementById("tipo_identificacion").value,
        numero_identificacion: document.getElementById("numero_identificacion").value,
        contrasena: document.getElementById("contrasena").value
    };

    let respuesta = await fetch("http://127.0.0.1:5000/register.html", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    });

    let resultado = await respuesta.json();
    console.log(resultado);
});
