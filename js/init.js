const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

//Redirección de Login-Index
if (
  !window.location.href.endsWith("login.html") &&
  !sessionStorage.getItem("login")) {
  window.location.href = 'login.html'
}


//Menú desplegable con el nombre del Usuario
var divDropDown = document.createElement("div");
divDropDown.setAttribute("class", "dropdown");
document.getElementById("menu").appendChild(divDropDown);

var nombreDeUsuario = document.createElement("a");
nombreDeUsuario.setAttribute("role", "button");
nombreDeUsuario.setAttribute("data-toggle", "dropdown");
nombreDeUsuario.setAttribute("id", "usuario");
nombreDeUsuario.setAttribute("class", "py-2 d-none d-md-inline-block btn btn-secondary dropdown-toggle");
nombreDeUsuario.setAttribute("href", "#");
nombreDeUsuario.setAttribute("aria-haspopup", "true");
nombreDeUsuario.setAttribute("aria-expanded", "false");
divDropDown.appendChild(nombreDeUsuario);

var dropDownMenu = document.createElement("div");
dropDownMenu.setAttribute("class", "dropdown-menu");
dropDownMenu.setAttribute("aria-labelledby", "dropdownMenuLink");
divDropDown.appendChild(dropDownMenu);

var perfilDelUsuario = document.createElement("a");
perfilDelUsuario.setAttribute("class", "dropdown-item");
perfilDelUsuario.setAttribute("href", "my-profile.html");
perfilDelUsuario.innerHTML = "Mi Perfil";
dropDownMenu.appendChild(perfilDelUsuario);

var carritoDelUsuario = document.createElement("a");
carritoDelUsuario.setAttribute("class", "dropdown-item");
carritoDelUsuario.setAttribute("href", "cart.html");
carritoDelUsuario.innerHTML = "Mi Carrito";
dropDownMenu.appendChild(carritoDelUsuario);

var cerrarSesion = document.createElement("a");
cerrarSesion.setAttribute("class", "dropdown-item");
cerrarSesion.setAttribute("id", "cerrar-sesion");
cerrarSesion.setAttribute("href", "login.html");
cerrarSesion.innerHTML = "Cerrar Sesión";
dropDownMenu.appendChild(cerrarSesion);

//Función de colocar Nombre de Usuario y Cierre Sesión
document.addEventListener("DOMContentLoaded", function (e) {
  let userLogged = sessionStorage.getItem("login");
  document.getElementById("usuario").innerHTML = localStorage.getItem("cuenta");

  document.getElementById("cerrar-sesion").addEventListener("click", (evento) => {
    sessionStorage.removeItem("login");
  });
});
