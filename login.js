// register here
document.getElementById('submit').addEventListener('click',()=>{
  console.log("reg");
    let location= document.getElementById('location').value
    let title= document.getElementById('mrs').value
    let fname= document.getElementById('fname').value
    let lname= document.getElementById('lname').value
    let phone= document.getElementById('phone').value
    let email= document.getElementById('userid').value
    let pass= document.getElementById('pass').value


    //test
    let obj={
        id: 11,
        location: location,
        title: title,
        fname: fname,
        lname: lname,
        mobile: phone,
        email: email,
        pass: pass
      }

    fetch('https://bb-nwfw.onrender.com/Users',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
    .then((res)=> res.json())
    .then((data)=>{
        console.log(data);
        alert("regester dane!")
    })
    .catch((err)=>{
        console.log(err);
        alert("some errer")
    })
})

document.getElementById('sginin').addEventListener('click',()=>{
  console.log("sign in");
  fetch('https://bb-nwfw.onrender.com/Users')
  .then((res)=>{
    return res.json()
  })
  .then((data)=>{
    console.log(data);
    let verify= verifyUser(data);
    if(verify){
      alert("ok done")
      // window.location.href="./index.html"
    }else{
      alert('wrong cred!................')
    }
  })
})

function verifyUser(data){
  let userid= document.getElementById('email').value
  let passw= document.getElementById('password').value

  let flag= false
  data.forEach((element) => {
    if(element.email === userid){
      if(element.pass === passw){
        flag=true;
      }
    }
  })

  return flag
}

