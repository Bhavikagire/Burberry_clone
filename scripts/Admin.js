import { deactiveLinks, hidePages } from "./func.js";



// Toggle Pages

let voices = window.speechSynthesis.getVoices();


const link_items = document.querySelectorAll(".link_item");
let pages = document.querySelectorAll(".page");

link_items.forEach((el, i) => {
  el.addEventListener("click", function () {
    hidePages(pages);
    pages[i].classList.add("active");
    deactiveLinks(link_items);
    el.classList.add("link_active");
  });
});

const getProductData = async (cat) => {
  localStorage.setItem("active_cat", cat);
  try {
    let res = await fetch(` https://bb-nwfw.onrender.com/${cat}`);
    let data = await res.json();

   // console.log(data);
    appendProducts(data,cat);
  } catch (err){console.log(err)}
};
window.onload=()=>{
  getProductData("Men");
}


const appendProducts = (data, cat) => {
  document.getElementById("product_tbody").innerHTML = "";
  data.forEach(({ id, images,Pimages,title,dec, price, Ptype, quantity }) => {
    let tr = document.createElement("tr");

    let img_td = document.createElement("td");
    let img = document.createElement("img");
    img.className = "pic"
    // img.src =images[0],images[1] ;
    img.src =images[1];
    img_td.append(img);

    let pimg_td = document.createElement("td");
    let pimg = document.createElement("img");
    pimg.className = "pic2"
    // pimg.src = Pimages[0],Pimages[1],Pimages[2],Pimages[3] ;
    pimg.src = Pimages[1];
    pimg_td.append(pimg);

    let name = document.createElement("td");
    name.innerText = title;

    let d_span = document.createElement("span");
    d_span.innerText = dec;
    let description = document.createElement("td");
    description.append(d_span);
    

    let pri = document.createElement("td");
    let pri_span = document.createElement("span");
    pri_span.innerText =price;
    let pri_icon = document.createElement("i");
    pri_icon.classList.add("fa-solid", "fa-pencil", "edit_icon");
    pri.append(pri_span, pri_icon);
    pri_icon.onclick = (e) => {
      let new_price = +prompt("Enter New Amount");
      if (new_price == 0) return;
      updatePrice(id, cat, new_price);
      e.target.previousSibling.innerText = new_price;
      pri_span.innerText = new_price;
    };

    let Type = document.createElement("td");
   Type.innerText = Ptype;



    let status1 = document.createElement("td");
    let btn = document.createElement("button");
     if (status1) {
      btn.classList.add("status_active");
      btn.innerText = "Active";
      
    } else {
      btn.classList.add("status_inactive");
      btn.innerText = "Inactive";
      
      
    }
    status1.append(btn);
    btn.onclick = (e) => {
      updateActive(id, cat, btn.innerText);
      if (e.target.innerText == "Active") {
        e.target.classList.add("status_inactive");
        e.target.innerText = "Inactive";
        e.target.style.background="red";
      } else {
        e.target.classList.add("status_active");
        e.target.innerText = "Active";
        e.target.style.background="green";
      }
    };


    let inventory = document.createElement("td");
    let inv_span = document.createElement("span");
    inv_span.innerText = quantity;
    let inv_icon = document.createElement("i");
    inv_icon.classList.add("fa-solid", "fa-pencil", "edit_icon");
    inventory.append(inv_span, inv_icon);

    // adding EventListner
    inv_icon.onclick = (e) => {
      let new_quantity = +prompt("Enter New Quantity");
      if (new_quantity == 0) return;
      updateInvetory(id, cat, new_quantity);
      e.target.previousSibling.innerText = new_quantity;
    };



    // <i class="fa-solid fa-trash-can"></i>
    let del = document.createElement("td");
    let del_icon = document.createElement("i");
    del_icon.classList.add("fa-solid", "fa-trash-can", "del_icon");
    del.append(del_icon);
    del_icon.onclick = (e) => {
      if (confirm("Press Ok! to Remove")) {
        console.log("OK!");
        removeProduct(id, cat);
        e.target.parentNode.parentNode.remove();
      }
    };

    tr.append(img_td, name, pri,Type,status1, inventory, del);
    document.getElementById("product_tbody").append(tr);
  });
};

//update Inventory
const updateInvetory = async (id, cat, new_quantity) => {
  let data = {
    quantity: new_quantity,
  };

  let res = await fetch(`https://bb-nwfw.onrender.com/${cat}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  alert("Inventory Updated");
};

//update Price
const updatePrice = async (id, cat, new_price) => {
  let dataToSent = {
  
    price:new_price,
  };
  let res = await fetch(`https://bb-nwfw.onrender.com/${cat}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(dataToSent),
    headers: {
      "Content-type": "application/json",
    },
  });
  alert("Price Updated");
};

