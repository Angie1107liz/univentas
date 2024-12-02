//se almacena la url de la api
let urlUsuario="http://127.0.0.1:8000/univentas/api/v1/usuario";
function listarUsuario() {
    var busqueda = document.getElementById("buscar").value;
    var urlBusqueda = urlUsuario;
    if (busqueda!=""){
        urlBusqueda+="?search="+busqueda;
    }   
    $.ajax({
        url:urlBusqueda,
        type: "GET",
        success: function(result){//success: funcion que se ejecuta cusndo la peticion tiene exito
            console.log(result);
            let curpoTablaUsuario = document.getElementById("curpoTablaUsuario");
            curpoTablaUsuario.innerHTML="";
            for (let i = 0; i < result.length; i++) {
               //se crea una etiqueta tr por cada registro
                let trRegistro = document.createElement("tr");//fila por cada registro de la tabla
                let celdaId = document.createElement("td");
                let celdaCorreo = document.createElement("td");
                let celdaNit = document.createElement("td");
                let celdaPassword= document.createElement("td");
                let celdaNumeroDocumento=document.createElement("td")
                let celdaTipo_documento=document.createElement("td")
                // let celdaEstado = document.createElement("td");

                // let celdaEditar = document.createElement("td");
                
                //almacenamos en valor
                
                celdaId.innerText = result[i]["id"];
                celdaCorreo.innerText= result[i]["correo"];
                celdaNit.innerText = result[i]["nit"];
                celdaPassword.innerText = result[i]["password"];
                celdaTipo_documento.innerText = result[i]["tipoDocumento"];
                celdaNumeroDocumento.innerText = result[i]["numeroDocumento"]
    
                
                //agregando a los td a su respectivo th y agregandolos a la fila

                trRegistro.appendChild(celdaId);
                trRegistro.appendChild(celdaCorreo);
                trRegistro.appendChild(celdaNit);
                trRegistro.appendChild(celdaNumeroDocumento);
                trRegistro.appendChild(celdaPassword);
                trRegistro.appendChild(celdaTipo_documento);
                
                //boton editar 
                let celdaOpcion= document.createElement("td");
                let botonEditarUsuario= document.createElement("button");
                botonEditarUsuario.value=result[i]["id"];
                botonEditarUsuario.innerHTML="<i class='fa-solid fa-pencil'></i>";
                

                botonEditarUsuario.onclick=function(e){
                    $('#exampleModal').modal('show');
                    consultarUsuarioID(this.value); 
                }
                botonEditarUsuario.className= "btn btn-outline-warning"

                celdaOpcion.appendChild(botonEditarUsuario); 
                trRegistro.appendChild(celdaOpcion);

                curpoTablaUsuario.appendChild(trRegistro);//se traen todos los registros

                 //boton Eliminar
                 let botonEliminarUsuario = document.createElement("button");
                 botonEliminarUsuario.innerHTML = "<i class='fas fa-trash-alt eliminar'></i>"; 
                 botonEliminarUsuario.className = "btn btn-outline-warning"; 
                  
                 let usuarioIdParaEliminar = result[i]["id"];
                 botonEliminarUsuario.onclick = function() {
                    eliminarUsuario(usuarioIdParaEliminar); // Llama a la función eliminarProducto con el ID del producto
                  };
                 
                 celdaOpcion.appendChild(botonEliminarUsuario); 
                 trRegistro.appendChild(celdaOpcion);
    
            }
        },
        error:function(error){
            alert("Error en la peticion ${error}");
        }
    })
 
}

//Paso para crear el registro de un cliente ****
function registrarUsuario() {
    
    let correo = document.getElementById("correo").value;
    let nit =document.getElementById("nit").value;
    let password = document.getElementById("password").value;
    let tipoDocumento = document.getElementById("tipoDocumento").value;
    let numeroDocumento= document.getElementById("numeroDocumento").value;

    let formData = {
        
        "correo": correo,
        "nit": nit,
        "password": password,
        "numeroDocumento": numeroDocumento,
        "tipoDocumento": tipoDocumento,
    };

    if(validarCampos()){

        $.ajax({
          url: urlUsuario,
          type: "POST",
          data: formData,
          success: function(result){
            Swal.fire({
              title: "Excelente",
              text: "Su registro se guardó correctamente",
              icon: "success"
            });
            // window.location.href= "http://127.0.0.1:5500/front_end/clienteRegistro.html";
          },
          error: function(error){
            Swal.fire("Error", "Error al guardar "+error.responseText, "error");
          }
        });
      }else{
       // alert("llena los campos correctamente")
        Swal.fire({
          title: "Error!",
          text: "complete los campos correctamente",
          icon: "error"
        });
      }
}


