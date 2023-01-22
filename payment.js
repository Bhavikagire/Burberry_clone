let cartdata = JSON.parse(localStorage.getItem('cart')) || []
let empty = []
let globaltotal;
let gotp;
priceDom(cartdata)

document.getElementById('cod').addEventListener('click',()=>{
    
    let randomnum = random()
    document.getElementById('otp').style.display="block";
    document.getElementById('otp').innerText=`Your OTP is For COD Payment ${randomnum}`
    gotp=randomnum
})

document.getElementById('online').addEventListener('click',()=>{
    
    let randomnum = random()
    document.getElementById('otp').style.display="block";
    document.getElementById('otp').innerText=`Your OTP is For Online Payment ${randomnum}`
    gotp=randomnum
    
})

document.getElementById('checkot').addEventListener('click',()=>{
    let promt = prompt("Enter your OTP here")
        
    if(+promt === gotp){
        let comf =  confirm(`Confirm your Order! of $${globaltotal}`)
        if(comf){
            
            post(cartdata)
            localStorage.setItem('orderdItems',JSON.stringify(cartdata))
            localStorage.setItem('cart',JSON.stringify(empty))
            location.reload()
            alert('Your order will be dilvered With in 4 Days')
        }
    }
})

function random(){
    let opt=Math.floor(1000 + Math.random() * 9000);
    return opt
}
function priceDom(data){
    let total=0;
    let count=0
    for(let i=0;i<data.length;i++){
        count++
        total+= data[i].qty*data[i].price 
    }
    globaltotal = total
    document.getElementById('total').innerText=total
    document.getElementById('tota').innerText=total
}

function post(data){
    let obj={
        user: JSON.parse(localStorage.getItem('user')),
        order : data
    }
    fetch('https://bb-nwfw.onrender.com/order_details',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
    .then((res)=> res.json())
    .then((data)=>{
        console.log(data);
    })
    .catch((err)=>{
        console.log(err);
        alert("some errer occured please try after some time!! ")
    })
}
