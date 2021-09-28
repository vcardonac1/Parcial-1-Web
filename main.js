const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

function populateEventstable(data) {
  let index = 1;
  data.forEach((element) => {
    const tableBody = document
      .getElementById("idTable")
      .getElementsByTagName("tbody")[0];
    const newRow = tableBody.insertRow();

    if (element.squirrel) newRow.className = "table-danger";

    newRow.innerHTML =
      "<td>" +
      index +
      "</td><td>" +
      element.events +
      "</td><td>" +
      element.squirrel +
      "</td>";

    index = index + 1;
  });
}

function generateCorrelationTable(data) {
  let listEvents = [];
  data.forEach((element) => {
    let eventos = element.events;
    listEvents = listEvents.concat(eventos);
  });
  listEvents = [...new Set(listEvents)];
  //let index = 1;
  listEvents.forEach((event) => {
    let TP = 0;
    let TN = 0;
    let FP = 0;
    let FN = 0;
    data.forEach((element) => {
      let eventos = element.events;
      if (eventos.includes(event)) {
        if (element.squirrel) {
          //TP
          TP = TP+1
        } else {
          //FN
          FN = FN+1
        }
      } else {
        if (element.squirrel) {
          //FP
          FP = FP+1
        } else {
          //TN
          TN = TN+1
        }
      }
    });

    let correlation = MCC(TP, TN, FP, FN);

    const tableBody = document
      .getElementById("idTable2")
      .getElementsByTagName("tbody")[0];
    const newRow = tableBody.insertRow();

    newRow.innerHTML =
      "<td>" +
      event +
      "</td><td>" +
      correlation +
      "</td>";

    //index = index + 1;
  });
}

function MCC(TP, TN, FP, FN) {
  let numerador = TP * TN - FP * FN;
  let denominador = Math.sqrt((TP + FP) * (TP + FN) * (TN + FP) * (TN + FN));

  return numerador / denominador;
}

//https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_sort_table_number
function sortTable() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("idTable2");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      if (Number(x.innerHTML) < Number(y.innerHTML)) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

const burgers = document.getElementById("b")
const tacos = document.getElementById("t")
const salads = document.getElementById("s")
const desserts = document.getElementById("d")
const driksSlides = document.getElementById("d&s")
const selected = document.getElementById("selected")
const productsDiv = document.getElementById("products")
const numItems = document.getElementById("numItems")
const addCar = document.getElementsByClassName("btn btn-secondary")

let numItemsNumber = 0

var botones = document.querySelectorAll("button");
for (var x = 0; x < botones.length; x++) {
  botones[x].onclick = function() {
    console.log('click')
    numItemsNumber = numItemsNumber + 1
    numItems.textContent = numItemsNumber + " items!"
  }
}

function changeItems() {
  numItemsNumber = numItemsNumber + 1
  numItems.textContent = numItemsNumber + " items"
}

addCar.onclick = function(){
  numItemsNumber = numItemsNumber + 1
  numItems.textContent = numItemsNumber + " items"
}

burgers.onclick = function(){
  selected.textContent = "Burgers"

  fetch(url)
  .then((res) => res.json())
  .then((data) => {
    cargarProductos(data, 0)
  });
}

tacos.onclick = function(){
  selected.textContent = "Tacos"

  fetch(url)
  .then((res) => res.json())
  .then((data) => {
    cargarProductos(data, 1)
  });
}

salads.onclick = function(){
  selected.textContent = "Salads"

  fetch(url)
  .then((res) => res.json())
  .then((data) => {
    cargarProductos(data, 2)
  });
}

desserts.onclick = function(){
  selected.textContent = "Desserts"

  fetch(url)
  .then((res) => res.json())
  .then((data) => {
    cargarProductos(data, 3)
  });
}

driksSlides.onclick = function(){
  selected.textContent = "Drinks & Slides"

  fetch(url)
  .then((res) => res.json())
  .then((data) => {
    cargarProductos(data, 4)
  });
}

function cargarProductos(data, pos){
  let x = data[pos]
  let products = x.products
  console.log(products)
  let htmlString = ""
  products.forEach(element => {
    htmlString = htmlString + 
    "<div class='col'>"+
    "\nnombre: " + element.name +
    "\ndescripcion: " + element.description +
    "\nprecio: " + element.price +
    "\nimagen: " + element.image +
    "</div>" +
    "<button onclick='changeItems()' type='button' class='btn btn-secondary'>Add to car</button>"
  });
  productsDiv.innerHTML = htmlString
}

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
  });