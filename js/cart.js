let totalesPorArticulos = [];
let total_articles_count = [];
const reducer = (accumulator, currentValue) => accumulator + currentValue;
let USDtoUYU = 40;
let shippingPorcentage = 0;
let subtotals = totalesPorArticulos

function showCartProducts(array) {
    let htmlCommentsToAppend = "";

    for (let i = 0; i < array.length; i++) {
        total_articles_count.push(articles[i].count)
    }

    for (var i = 0; i < array.length; i++) {
        let articles = array[i];

        if (articles.currency == "USD") {
            totalesPorArticulos[i] = articles.unitCost * USDtoUYU * total_articles_count[i];
        } else if (articles.currency == "UYU") {
            totalesPorArticulos[i] = articles.unitCost * total_articles_count[i];
        }

        htmlCommentsToAppend += `
        
        <tr>
            <td> <img src="` + articles.src + `" alt="" class="img-carrito"></td>
            <td class="cantidadespacio">`+ articles.name + `</td>
            <td class="cantidadespacio"> `+ articles.currency + " " + articles.unitCost + ` </td>
            <td class="cantidadespacio"> <input class="cantidad" type="number" id="cantidad` + i + `"  min="1" value="` + total_articles_count[i] + `" ></input></td>
            <td class="subtotales">  UYU `+ totalesPorArticulos[i] + `</td>
        </tr>
        `;
    }
    document.getElementById("commentscontainer").innerHTML = htmlCommentsToAppend;


    for (let i = 0; i < array.length; i++) {
        document.getElementById("cantidad" + i).addEventListener("change", (e) => {
            total_articles_count[i] = document.getElementById("cantidad" + i).value;
            showCartProducts(articles);
            showPrices(articles);

        });
    }
}


function showPrices() {

    let subUnitCost = document.getElementById("subtotales");
    let shippingCost = document.getElementById("precioenvio");
    let totalCost = document.getElementById("totaldelpedido");

    let subtotals = totalesPorArticulos.reduce(reducer)
    console.log(subtotals)

    let shippingCostToShow = (Math.round(subtotals * shippingPorcentage * 100) / 100);
    let totalCostShow = subtotals + shippingCostToShow;

    subUnitCost.innerHTML = "UYU " + subtotals;
    shippingCost.innerHTML = "UYU " + shippingCostToShow;
    totalCost.innerHTML = "UYU " + totalCostShow;

}


function displayRadioValue() {
    var ele = document.getElementsByName('metodo_pago');


    for (i = 0; i < ele.length; i++) {

        if (ele[i].checked)
            document.getElementById("showPayMethod").innerHTML
                = ele[i].value;
    }

}

function habilitarDeshabilitar() {
    var credito = document.getElementById("credito");
    credito.addEventListener("click", function (e) {
        document.getElementById("numero_banco").disabled = true;
        document.getElementById("numero_credito").disabled = false;
        document.getElementById("CCV").disabled = false;
        document.getElementById("fecha_de_vencimiento").disabled = false;
        document.getElementById("pay").innerHTML = `<span class="text - muted validation"> </span>`

    })

    var bancaria = document.getElementById("bancaria");
    bancaria.addEventListener("click", function (e) {
        document.getElementById("numero_banco").disabled = false;
        document.getElementById("numero_credito").disabled = true;
        document.getElementById("CCV").disabled = true;
        document.getElementById("fecha_de_vencimiento").disabled = true;
        document.getElementById("pay").innerHTML = `<span class="text - muted validation"> </span>`

    })
}

