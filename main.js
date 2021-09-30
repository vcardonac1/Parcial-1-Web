/* eslint-disable no-loop-func */
const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

const selected = document.getElementById("selected");
const productsDiv = document.getElementById("products");
const numItems = document.getElementById("numItems");
const carrito = document.getElementById("carrito");
const cancelAll = document.getElementById("cancelAll");
const noCancel = document.getElementById("noCancel");
const modal = document.getElementById("mod");
const confirmCancel = document.getElementById("confirmCancel");

carrito.onclick = function () {
  displayCarrito();
};

cancelAll.onclick = function () {
  modal.style.display = "none";

  carritoProductos = [];
  carritoCantidades = [];
  carritoPrecioUnidad = [];
  carritoAmount = [];
  totalAmout = 0;

  numItemsNumber = 0;
  numItems.textContent = 0 + " items";
  displayCarrito();

  confirmCancel.style.display = "block";
  let close2 = document.getElementById("close2");
  close2.onclick = function () {
    confirmCancel.style.display = "none";
  };
};

noCancel.onclick = function () {
  modal.style.display = "none";
};

let carritoProductos = [];
let carritoCantidades = [];
let carritoPrecioUnidad = [];
let carritoAmount = [];
let totalAmout = 0;

let numItemsNumber = 0;

let datosJson;
fetch(url)
  .then((res) => res.json())
  .then((data) => saveIt(data));

let saveIt = (data) => {
  datosJson = data;
  cargarNavBar();
};

function cargarNavBar() {
  let name;
  const navBar = document.getElementById("barraNavegacion");

  datosJson.forEach((element) => {
    name = element.name;
    let col = document.createElement("div");
    col.className = "col-1";
    col.innerHTML = "<p id='" + name + "'>" + name + "</p>";
    navBar.appendChild(col);
  });
  getProducts();
}

function getProducts() {
  for (let index = 0; index < datosJson.length; index++) {
    const element = datosJson[index];
    let name = element.name;
    let x = document.getElementById(name);
    x.onclick = function () {
      selected.textContent = name;
      cargarProductos(datosJson, index);
    };
  }
}

function createCard(name, description, price, image) {
  let div = document.createElement("div");
  div.className = "card";
  div.style = "width: 18rem;";

  let divBody = document.createElement("div");
  divBody.className = "card-body";

  let im = document.createElement("img");
  im.src = image;

  let nm = document.createElement("h5");
  nm.className = "card-title";
  nm.textContent = name;

  let dscr = document.createElement("p");
  dscr.textContent = description;

  let prc = document.createElement("p");
  prc.style = "font-weight: bold;";
  prc.textContent = "$" + price;

  let a = document.createElement("a");
  a.className = "btn btn-secondary";
  a.textContent = "Add to car";

  a.onclick = function () {
    numItemsNumber = numItemsNumber + 1;
    numItems.textContent = numItemsNumber + " items";
    adicionarAlCarrito(name, price);
  };

  div.appendChild(im);
  divBody.appendChild(nm);
  divBody.appendChild(dscr);
  divBody.appendChild(prc);
  divBody.appendChild(a);
  div.appendChild(divBody);

  productsDiv.appendChild(div);
}

function cargarProductos(data, pos) {
  let x = data[pos];
  let products = x.products;
  productsDiv.innerHTML = "";
  products.forEach((element) => {
    createCard(element.name, element.description, element.price, element.image);
  });
}

function adicionarAlCarrito(name, price) {
  let existe = false;
  for (let index = 0; index < carritoProductos.length; index++) {
    const element = carritoProductos[index];
    if (element == name) {
      existe = true;
      carritoCantidades[index] = carritoCantidades[index] + 1;
      carritoAmount[index] = carritoAmount[index] + carritoPrecioUnidad[index];
    }
  }
  if (!existe) {
    carritoProductos.push(name);
    carritoCantidades.push(1);
    carritoPrecioUnidad.push(price);
    carritoAmount.push(price);
  }

  totalAmout = totalAmout + price;
}

