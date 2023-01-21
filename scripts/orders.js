const getOrdersData = async () => {
    let res = await fetch(`https://bb-nwfw.onrender.com/order_details`);
    let data = await res.json();
    appendOrdersData(data,User_info);
  };
  getOrdersData();

  let User_info = JSON.parse(localStorage.getItem('User_info')) || [];
  
  const appendOrdersData = (data,User_info) => {
    let orders_div = document.getElementById("orders_tbody");
    orders_div.innerHTML = "";

    


    data.forEach(({ id, images,Pimages,title,dec, price, Ptype, qty }) => {
      let tr = document.createElement("tr");
      
      let user_name = `${User_info.fname} ${User_info.lname}`;
      let user=document.createElement("td");
      user.innerHTML=user_name;

      let img_td = document.createElement("td");
      let img = document.createElement("img");
      img.className = "pic"
      img.src =images[1];
      img_td.append(img);
  
      let pimg_td = document.createElement("td");
      let pimg = document.createElement("img");
      pimg.className = "pic2"
      pimg.src = Pimages[1];
      pimg_td.append(pimg);
  
      let name = document.createElement("td");
      name.innerText = title;
  
      let d_span = document.createElement("span");
      d_span.innerText = dec;
      let description = document.createElement("td");
      description.append(d_span);
      
  
      let pri = document.createElement("td");
      pri.innerText =price*Number(qty);
     
  
      let Type = document.createElement("td");
     Type.innerText = Ptype;
  
      let inventory = document.createElement("td");
      inventory.innerText = qty;
  
    
  
  
      // <i class="fa-solid fa-trash-can"></i>
      let del = document.createElement("td");
      let del_icon = document.createElement("i");
      del_icon.classList.add("fa-solid", "fa-trash-can", "del_icon");
      del.append(del_icon);
      del_icon.onclick = (e) => {
        if (confirm("Press Ok! to Remove")) {
          console.log("OK!");
          removeProduct(id);
          e.target.parentNode.parentNode.remove();
        }
      };
  
      tr.append(user,img_td, name, pri,Type,inventory, del);
        orders_div.append(tr);
      }
    );
  };

  //remove Products
const removeProduct = async (id) => {
  let res = await fetch(`https://bb-nwfw.onrender.com/order_details/${id}`, {
    method: "DELETE",
  });
  alert("Product Deleted!");
};