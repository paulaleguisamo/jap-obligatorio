
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


function show_text() {

    document.getElementById("nombre").innerHTML = localStorage.getItem("nombres");
    document.getElementById("apellidos").innerHTML = localStorage.getItem("apellidos");
    document.getElementById("edad").innerHTML = localStorage.getItem("edad");
    document.getElementById("correo_electronico").innerHTML = localStorage.getItem("email");
    document.getElementById("telefono_de_contacto").innerHTML = localStorage.getItem("telefono");

    var elems = document.getElementsByClassName("datos");
    for (var i = 0; i < elems.length; ++i) {
        elems[i].style.display = 'block';
    }

}

document.addEventListener("DOMContentLoaded", function (e) {


    document.getElementById("datos_actualizados").addEventListener("submit", (e) => {

        var nombre = document.getElementById("nombres_actualizado").value;
        var apellidos = document.getElementById("apellidos_actualizado").value;
        var edad = document.getElementById("edad_actualizado").value;
        var email = document.getElementById("correo_electronico_actualizado").value;
        var telefono = document.getElementById("telefono_actualizado").value;

        localStorage.setItem("nombres", nombre)
        localStorage.setItem("apellidos", apellidos)
        localStorage.setItem("edad", edad);
        localStorage.setItem("email", email);
        localStorage.setItem("telefono", telefono);

        return true;
    });

    show_text()


});