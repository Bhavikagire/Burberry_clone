// Get the modal
var modal = document.querySelector(".myModal");

// Get the button that opens the modal
var btn = document.querySelector(".add_product");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
document.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// add new products
let addNewProducts = document.getElementById("add_new_product");
//addNewProducts.onclick = async () => {
//   let category = document.getElementById("new_prod_category").value;
//   let ProdId = document.getElementById("new_prod_id").value;
//   let ProdImage = document.getElementById("new_prod_img").value;
//   let ProdPimage = document.getElementById("new_prod_Pimage").value;
//   let ProdName = document.getElementById("new_prod_name").value;
//   let ProdDescription = document.getElementById("new_prod_description").value;
//   let ProdPrice = document.getElementById("new_prod_price").value;
//   let Type = document.getElementById("new_prod_type").value;
//   let ProdQuantity = document.getElementById("new_prod_quantity").value;
 

//   let dataToSend = {
//     id:ProdId,
//     images: ProdImage,
//     Pimages:ProdPimage ,
//     title: ProdName,
//     dec: ProdDescription,
//     price:ProdPrice,
//     Ptype: Type,
//     quantity: ProdQuantity,

//   };

//   let res = await fetch(`https://bb-nwfw.onrender.com/${category}`, {
//     method: "POST",
//     body: JSON.stringify(dataToSend),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   alert("Product Added");
//   category.value = "";
//   ProdId.value = "";
//   ProdImage.value = "";
//   ProdPimage.value = "";
//   ProdName.value = "";
//   ProdDescription.value = "";
//   ProdPrice.value = "";
//   Type.value = "";
//   ProdQuantity.value = "";
  
// };
  addNewProducts.addEventListener('click',async()=>{
    let category = document.getElementById("new_prod_category").value;
    let ProdId = document.getElementById("new_prod_id").value;
    let ProdImage = document.getElementById("new_prod_img").value;
    let ProdPimage = document.getElementById("new_prod_Pimage").value;
    let ProdName = document.getElementById("new_prod_name").value;
    let ProdDescription = document.getElementById("new_prod_description").value;
    let ProdPrice = document.getElementById("new_prod_price").value;
    let Type = document.getElementById("new_prod_type").value;
    let ProdQuantity = document.getElementById("new_prod_quantity").value;
   
  
    let dataToSend = {
      id:ProdId,
      images: ProdImage,
      Pimages:ProdPimage ,
      title: ProdName,
      dec: ProdDescription,
      price:ProdPrice,
      Ptype: Type,
      quantity: ProdQuantity,
  
    };
  
    let res = await fetch(`https://bb-nwfw.onrender.com/${category}`, {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-Type": "application/json",
      },
    });
    alert("Product Added");
    category.value = "";
    ProdId.value = "";
    ProdImage.value = "";
    ProdPimage.value = "";
    ProdName.value = "";
    ProdDescription.value = "";
    ProdPrice.value = "";
    Type.value = "";
    ProdQuantity.value = "";
    

  });
  