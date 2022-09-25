
var productName= document.getElementById('productName');
var productPrice= document.getElementById('productPrice');
var productCategory= document.getElementById('productCategory');
var productDesc= document.getElementById('productDesc');


if(localStorage.getItem(`22-9products`)!=null){
    productContainer= JSON.parse(localStorage.getItem(`22-9products`));
    displayData(productContainer);
}
else{
    productContainer= [];
}

/* ---------------------------------------- addProduct ------------------------------------ */

function addProduct(){
    if(validateProductName()){
        var product={
            name: productName.value,
            price: productPrice.value,
            category: productCategory.value,
            desc: productDesc.value,
        }
        productContainer.push(product);
        clearForm();
        displayData(productContainer);
        localStorage.setItem(`22-9products`, JSON.stringify(productContainer))

        productName.classList.remove('is-valid');
    }
}
/* ---------------------------------------- displayData ------------------------------------ */

function displayData(list){
    var temp=``;
    for(var i=0; i<list.length; i++){
        temp+=`<tr><td>${i+1}</td>
        <td>${list[i].name}</td>
        <td>${list[i].price}</td>
        <td>${list[i].category}</td>
        <td>${list[i].desc}</td>
        <td><button onclick="update(${i})" class="btn btn-outline-warning btn-sm">Update</button></td>
        <td><button onclick="deleteElement(${i})" class="btn btn-outline-danger btn-sm">Delete</button></td>
        </tr>`; 

    }
    document.getElementById(`myTable`).innerHTML=temp;
}

/* ------------------------------------------- clear ----------------------------------------- */

function clearForm(){
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDesc.value = "";
    productName.classList.remove('is-valid');
    productName.classList.remove('is-invalid');
}
/* ---------------------------------------- deleteElement ------------------------------------ */

function deleteElement(index){
    productContainer.splice(index, 1);
    localStorage.setItem('22-9products', JSON.stringify(productContainer));
    displayData(productContainer);
}

/* --------------------------------------------- search ----------------------------------------- */

function search(term){
    var searchContainer  = [];
    for(var i=0 ; i<productContainer.length; i++){
        if(productContainer[i].name.toLowerCase().includes(term.toLowerCase())){
            searchContainer.push(productContainer[i]);
        }
    }
    displayData(searchContainer);
}
/* --------------------------------------- validateProductName ----------------------------------- */

function validateProductName(){
    var regex = /^[A-Z][a-z]{3,10}$/;
    if(regex.test(productName.value)){
        if(productName.classList.contains('is-invalid')){
        productName.classList.replace('is-invalid', 'is-valid');
        }
        return true;
    }
    else{
        productName.classList.add('is-invalid');
        return false;
    }
}