

let cartdata = JSON.parse(localStorage.getItem('cart')) || []

let product_dom = document.getElementById('product-dom')

console.log(cartdata);
renderDom(cartdata)
priceDom(cartdata)

function renderDom(data){
    product_dom.innerHTML=null
    data.forEach((ele,ind)=>{
        let div = document.createElement('div')
        div.setAttribute('class','pdiv');

        let idiv = document.createElement('div')
        idiv.setAttribute('class','idiv');

        let img= document.createElement('img')
        img.setAttribute("src", ele.images[0]);
        idiv.append(img)

        let ddiv = document.createElement('div')
        ddiv.setAttribute('class','ddiv');

        let title = document.createElement('h4')
        title.innerText=ele.title
        let price = document.createElement('p')
        price.innerText=`$ ${ele.price}`
        let del = document.createElement('button')
        del.innerText='Remove'
        del.addEventListener('click',()=>{
            let con = confirm('Do you want to Remove Item')
            if(con){
                cartdata.splice(ind,1)
                renderDom(cartdata)
                priceDom(cartdata)
                localStorage.setItem('cart',JSON.stringify(cartdata))
                alert("product deleted");
            }
        })
        ddiv.append(title,price,del)


        div.append(idiv,ddiv)
        product_dom.append(div)
    })
}


document.getElementById('checkout').addEventListener('click',()=>{
    console.log('yes');
    localStorage.setItem('loder',JSON.stringify('payment.html'))
    location.href="./loder.html"
})


function priceDom(data){
    let total=0;
    let count=0
    for(let i=0;i<data.length;i++){
        count++
        total+= data[i].qty*data[i].price 
    }
    document.getElementById('total').innerText=total
    document.getElementById('tota').innerText=total
    document.getElementById('span').innerText=count
}

