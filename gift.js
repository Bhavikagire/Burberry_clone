let container = document.getElementById("product");
fetch ("https://bb-nwfw.onrender.com/Gifts")

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

    let cate = document.createElement("h4");
    cate.innerText = element.Ptype;

    box.append(image, name, desc, price, cate);
    container.append(box);
  });
}