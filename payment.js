let cartdata = JSON.parse(localStorage.getItem('cart')) || []
let empty = []
let globaltotal;
let gotp;
priceDom(cartdata)

document.getElementById('cod').addEventListener('click',()=>{
    
    let randomnum = random()
    document.getElementById('otp').style.display="block";
    document.getElementById('otp').innerText=`Your OIP is For COD Payment ${randomnum}`
    gotp=randomnum
})

document.getElementById('online').addEventListener('click',()=>{
    
    let randomnum = random()
    document.getElementById('otp').style.display="block";
    document.getElementById('otp').innerText=`Your OIP is For Online Payment ${randomnum}`
    gotp=randomnum
    
})

document.getElementById('checkot').addEventListener('click',()=>{
    let promt = prompt("Enter your OTP here")
        
    if(+promt === gotp){
        let comf =  confirm(`Confirm your Order! of $${globaltotal}`)
        if(comf){
            alert('Your order will be dilvered With in 4 Days')
            localStorage.setItem('orderdItems',JSON.stringify(cartdata))
            localStorage.setItem('cart',JSON.stringify(empty))
            location.reload()
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