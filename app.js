//require the promt module and create interface
const prompt = require('readline').createInterface(process.stdin, process.stdout);
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
function header (title, msg){
     console.clear();
     console.log("========================================================")
     console.log(title)
     console.log("========================================================")
     console.log();
     console.log(msg)
}

//home page
function home (msg){
     header('WELCOME TO SHOPU - home', msg)
     console.log("1.", "View products");
     console.log("2.", "View cart");
     console.log("3.", "View checkout");
     console.log();
     prompt.question("Please Select an option: ", (opt) => {
          if(opt == 1){
               displayProducts('');
          }else if(opt == 2){
               displayCart('');
          }else if(opt == 3){
               checkout('');
          }else {
               home('Invalid input ! 🙃')
          }      
     });
}

//product page --------Mich
function displayProducts (msg){
     header('OUR PRODUCTS - list of available products', msg)
     console.table(products)
     console.log();
     console.log("1.", "Add to cart");
     console.log("2.", "View cart");
     console.log("3.", "Checkout");
     console.log("4.", "Go to Home");
     console.log();
     prompt.question("Please Select an option ", (opt) => {
          if(opt == 1){
               displayProducts('');
          }else if(opt == 2){
               displayCart('');
          }else if(opt == 3){
               checkout('');
          }else {
               displayProducts("Invalid input ! 🙃")
          }
     });
}

//cart page --------Mich
function displayCart(msg){
     header('YOUR CART', msg)
     console.table(cart);
}

//checkout page --------Jerry
function checkout(msg){
     header('CHECKOUT', msg)
}

//add product to cart --------Victor
function addToCart(msg){
     header('ADD TO CART', msg)
}

//remove product from Cart --------Victor
function removeFromCart(msg){
     header('REMOVE FROM CART -  remove an item', msg)
}

// cart product added successfuly --------Hope
function addedCartItem(){
     header('PRODUCT ADDED SUCCESSFULLY !', msg)
}

// cart product removed successfuly --------Hope
function removedCartItem(msg){
     header('PRODUCT REMOVED SUCCESSFULLY !', msg)
}


//payment card details --------Jerry
function cardDetails(msg){
     header('ENTER YOUR ATM CARD DETAILS', msg)
}

//payment Confirnmation --------Hope
function payConfirm(msg){
     header('YOUR PAYMENT WAS SUCCESSFUL !', msg)
}

home('');
