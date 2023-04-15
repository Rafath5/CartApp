import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push,onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings={
    databaseURL:"https://playground-e572d-default-rtdb.firebaseio.com/"
}

const app=initializeApp(appSettings)
const database=getDatabase(app)
const shoppingListInDB=ref(database,"shoppinglisy")


// so the first step is when a user clicks on an add to cart button the text in the input field should be consoled 
const addToCartButton =document.getElementById('add-button') ;
const shoppingListel=document.getElementById('shopping-list');
let inputItem=document.getElementById('input-field');

addToCartButton.addEventListener("click",()=>{
    // let inputItem=document.getElementById('input-field');
    let inputValue=inputItem.value;
    push(shoppingListInDB,inputValue)
    clearInputFieldEl();
    // appendShoppingLstEl(inputValue);
   
});
onValue(shoppingListInDB,function(snapshot){
    if (snapshot.exists()){
    let itemsArray=Object.entries(snapshot.val())

    clearShopppingListel();
    for(let i=0;i<itemsArray.length;i++){
        let currentItem=itemsArray[i]
        let currentItemId=currentItem[0]
        let currentItemValue=currentItem[1]
        appendShoppingLstEl(currentItem)
    }
}
else{
    shoppingListel.innerHTML="<p> Cart is Empty</p>"
}
});
function clearInputFieldEl(){
    inputItem.value=""
}
function appendShoppingLstEl(inputValue){
    // shoppingListel.innerHTML += `<li>${inputValue}</li>`
    let itemId=inputValue[0]
    let itemValue=inputValue[1]
    let newEl=document.createElement("li")
    newEl.textContent=itemValue
    shoppingListel.append(newEl)
    newEl.addEventListener("dblclick",function(){
        let exactLocationOfItemInDB=ref(database, `shoppinglisy/${itemId}`)
        remove(exactLocationOfItemInDB)
    })
}
function clearShopppingListel(){
    shoppingListel.innerHTML="";
}
