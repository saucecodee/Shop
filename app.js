//require the promt module and create interface
const rl = require('readline').createInterface(process.stdin, process.stdout);
//require file system module
const fs = require('fs')

//product array
const products = [
     {"id" : 1, "name" : "milo", "price" : 350},
     {"id" : 2, "name" : "bread", "price" : 150 },
     {"id" : 3, "name" : "milk", "price" : 50},
     {"id" : 4, "name" : "okpa", "price" : 150},
     {"id" : 5, "name" : "beans", "price" : 200}
]

//cart array
const cart = [];

//page header
function header (title){
     console.clear();
     console.log("========================================================")
     console.log(title)
     console.log("========================================================")
     console.log();
}

//home page
function home (msg){
     header('WELCOME TO SHOPU - home')
     console.log(msg)
     console.log("1.", "View products");
     console.log("2.", "View cart");
     console.log("3.", "View checkout");
     console.log("");
     prompt.question("Please Select an option: ", (opt) => {
               if(opt == 1){
                    displayProducts();
               }else if(opt == 2){
                    displayCart();
               }else if(opt == 3){
                    checkout();
               }else {
                    home('Invalid input ! 🙃')
               }      
               process.exit();
          }
     );
}

//product page --------Mich
function displayProducts (){
     header('OUR PRODUCTS - list of available products')
     console.table(products)
     console.log();
     console.log("1.", "Add to cart");
     console.log("2.", "View cart");
     console.log("3.", "Checkout");
     console.log("4.", "Go to Home");
     console.log();
     prompt.question("Please Select an option ", (opt) => {
          if(opt == 1){
               displayProducts();
          }else if(opt == 2){
               displayCart();
          }else if(opt == 3){
               checkout();
          }else {
               console.log("Invalid input")
          }  
          process.exit();
     });
}

//cart page --------Mich
function displayCart(){
     header('YOUR CART')
}

//checkout page --------Jerry
function checkout(){
     header('CHECKOUT')
     //nothingo
}

//add product to cart --------Victor
function addToCart(){
     header('ADD TO CART')
}

//remove product from Cart --------Victor
function removeFromCart(){
     header('REMOVE FROM CART -  remove an item')
}

// cart product added successfuly --------Hope
function addedCartItem(){
     header('PRODUCT ADDED SUCCESSFULLY !')
}

// cart product removed successfuly --------Hope
function removedCartItem(){
     header('PRODUCT REMOVED SUCCESSFULLY !')
}


//payment card details --------Jerry
function cardDetails(){
     header('ENTER YOUR ATM CARD DETAILS')
}

//payment Confirnmation --------Hope
function payConfirm(){
     header('YOUR PAYMENT WAS SUCCESSFUL !')
}

home('');
