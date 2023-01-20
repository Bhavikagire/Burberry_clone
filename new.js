let container = document.getElementById("women");
fetch ("https://bb-nwfw.onrender.com/NewIn")

  .then((res) => {
    return res.json();
  })
  .then((actualData) => {
    console.log(actualData)
    Product(actualData);
  })
  .catch((err) => {
    console.log(err);
  });
function Product(data) {
  container.innerHTML = null;
  data.forEach((element,ind) => {
    let box = document.createElement("div");

    let image = document.createElement("img");
    image.setAttribute("src", element.images[0]);

    let name = document.createElement("h4");
    name.innerText = element.title;

    let desc = document.createElement("p");
    desc.innerText = element.dec;

    let price = document.createElement("h3");
    price.innerText = element.price;

    let cate= document.createElement("h5");
    cate.innerText=element.category

    let type = document.createElement("h4");
    type.innerText = element.Ptype;

    let add_to_cart = document.createElement("button");
    add_to_cart.innerText = "Add to Cart";

    add_to_cart.onclick = function () {
        addToCart(element);
    }

    box.append(image, name, desc, price, cate,type,add_to_cart);
    container.append(box);
  });
}

