var product = {};
var variable = {};


//Titulo ccon parametros de URL
let titulo = document.getElementById("productName");

function getQueryVariable(variable) {

    var query = window.location.search.substring(1);
    var vars = query.split("%20");
    var titulo = vars.toString();
    titulo = titulo.replace(/,/g, " ");
    return titulo;
}

let name = getQueryVariable(variable)
titulo.innerHTML = name;

//Imagenes de producto
function showImagesGallery(array) {
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `
        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}


//Productos relacionados 

var products = "";
//console.log(nuevoArray);
function newArray(array) {
    let htmlProductsToAppend = "";
    for (let p = 1; p < array.length; p++) {
        products = array[p];

        array.splice(2, 1);

        //console.log(products);
        // console.log(p);
        htmlProductsToAppend += `

        <a href="product-info.html?`+ products.name + `" class="list-group-item list-group-item-action">
        <div class="row relacionado">
            <div class="col-3">
                <img src="` + products.imgSrc + `" alt="` + products.description + `" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">`+ products.name + " " + " - " + products.currency + " " + products.cost + `</h4>
                    <small class="text-muted">` + products.soldCount + " " + `productos vendidos </small>
                </div>
                <p class="mb-1">` + products.description + `</p>
            </div>
        </div>
    </a>
    `;
    }
    document.getElementById("productRelated").innerHTML = htmlProductsToAppend;
}

//COMENTARIOS

function showComments(array) {

    let htmlCommentsToAppend = "";

    for (var i = 0; i < array.length; i++) {

        let comentarios = array[i];
        let score = array[i].score;
        //console.log(score);

        htmlCommentsToAppend += `
            <div class="container">
            <p id="estrellas">`+ '<i class="fa fa-star text-yellow"></i>'.repeat(score) + `</p>
                <p class="usuario">` + comentarios.user + `<br>` + `</p>
                <p>`+ comentarios.description + `<br>` + `</p>
                <p class="date">`+ comentarios.dateTime + `</p>
            </div>
            <hr>
        `;
        //console.log(comentarios); 
    }
    document.getElementById("commentscontainer").innerHTML = htmlCommentsToAppend;
}

// Estrellas dinamicas 
$(document).ready(function () {
    $(".rating input:radio").attr("checked", false);
    $('.rating input').click(function () {
        $(".rating span").removeClass('checked');
        $(this).parent().addClass('checked');
    });
});

function myFunction() {
    var selchbox = [];
    var inputfields = document.getElementsByName("rating");
    var ar_inputflds = inputfields.length;

    for (var i = 0; i < ar_inputflds; i++) {
        if (inputfields[i].type == 'radio' && inputfields[i].checked == true)
            selchbox.push(inputfields[i].value);
    }
    return selchbox;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;


            let productsDescriptionHTML = document.getElementById("productNameDescription");
            let productsCostHTML = document.getElementById("productCost");
            let productssoldCountHTML = document.getElementById("productsoldCount");
            let productsCategory = document.getElementById("productCategory");


            productsCategory.innerHTML = product.category;
            productssoldCountHTML.innerHTML = product.soldCount;
            productsCostHTML.innerHTML = product.currency + " " + product.cost;
            productsDescriptionHTML.innerHTML = product.description;


            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });


    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comentarios = resultObj.data;

            showComments(comentarios)
            //console.log(comentarios);
        }
    });

    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productos = resultObj.data;

            newArray(productos);
            //console.log(productos);
        }
    });


    //Formulario para realizar un comentario 
    // Fecha 
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }

    today = yyyy+ '-' + mm + '-' + dd;
    console.log(today);

    // Hora 
    var time = new Date
    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();
    var prepand = (hour >= 12) ? " PM " : " AM ";

    hour = (hour >= 24) ? hour - 24 : hour;
    if (hour === 0 && prepand === ' PM ') {
        if (minute === 0 && second === 0) {
            hour = 12;
            prepand = ' Noon';
        }
        else {
            hour = 12;
            prepand = ' PM';
        }
    }
    if (hour === 0 && prepand === ' AM ') {
        if (minute === 00 && second === 0) {
            hour = 12;
            prepand = ' Midnight';
        }
        else {
            hour = 12;
            prepand = ' AM';
        }
    }
    time = hour + ":" + minute + ":" + second;
    console.log(time);

    //usuario

    document.getElementById("usuariodecomenatario").innerHTML = localStorage.getItem("cuenta");
    console.log(localStorage.getItem("cuenta"))

    //Estrellas

    document.getElementById("envioDeComentario").addEventListener('submit', function (event) {
        event.preventDefault();

        let publicar = '';
        let comentario = document.getElementById("publicarcomentario");
        let user = localStorage.getItem("cuenta");
        var value = myFunction();
        
        publicar = `
        <div class="container">
        <p id="estrellas">`+ '<i class="fa fa-star text-yellow"></i>'.repeat(value) + `</p>
            <p class="usuario">` + user + `<br>` + `</p>
            <p>`+ comentario.value + `<br>` + `</p>
            <p class="date">`+ today + " "+ time + `</p>
        </div>`

        document.getElementById("comentarioreal").innerHTML = publicar;
    });

});