//Paso para que el usuario se registre y llene todos los datos correctamente :D****
function validarCampos() {
    var correo = document.getElementById("correo");
    var nit = document.getElementById("nit"); 
    var password = document.getElementById("password"); 
    var numeroDocumento = document.getElementById("numeroDocumento"); 
     

    return validarCorreo(correo) && validarNit(nit) 
         && validarPassword(password)
         && validarNumeroDocumento(numeroDocumento) ;
}




function validarCorreo(Correo){
    let valor = Correo.value;
    let valido = true;
    if (valor.length <=0 || valor.length >150) {
        valido = false
    }
    if (valido) {
        Correo.className = "form-control is-valid"
    }
    else{
        Correo.className = "form-control is-invalid"
    }
    return valido;
}

function validarNit(nit){
    let valor = nit.value;
    let valido = true;
    if (valor.length <=0 || valor.length >10) {
        valido = false
    }
    if (valido) {
        nit.className = "form-control is-valid"
    }
    else{
        nit.className = "form-control is-invalid"
    }
    return valido;
}
function validarPassword(password){
    let password = password.value;
    let valido = true;
    if (valor.length <=0 || valor.length >10) {
        valido = false
    }
    if (valido) {
        password.className = "form-control is-valid"
    }
    else{
        password.className = "form-control is-invalid"
    }
    return valido;
}
function validarPassword(password){
    let password = password.value;
    let valido = true;
    if (valor.length <=0 || valor.length >10) {
        valido = false
    }
    if (valido) {
        password.className = "form-control is-valid"
    }
    else{
        password.className = "form-control is-invalid"
    }
    return valido;
}




//Cuando le damos click al boton de guardar, este llamara a la function Update por medio del onclick******
function updateUsuario() {
    var id = document.getElementById("id").value;

    let formData = {
        "correo": document.getElementById("correo").value,
        "nit": document.getElementById("nit").value,
        "password": document.getElementById("password").value,
        "numeroDocumento": document.getElementById("numeroDocumento").value,
        "tipoDocumento": document.getElementById("tipoDocumento").value,
       
    };


    //Cuando estamos actualizando los datos, y lo hacemos correctamente Aparecerá la Alerta EXCELENTE *****
    if(validarCampos()){
    $.ajax({
        url: urlUsuario + id+"/",
        type: "PUT",
        data: formData,
        success: function(result) {
            Swal.fire({
                title: "Excelente",
                text: "Su registro se actualizó correctamente",
                icon: "success"
            });
            
            var modal = document.getElementById("exampleModal"); 
            modal.style.display = "hide";

            listarUsuario(); //Lista los médicos después de actualizar
        },
        error: function(error) {
            Swal.fire("Error", "Error al guardar", "error");
        }  
    });
    }else{
        Swal.fire({
            title: "Error!",
            text: "Complete los campos correctamente",
            icon: "error"
        });
        }
}


/* metodo para obtener los datos en el modal de actualizar*/ 
//1.Crear petición que traiga la información del cliente por id
function consultarUsuarioID(id){
    //alert(id);
    $.ajax({
        url:urlUsuario+id,
        type:"GET",
        success: function(result){
            
            document.getElementById("id").value=result["id"];
            document.getElementById("correo").value=result["correo"];
            document.getElementById("nit").value=result["nit"];
            document.getElementById("password").value=result["password"];
            document.getElementById("tipoDocumento").value=result["tipoDocumento"]
            document.getElementById("numeroDocumento").value=result["numeroDocumento"];
        }
    });
}
function limpiar(){

    // document.getElementById("id").className="form-control";
    document.getElementById("correo").className="form-control";
    document.getElementById("nit").className="form-control";
    document.getElementById("password").className="form-control"
    document.getElementById("numeroDocumento").className="form-control";
    document.getElementById("tipoDocumento").className="form-control";


    // document.getElementById("tipo_Identificacion").value = "";
    document.getElementById("correo").value="";
    document.getElementById("nit").value = "";
    document.getElementById("password").value = "";
    document.getElementById("numeroDocumento").value = "";
    document.getElementById("tipoDocumento").value = "";
   
}


   // funcion de  elimado permanente  
   function eliminarUsuario(id) {
    // Mostrar un cuadro de diálogo para confirmar la eliminación
    Swal.fire({
      title: '¿Estás seguro de eliminar este registro ?',
      text: "Esta opción no tiene marcha atrás",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar!'
    }).then((result) => {
      // Si el usuario confirma la eliminación, proceder con la solicitud AJAX
      if (result.isConfirmed) {
        $.ajax({
          url: urlUsuario + id+"/",
          type: "DELETE",
          success: function (eliminarPermanente) {
            // Mostrar un mensaje de éxito
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Registro Eliminado",
                showConfirmButton: false,
                timer: 1500
            });
            // Actualizar la lista de cliente después de eliminar
            listarUsuario();
          },
          error: function (xhr, status, error) {
            // Manejo de errores
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El registro tiene un ingreso.'
            });
          }
        });
      }
   });
 };
