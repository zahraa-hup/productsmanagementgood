
let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');;
let discound=document.getElementById('discound');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let create=document.getElementById('create');
let tbody=document.getElementById('tbody');
let deletebtn=document.getElementById('deletebtn');
let tmp;
let mode='create';
let modes='title';
////////////////////////////////////////////////////////

deletebtn.style.margin='10px 0';
deletebtn.classList.add('deletebtn');

// price function
function pricex(){
if(price.value != ''){
total.innerText=+price.value + +taxes.value  + +ads.value - +discound.value;
total.style.background='green';
}else{
    total.style.background='red';
    total.innerText='';
}
}
// clear function
function clear(){
    
        title.value="";
        price.value="";
        taxes.value="";
        ads.value="";
        discound.value="";
        total.innerText="";
        count.value="";
        category.value="";
    }

if(localStorage.productx != null)
{
    product=JSON.parse ( localStorage.productx  );
    deletebtn.classList.remove('deletebtn');
}
else{
    product=[];
    deletebtn.classList.add('deletebtn');
}
// read data
function readdata()
{
    pricex();
    let row ='';
    
    for( let i=0;i<product.length;i++)
    {
   
    row +=
    `
    <tr >
 <td>${i}</td>
 <td>${product[i].title}</td>
 <td>${product[i].price}</td>
 <td>${product[i].taxes}</td>
 <td>${product[i].ads}</td>
 <td>${product[i].discound}</td>
 <td>${product[i].total}</td>
 <td>${product[i].category}</td>
 <td><button onclick="ubdate(${i})">UPDATE</button></td>
 <td><button onclick="rowdelete(${i})">DELETE</button></td>    
 </tr>
      `
     
    }
    tbody.innerHTML=row; 
}
    

readdata();
function rowdelete(c)
{
product.splice(c,1);
localStorage.productx=JSON.stringify(product); 

console.log(c);
readdata();
}
// delete fnction
deletebtn.onclick=function()
{
    product=[];
    localStorage.clear();
    deletebtn.classList.add('deletebtn');
    tbody.innerHTML='';

}

//create function
create.onclick=function()
{
    let object=
    {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discound:discound.value,
        total:total.innerText,
        category:category.value,  
    }
    
if(title.value !="" && count.value<100){
    if(mode==='create')
    {
    for(let y=0;y<count.value;y++)
    {
    product.push(object);
    localStorage.productx=JSON.stringify( product );
  
    readdata();
    }
    clear();
    deletebtn.classList.remove('deletebtn');
    }
    else{
        product[tmp]=object;
        localStorage.productx=JSON.stringify(product);
        clear();
        readdata();
        mode='create';
        create.innerHTML='create';
        count.style.display='block';
      
         }
        }
}

// ubdate
function ubdate(i)
{
title.value=product[i].title;
price.value=product[i].price;
taxes.value=product[i].taxes;
ads.value=product[i].ads;
discound.value=product[i].discound;
discound.innerText=product[i].discound;
category.value=product[i].category;

pricex();
count.style.display='none';
create.innerText='update';
tmp=i;
mode='update';
scroll(
    {
        top:0,
        behavior:"smooth"
    }
)

}
// search function
function searchmode(mode)
{
let search=document.getElementById('search');
if(mode=='searchTitle')
{
search.placeholder='search by title';
modes='title';
}
else{
    search.placeholder='search by category'; 
    modes='category';
}
search.focus();
search.style.transform='scale(1.1)';
console.log(modes)
}
//search
function search(value)
{
    let row='';
    if(modes=='title'){
    for(let i=0;i<product.length;i++)
    {

        if(product[i].title.includes(value.toLowerCase()))
        {
            row +=
            `
            <tr >
         <td>${i}</td>
         <td>${product[i].title}</td>
         <td>${product[i].price}</td>
         <td>${product[i].taxes}</td>
         <td>${product[i].ads}</td>
         <td>${product[i].discound}</td>
         <td>${product[i].total}</td>
         <td>${product[i].category}</td>
         <td><button onclick="ubdate(${i})">UPDATE</button></td>
         <td><button onclick="rowdelete(${i})">DELETE</button></td>    
         </tr>
              `       
        }
     
    } 
    tbody.innerHTML=row; 
    }
    else{
for(let i=0;i<product.length;i++)
    {

        if(product[i].category.includes(value.toLowerCase()))
        {
            row +=
            `
            <tr >
         <td>${i}</td>
         <td>${product[i].title}</td>
         <td>${product[i].price}</td>
         <td>${product[i].taxes}</td>
         <td>${product[i].ads}</td>
         <td>${product[i].discound}</td>
         <td>${product[i].total}</td>
         <td>${product[i].category}</td>
         <td><button onclick="ubdate(${i})">UPDATE</button></td>
         <td><button onclick="rowdelete(${i})">DELETE</button></td>    
         </tr>
              `       
        }
    
    
    }
    tbody.innerHTML=row; 
} 
}
