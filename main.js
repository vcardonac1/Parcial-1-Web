const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

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
  const navBar = document.getElementById("barraNavegacion")

  datosJson.forEach(element => {
    name = element.name
    let col = document.createElement("div")
    col.className = "col-1"
    col.innerHTML = "<p id='"+name+"'>"+name+"</p>"
    navBar.appendChild(col)
  });
  getProducts();
}

function getProducts() {
  for (let index = 0; index < datosJson.length; index++) {
    const element = datosJson[index];
    let name = element.name
    let x = document.getElementById(name);
    x.onclick = function () {
      selected.textContent = name;
      cargarProductos(datosJson, index);
    };
  }
}

const selected = document.getElementById("selected");
const productsDiv = document.getElementById("products");
const numItems = document.getElementById("numItems");

let numItemsNumber = 0;

function createCard(name, description, price, image) {
  let div = document.createElement('div')
  div.className = 'card'
  div.style = "width: 18rem;"

  let divBody = document.createElement('div')
  divBody.className = 'card-body'

  let im = document.createElement('img')
  im.src = image

  let nm = document.createElement('h5')
  nm.className = 'card-title'
  nm.textContent = name

  let dscr = document.createElement('p')
  dscr.textContent = description

  let prc = document.createElement('p')
  prc.style = 'font-weight: bold;'
  prc.textContent = '$' + price

  let a = document.createElement('a')
  a.className = 'btn btn-secondary'
  a.textContent = 'Add to car'

  a.onclick = function () {
    numItemsNumber = numItemsNumber + 1;
    numItems.textContent = numItemsNumber + " items";
    adicionarAlCarrito(name, price)
  }

  div.appendChild(im)
  divBody.appendChild(nm)
  divBody.appendChild(dscr)
  divBody.appendChild(prc)
  divBody.appendChild(a)
  div.appendChild(divBody)

  productsDiv.appendChild(div)
}

function cargarProductos(data, pos) {
  let x = data[pos];
  let products = x.products;
  productsDiv.innerHTML = ''
  products.forEach((element) => {
    createCard(element.name, element.description, element.price, element.image)
  });
}

function adicionarAlCarrito(name, price){
  console.log('Se agrego ' + name + ' por ' + price)
}