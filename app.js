//require the promt module and create interface
const prompt = require('readline').createInterface(process.stdin, process.stdout);
//require file system module
const fs = require('fs')

//product array
const products = [
     { "id": 1, "name": "milo", "price": 350 },
     { "id": 2, "name": "bread", "price": 150 },
     { "id": 3, "name": "milk", "price": 50 },
     { "id": 4, "name": "okpa", "price": 150 },
     { "id": 5, "name": "beans", "price": 200 }
]

//cart array
const cart = [];

//page header
function header(title, msg) {
     console.clear();
     console.log("========================================================")
     console.log(title)
     console.log("========================================================")
     console.log();
     console.log(msg)
}

//home page
function home(msg) {
     header('WELCOME TO SHOPU - home', msg);
     console.log("1.", "View products");
     console.log("2.", "View cart");
     console.log("3.", "View checkout");
     console.log();
     prompt.question("Please Select an option: ", (opt) => {
          if (opt == 1) {
               displayProducts('');
          } else if (opt == 2) {
               displayCart('');
          } else if (opt == 3) {
               checkout('');
          } else {
               home('Invalid input ! 🙃')
          }
     });
}

//product page --------Mich
function displayProducts(msg) {
     header('OUR PRODUCTS - list of available products', msg)
     console.table(products)
     console.log();
     console.log("1.", "Add to cart");
     console.log("2.", "View cart");
     console.log("3.", "Checkout");
     console.log("4.", "Go to Home");
     console.log();
     prompt.question("Please Select an option ", (opt) => {
          if (opt == 1) {
               displayProducts('');
          } else if (opt == 2) {
               displayCart('');
          } else if (opt == 3) {
               checkout('');
          } else {
               displayProducts("Invalid input ! 🙃")
          }
     });
}

//cart page --------Mich
function displayCart(msg) {
     header('YOUR CART', msg)
     console.table(cart); //displays cart array
     console.log();
     console.log("1.", "Go to products"); //display 'product' option
     console.log("2.", "Add to cart"); //display 'cart' option
     console.log("3.", "View checkout"); //display 'checkout' option
     console.log("4.", "Go to Home"); //display 'home' option
     console.log();
     prompt.question("Please Select an option ", (opt) => {
          if (opt == 1) {
               displayProducts('');
          } else if (opt == 2) {
               addToCart('');
          } else if (opt == 3) {
               checkout('');
          } else if (opt == 4) {
               home('');
          } else {
               displayProducts("Invalid input ! 🙃")
          }
     }); 
}

//checkout page --------Jerry
function checkout(msg){
     header('CHECKOUT', msg)
     if(cart.length === 0) {
          console.log("You have no item in Cart");
          console.log("1","Add Item(s) to Cart")
          console.log("2","Go Back to home")
          prompt.question("Please select an option to proceed: ", (options) => {
               if(options == 1){
                    displayProducts('');
               } else if(options == 2){
                    home('');
               } else {
                    checkout("Invalid input ! 🙃");
               }
          })
     } else {
          console.table(cart);
          console.log("1","Proceed to make payment")
          console.log("2","Go Back to Cart")
          console.log("3","Cancel payment and Return Home")
          prompt.question("Please Select an option: ", (options) => {
               if(options == 1){
                    cardDetails('');
               } else if(options == 2){
                    //Go back to cart to add to cart
                    displayProducts('');
               } else if(options == 3){
                    // cancel payment and return to home
                    home('');
               } else {
                    checkout('Invalid input ! 🙃');
               }
          })
     }
}

//add product to cart --------Victor
function addToCart(msg) {
     header('ADD TO CART', msg)
}

//remove product from Cart --------Victor
function removeFromCart(msg) {
     header('REMOVE FROM CART -  remove an item', msg)
}

// cart product added successfuly --------Hope
function addedCartItem() {
     header('PRODUCT ADDED SUCCESSFULLY !', msg)
}

// cart product removed successfuly --------Hope
function removedCartItem(msg) {
     header('PRODUCT REMOVED SUCCESSFULLY !', msg)
}


//payment card details --------Jerry
function cardDetails(msg) {
     header('ENTER YOUR ATM CARD DETAILS', msg)
     console.log();
     prompt.question("card details should be a combination of whole numbers b/w 5 - 10 characters : ", (options) => {
          if(options == parseInt(options, 10)){
               payConfirm('');
          }  else {
               cardDetails('Invalid input ! 🙃, Please Ensure Your card Details meets the rule');
               console.log();
          }
     })
}

//payment Confirnmation --------Hope
function payConfirm(msg) {
     header('YOUR PAYMENT WAS SUCCESSFUL !', msg)
     console.log("Would You like to make another purchase");
     console.log("1","Yes")
     console.log("2","No")
     prompt.question("Please Select an option: ", (options) => {
          if(options == 2){
               header('Thank You', msg)
          } else {
               home('')
          } 
     })
}

home('');