function fillCarrito(tbody, total) {
  for (let index = 0; index < carritoProductos.length; index++) {
    let row = document.createElement("tr");

    let tdItem = document.createElement("th");
    tdItem.textContent = index + 1;

    let tdQty = document.createElement("td");
    tdQty.textContent = carritoCantidades[index];

    let tdDescription = document.createElement("td");
    tdDescription.textContent = carritoProductos[index];

    let tdUnitPrice = document.createElement("td");
    tdUnitPrice.textContent = carritoPrecioUnidad[index];

    let tdAmount = document.createElement("td");
    tdAmount.textContent = carritoAmount[index];

    let tdModify = document.createElement("td");

    let mas = document.createElement("a");
    mas.className = "btn btn-secondary";
    mas.textContent = "+";

    mas.onclick = function () {
      carritoCantidades[index] = carritoCantidades[index] + 1;
      carritoAmount[index] = carritoAmount[index] + carritoPrecioUnidad[index];
      tdQty.textContent = carritoCantidades[index];
      tdAmount.textContent = carritoAmount[index];

      totalAmout = totalAmout + carritoPrecioUnidad[index];
      total.textContent = "Total: $" + totalAmout;

      numItemsNumber = numItemsNumber + 1;
      numItems.textContent = numItemsNumber + " items";
    };

    let menos = document.createElement("a");
    menos.className = "btn btn-secondary";
    menos.textContent = "-";

    menos.onclick = function () {
      if (carritoCantidades[index] - 1 >= 0) {
        carritoCantidades[index] = carritoCantidades[index] - 1;
        carritoAmount[index] =
          carritoAmount[index] - carritoPrecioUnidad[index];
        tdQty.textContent = carritoCantidades[index];
        tdAmount.textContent = carritoAmount[index];
        if (carritoCantidades[index] == 0) {
          tdAmount.textContent = 0;
        }
        totalAmout = totalAmout - carritoPrecioUnidad[index];
        total.textContent = "Total: $" + totalAmout;

        numItemsNumber = numItemsNumber - 1;
        numItems.textContent = numItemsNumber + " items";
      }
    };

    tdModify.appendChild(mas);
    tdModify.appendChild(menos);

    row.appendChild(tdItem);
    row.appendChild(tdQty);
    row.appendChild(tdDescription);
    row.appendChild(tdUnitPrice);
    row.appendChild(tdAmount);
    row.appendChild(tdModify);

    tbody.appendChild(row);
  }
}

function preCancelOrder() {
  let close = document.getElementById("close");

  modal.style.display = "block";

  close.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

function displayCarrito() {
  selected.textContent = "Order Detail";
  productsDiv.innerHTML = "";

  const table = document.createElement("table");
  table.className = "table table-striped table-hover";

  const thead = document.createElement("thead");
  const item = document.createElement("th");
  item.textContent = "Item";

  const qty = document.createElement("th");
  qty.textContent = "Qty.";

  const description = document.createElement("th");
  description.textContent = "Description";

  const unitPrice = document.createElement("th");
  unitPrice.textContent = "Unit Price";

  const amout = document.createElement("th");
  amout.textContent = "Amount";

  const modify = document.createElement("th");
  modify.textContent = "Modify";

  thead.appendChild(item);
  thead.appendChild(qty);
  thead.appendChild(description);
  thead.appendChild(unitPrice);
  thead.appendChild(amout);
  thead.appendChild(modify);

  const tbody = document.createElement("tbody");
  const div = document.createElement("div");
  div.className = "container-fluid";

  const r = document.createElement("div");
  r.className = "row";

  const col9 = document.createElement("div");
  col9.className = "col-9";

  const col3 = document.createElement("div");
  col3.className = "col-3";

  let cancel = document.createElement("a");
  cancel.className = "btn btn-danger";
  cancel.textContent = "Cancel";

  cancel.onclick = function () {
    preCancelOrder();
  };

  let confirm = document.createElement("a");
  confirm.className = "btn btn-light";
  confirm.textContent = "Confirm order";

  confirm.onclick = function () {
    let list = [];
    for (let index = 0; index < carritoProductos.length; index++) {
      let obj = new Object();
      obj.item = index;
      obj.quantity = carritoCantidades[index];
      obj.description = carritoProductos[index];
      obj.unitPrice = carritoPrecioUnidad[index];
      let jsonString = JSON.stringify(obj);

      list.push(jsonString);
    }
    console.log(list);
  };

  col3.appendChild(cancel);
  col3.appendChild(confirm);

  const total = document.createElement("h6");

  fillCarrito(tbody, total);

  table.appendChild(thead);
  table.appendChild(tbody);
  productsDiv.appendChild(table);

  total.textContent = "Total: $" + totalAmout;

  col9.appendChild(total);
  r.appendChild(col9);
  r.appendChild(col3);
  div.appendChild(r);
  productsDiv.appendChild(div);
}
