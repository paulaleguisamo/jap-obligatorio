
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("formularioregistro").addEventListener("submit", submitEventHandler);
    let login = false;
    function submitEventHandler(evento) {
        evento.preventDefault();
        window.location.href = "index.html";
        sessionStorage.setItem("login", true);

        var email = document.getElementById("email").value;
        localStorage.setItem("cuenta", email);
        var clave = document.getElementById("password").value;
        localStorage.setItem("clave", clave);
        return true;

    }
});


