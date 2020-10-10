let totalesPorArticulos = [];
let total_articles_count = [];
const reducer = (accumulator, currentValue) => accumulator + currentValue;
total = 0;

function showCartProducts(array) {
    let htmlCommentsToAppend = "";

    for (let i = 0; i < array.length; i++) {
        total_articles_count.push(articles[i].count)
    }

    for (var i = 0; i < array.length; i++) {
        let articles = array[i];

        if (articles.currency == "USD") {
            totalesPorArticulos[i] = articles.unitCost * 40 * total_articles_count[i];
        } else if (articles.currency == "UYU") {
            totalesPorArticulos[i] = articles.unitCost * total_articles_count[i];
        }

        htmlCommentsToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + articles.src + `" alt="" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ articles.name + `</h4>
                        <small> Seleccione la cantidad:`+ " " + `<br> <input type="number" id="cantidad` + i + `"  min="1"></input></small>
                    </div>
                    <small class="text-muted"> Articulos a comprar: `+ total_articles_count[i] + ` </small>
                    <p class="mb-1"> Precio unitario:`+ " " + articles.currency + " " + articles.unitCost + ` </p>
                    <p class="mb-1"> Total por articulo: UYU`+ " " + totalesPorArticulos[i] + ` </p>
                    </div>
                </div>
            </div>
        </div>
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


function showPrices(array) {
    let htmlCommentsToAppend2 = "";

    for (let i = 0; i < array.length; i++) {
        let articles = array[i];

        htmlCommentsToAppend2 += `
        <p>`+ articles.name + " : UYU " + totalesPorArticulos[i] + `</p>
        `;
    }

    document.getElementById("subtotales").innerHTML = htmlCommentsToAppend2;

    total = totalesPorArticulos.reduce(reducer);
    document.getElementById("totaldelpedido").innerHTML = " UYU " + total;
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL)
        .then(function (resultObj) {
            if (resultObj.status === "ok") {
                articles = resultObj.data.articles;
                showCartProducts(articles)
                showPrices(articles);
            }
        });
});

