const ORDER_ASC_BY_COST = "COST";
const ORDER_DSC_BY_COST = "COST_DSC";
const ORDER_DESC_BY_SOLD_COUNT = "SOLD_COUNT";
const ORDER_BY_PROD_COST = "PRECIO.";

var products = [];
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DSC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_SOLD_COUNT) {
        result = array.sort(function (a, b) {
            if (a.soldCount > b.soldCount) { return -1; }
            if (a.soldCount < b.soldCount) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_COST) {
        result = array.sort(function (a, b) {
            let aCost = parseInt(a.productscost);
            let bCost = parseInt(b.productscost);

            if (aCost > bCost) { return -1; }
            if (aCost < bCost) { return 1; }
            return 0;
        });
    };
    return result;
}

function showProductsList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let products = currentProductsArray[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(products.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(products.cost) <= maxCost))) {

            htmlContentToAppend += `
         
            <div class="space_title col-6 col-sm-6 col-md-6 col-lg-4 col-xl-3 d-flex align-items-stretch">
            <a href="product-info.html?`+ products.name + `" class="card mb-4 shadow-sm custom-card">
                <img src="` + products.imgSrc + `" alt="` + products.description + `" class="bd-placeholder-img card-img-top"">
                <div class="card-body text-center">
                    <h4>`+ products.name + `</h4>
                    <h5>` + products.currency + " " + products.cost + `</h5>
                    <small class="text-muted">` + products.soldCount + " " + `productos vendidos </small>
                    <p class="card-text ">` + products.description + `</p>
                </div>
            </a>
            </div>
            `
        }
    } document.getElementById("products-list-container").innerHTML = htmlContentToAppend;
}

function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro los productos ordenados
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok")
            sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
    });
});

document.getElementById("sortAsc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_ASC_BY_COST);
});

document.getElementById("sortDscCost").addEventListener("click", function () {
    sortAndShowProducts(ORDER_DSC_BY_COST);
});

document.getElementById("sortDesc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_DESC_BY_SOLD_COUNT);
});

document.getElementById("sortByCost").addEventListener("click", function () {
    sortAndShowProducts(ORDER_BY_PROD_COST);
});

document.getElementById("clearRangeFilter").addEventListener("click", function () {
    document.getElementById("rangeFilterCostMin").value = "";
    document.getElementById("rangeFilterCostMax").value = "";

    minCost = undefined;
    maxCost = undefined;

    showProductsList();
});

document.getElementById("rangeFilterCost").addEventListener("click", function () {
    //Obtengo el mínimo y máximo de los intervalos para filtrar los productos
    minCost = document.getElementById("rangeFilterCostMin").value;
    maxCost = document.getElementById("rangeFilterCostMax").value;

    if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
        minCost = parseInt(minCost);
    }
    else {
        minCost = undefined;
    }

    if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
        maxCost = parseInt(maxCost);
    }
    else {
        maxCost = undefined;
    }

    showProductsList();

});

document.getElementById("sortMiddle").addEventListener("click", function () {

    minCost = 10000;
    maxCost = 15000;

    if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
        minCost = parseInt(minCost);
    }
    else {
        minCost = undefined;
    }

    if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
        maxCost = parseInt(maxCost);
    }
    else {
        maxCost = undefined;
    }

    showProductsList();

});

document.getElementById("sortLess").addEventListener("click", function () {

    minCost = 0;
    maxCost = 10000;

    if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
        minCost = parseInt(minCost);
    }
    else {
        minCost = undefined;
    }

    if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
        maxCost = parseInt(maxCost);
    }
    else {
        maxCost = undefined;
    }

    showProductsList();

});

document.getElementById("sortMore").addEventListener("click", function () {

    minCost = 15000;
    maxCost = 100000;

    if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
        minCost = parseInt(minCost);
    }
    else {
        minCost = undefined;
    }

    if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
        maxCost = parseInt(maxCost);
    }
    else {
        maxCost = undefined;
    }

    showProductsList();

});

document.getElementById("sortLimpiar").addEventListener("click", function () {

    minCost = 0;
    maxCost = 100000;

    if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
        minCost = parseInt(minCost);
    }
    else {
        minCost = undefined;
    }

    if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
        maxCost = parseInt(maxCost);
    }
    else {
        maxCost = undefined;
    }

    showProductsList();

});

var arrayOriginal = currentProductsArray;

document.getElementById("searchBar").addEventListener("keyup", function () {
    filterSearch = document.getElementById("searchBar").value;

    if (filterSearch != undefined) {
        arrayOriginal = currentProductsArray;
        currentProductsArray = currentProductsArray.filter(function (elemento) {
            return elemento.name.toLowerCase().includes(filterSearch.toLowerCase())
        })
    }
    showProductsList();

    currentProductsArray = arrayOriginal;

});