function validaciones() {

    var form = document.getElementById("formulario_de_pago");
    form.addEventListener("submit", function (e) {

        var regex_adress = /^[a-zA-ZñÑáÁéÉíÍóÓúÚüÜ .]+$/;
        var regexInputA = document.getElementById("direccion");
        var match = document.getElementById("match_adress");

        if (regex_adress.test(regexInputA.value)) {
            match.innerHTML = `<span></span>`
        } else {
            match.innerHTML = `<span class="text-muted validation">Ingrese un nombre de calle valida</span>`
            e.preventDefault();
        }


        var regex_adress2 = /^\d{3,6}$/;
        var regexInputA2 = document.getElementById("direccion2");
        var match2 = document.getElementById("match_adress2");

        if (regex_adress2.test(regexInputA2.value)) {
            match2.innerHTML = `<span></span>`
        } else {
            match2.innerHTML = `<span class="text-muted validation">Ingrese un número de puerta valido</span>`
            e.preventDefault();
        }


        var regex_adress3 = /^[a-zA-ZñÑáÁéÉíÍóÓúÚüÜ .]+$/;
        var regexInputA3 = document.getElementById("direccion3");
        var match3 = document.getElementById("match_adress3");

        if (regex_adress3.test(regexInputA3.value)) {
            match3.innerHTML = `<span></span>`
        } else {
            match3.innerHTML = `<span class="text-muted validation">Ingrese un nombre de calle valida</span>`
            e.preventDefault();
        }


        var selectValidatio = document.getElementById("pais")
        var match4 = document.getElementById("match_contry");

        if (selectValidatio.value == 0) {
            match4.innerHTML = `<span class="text-muted validation">Ingrese un país valido</span>`
            e.preventDefault();
        } else {
            match4.innerHTML = `<span></span>`
        }

        if (!document.querySelector('input[name="envio"]:checked')) {
            document.getElementById("match_shipping").innerHTML = `<span class="text - muted validation">Seleccione una opción </span>`

            hasError = true;
            e.preventDefault();
        } else {
            document.getElementById("match_shipping").innerHTML = `<span class="text - muted validation"> </span>`
        }



    });

}

function validationModal() {


    var regex_card = /^\d{14,16}$/;
    var regexInputC = document.getElementById("numero_credito");
    var match5 = document.getElementById("match_card");
    regexInputC.addEventListener("keyup", (e) => {
        if (regex_card.test(regexInputC.value)) {
            match5.innerHTML = `<span></span>`
        } else {
            match5.innerHTML = `<span class="text-muted validation">Ingrese un número valido</span>`
        }
    })

    var regex_card2 = /^\d{3}$/;
    var regexInputC2 = document.getElementById("CCV");
    var match6 = document.getElementById("match_ccv");
    regexInputC2.addEventListener("keyup", (e) => {
        if (regex_card2.test(regexInputC2.value)) {
            match6.innerHTML = `<span></span>`
        } else {
            match6.innerHTML = `<span class="text-muted validation">Ingrese un CCV valido</span>`
        }
    })

    var fecha = document.getElementById("fecha_de_vencimiento")
    var match7 = document.getElementById("match_date");
    fecha.addEventListener("click", (e) => {
        if (fecha.value == "") {
            match7.innerHTML = `<span class="text-muted validation">Ingrese una fecha valida</span>`
        } else {
            match7.innerHTML = `<span></span>`
        }
    })

    var regex_bank = /^\d{10,12}$/;
    var regexInputB = document.getElementById("numero_banco");
    var match8 = document.getElementById("match_bank");
    regexInputB.addEventListener("keyup", (e) => {
        if (regex_bank.test(regexInputB.value)) {
            match8.innerHTML = `<span></span>`
        } else {
            match8.innerHTML = `<span class="text-muted validation">Ingrese un número valido</span>`
        }
    })

    if (!document.querySelector('input[name="metodo_pago"]:checked')) {
        document.getElementById("pay").innerHTML = `<span class="text - muted validation">Seleccione una opción </span>`
        hasError = true;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            articles = resultObj.data.articles;

            showCartProducts(articles)
            showPrices(articles);

            displayRadioValue(articles)
            habilitarDeshabilitar(articles)

            validaciones(articles)
            validationModal(articles)

        }
    });

    document.getElementById("premium").addEventListener("change", function () {
        shippingPorcentage = 0.15
        showPrices();
    });

    document.getElementById("express").addEventListener("change", function () {
        shippingPorcentage = 0.07
        showPrices();
    });

    document.getElementById("standard").addEventListener("change", function () {
        shippingPorcentage = 0.05
        showPrices();
    });
});










