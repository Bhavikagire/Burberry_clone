let cart_data=JSON.parse(localStorage.getItem("cart")) || []
let container = document.getElementById("product");
fetch("https://bb-nwfw.onrender.com/Gifts")
  .then((res) => {
    return res.json();
  })
  .then((actualData) => {
    console.log(actualData);
    Product(actualData);
  })
  .catch((err) => {
    console.log(err);
  });
function Product(data) {
  container.innerHTML = null;
  data.forEach((element, ind) => {
    let box = document.createElement("div");

    let image = document.createElement("img");
    image.setAttribute("src", element.images[0]);

    let name = document.createElement("h4");
    name.innerText = element.title;

    let desc = document.createElement("p");
    desc.innerText = element.dec;

    let price = document.createElement("h3");
    price.innerText = `₹ ${element.price}`;

    let cate = document.createElement("h4");
    cate.innerText = element.Ptype;

    let add_to_cart = document.createElement("button");
    add_to_cart.innerText = "Add to Cart";

    add_to_cart.onclick = function () {
      addToCart(element);
    };

    box.append(image, name, desc, price, cate, add_to_cart);
    container.append(box);
  });
}


if (localStorage.getItem("cart") === null) {
  localStorage.setItem("cart", JSON.stringify([]));
}
let cart = JSON.parse(localStorage.getItem("cart"));
let bas = document.getElementById("product-dom");
bas.innerText = cart.length + " Items";

function addToCart(p) {
cart_data.push(p)
localStorage.setItem("cart",JSON.stringify(cart_data))
}
