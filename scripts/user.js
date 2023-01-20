// let url = https://bb-nwfw.onrender.com/Users;

const getCustomerData = async () => {
    let res = await fetch(`https://bb-nwfw.onrender.com/Users`);
    let data = await res.json();
    // console.log(data);
    appendCustomerData(data);
  };
  getCustomerData();
  
  const appendCustomerData = (data) => {
    let customer_div = document.getElementById("customer_tbody");
    customer_div.innerHTML = "";
    data.forEach(({ id,location, title,fname, lname, mobile, email, pass }) => {
      let tr = document.createElement("tr");
      let cus_id = document.createElement("td");
      cus_id.innerText = id;
      let cus_location = document.createElement("td");
      cus_location.innerText = location;
      let cus_title = document.createElement("td");
      cus_title.innerText = title;
      let cus_name = document.createElement("td");
      cus_name.innerText =`${fname} ${lname}`;
      let cus_mobile = document.createElement("td");
      cus_mobile.innerText = mobile;
      let cus_email = document.createElement("td");
      cus_email.innerText = email;
      let cus_pass = document.createElement("td");
      cus_pass.innerText = pass;
      let cus_rem = document.createElement("td");
      let del_icon = document.createElement("i");
      del_icon.classList.add("fa-solid", "fa-trash-can", "del_icon");
      cus_rem.append(del_icon);
      del_icon.onclick = (e) => {
        delete_user_data(id);
        e.target.parentNode.parentNode.remove();
      };
      tr.append(
        cus_id,
    
        cus_location ,
        cus_title, 
        cus_name,
        cus_mobile,
        cus_email,
        cus_pass,
        cus_rem
      );
      customer_div.append(tr);
    });
  };



  // search handle
  let searchBtn = document.getElementById("search_user_btn");
  searchBtn.onclick = () => {
    let input_user = document.getElementById("search_user").value;
    // search_user_data(input_user);
   search_user_data(input_user);
  };
  
  const search_user_data = async (l) => {
    
    try{
    console.log(l);
    let res = await fetch(`https://bb-nwfw.onrender.com/Users?fname=${l}`,{
    
    method: 'GET',
        body: JSON.stringify(),
        headers:{
            'Content-Type':'application/json',
        }
    });
    
    
  
  let data = await res.json();
 
  localStorage.setItem('arr',JSON.stringify(data));
  let arr =JSON.parse(localStorage.getItem("arr")) || [];
appendCustomerData(arr);
  }catch(err){
    console.log('err:', err);
}
};


//delete User Details
    
  const delete_user_data = async (id) => {
    let res = await fetch(`https://bb-nwfw.onrender.com/Users/${id}`, {
      method: "DELETE",
    });
  };