//update active: true||false
const updateActive = async (id, cat, btn_text) =>{
  if (btn_text == "Active") {
    let dataToSend = {
     
      status: false,
    
    }
  }
      else if (btn_text == "Inactive"){
        let dataToSend = {
        status: true,
      }
    }
    let res = await fetch(`https://bb-nwfw.onrender.com/${cat}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-type": "application/json",
      },
    });
    let data = await res.json();
  };

//remove Products
const removeProduct = async (id, cat) => {
  let res = await fetch(`https://bb-nwfw.onrender.com/${cat}/${id}`, {
    method: "DELETE",
  });
  alert("Product Deleted!");
};

//Handling category Buttons

let cat_btns = document.querySelectorAll(".cat_btn");
//Men Products

let Men = document.getElementById("Men_btn");
Men.onclick = () => {
  deactiveLinks(cat_btns);
  Men.classList.add("link_active");
  getProductData("Men");
};
//Women products
let Women = document.getElementById("Women_btn");
Women.onclick = () => {
  deactiveLinks(cat_btns);
  Women.classList.add("link_active");
  getProductData("Women");
};
//Gifts products
let Gifts = document.getElementById("Gifts_btn");
Gifts.onclick = () => {
  deactiveLinks(cat_btns);
  Gifts.classList.add("link_active");
  getProductData("Gifts");
};
//NewIn products
let NewIn = document.getElementById("NewIn_btn");
NewIn.onclick = () => {
  deactiveLinks(cat_btns);
  NewIn.classList.add("link_active");
  getProductData("NewIn");
};


// Handling Filter
let filter_Prods = document.getElementById("filter_Prod");
filter_Prods.onchange = () => {
  let inputVal = filter_Prods.value;
  if (inputVal == "active") {
    handle_filter("status", true);
  } else if (inputVal == "inactive") {
    handle_filter("status", false);
  } else if (inputVal == "shoes") {
    handle_filter("Ptype", "shoes");
  } else if (inputVal == "shirts") {
    handle_filter("Ptype","shirts");
  } else if (inputVal == "bags") {
    handle_filter("Ptype", "bags");
  }else if (inputVal == "Sweater") {
    handle_filter("Ptype", "Sweater");
  } else if (inputVal == "Wallet") {
    handle_filter("Ptype","Wallet");
  } else if (inputVal == "coat") {
    handle_filter("Ptype", "coat");
  } else if (inputVal == "Scarf") {
    handle_filter("Ptype", "Scarf");
  }else if (inputVal == "cap") {
    handle_filter("Ptype", "cap");
  }
  else if (inputVal == "Jackets") {
    handle_filter("Ptype", "Jackets");
  }
  else if (inputVal == "Shorts") {
    handle_filter("Ptype", "Shorts");
  }
  else if (inputVal == "Pants") {
    handle_filter("Ptype", "Pants");
  }
};

// Handling Filter main function
const handle_filter = async (query, value) => {
  let active_cat = localStorage.getItem("active_cat");
  let res = await fetch(
    `https://bb-nwfw.onrender.com/${active_cat}?${query}=${value}`
  );
  let data = await res.json();
  appendProducts(data, active_cat);
};

// Handling sorting

let sort_Prods = document.getElementById("sort_Prod");
sort_Prods.onchange = () => {
  let inputVal = sort_Prods.value;
  if (inputVal == "asc") {
    sort_handle("price", "asc");
  } else if (inputVal == "desc") {
    sort_handle("price", "desc");
  }
};
const sort_handle = async (query, value) => {
  let active_cat = localStorage.getItem("active_cat");
  let res = await fetch(
    `https://bb-nwfw.onrender.com/${active_cat}?_sort=${query}&_order=${value}`
  );
  let data = await res.json();
  appendProducts(data, active_cat);
};

// login and logout function
let admin_login = JSON.parse(sessionStorage.getItem("Admin-login"));
let Admin_icon_div = document.getElementById("admin_icon_div");
let Admin_details = document.getElementById("admin_details");
Admin_icon_div.onclick = () => {
  if (Admin_details.style.display == "none") {
    Admin_details.style.display = "block";
  } else {
    Admin_details.style.display = "none";
  }
};
document.addEventListener("click", function (event) {
  if (event.target == Admin_icon_div) {
    return;
  }
  Admin_details.style.display = "none";
});

let admin_email_display = document.querySelector("#admin_email_div>p");
 admin_email_display.innerText=admin_login[0] || document.querySelector("#admin_email_div>span").innerHTML ;

let admin_logout = document.querySelector("#admin_logout_div>p");
admin_logout.onclick = () => {
  sessionStorage.removeItem("Admin-login");
  textTospeech("Good bye gauri")
  location.href = "./AdminLogin.html";
};
//console.log(Gauri);
function textTospeech (text) {
    let utternance = new SpeechSynthesisUtterance(text);
    utternance.voice = window.speechSynthesis.getVoices()[3] ;
    speechSynthesis.speak(utternance);
}