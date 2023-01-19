let container = document.getElementById("men");
fetch ("https://bb-nwfw.onrender.com/Men")

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

    let quantity = document.createElement("h5");
    type.innerText = element.quantity;

    box.append(image, name, desc, price, cate,type,quantity);
    container.append(box);
  });
}