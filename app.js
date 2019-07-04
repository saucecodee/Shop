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
          if(opt == 1){
               addToCart('');
          }else if(opt == 2){
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
function checkout(msg) {
     header('CHECKOUT', msg)
}

//add product to cart --------Victor
function addToCart(msg) {
     header('ADD TO CART', msg);
     console.table(products);
     console.log();

     // This is a class that an object that holds the id and quantity
     var  name, qty, u_price, a_price ; // the variable holding the name and the quantity
     var cartItem = { // An Object where the name and quantity are held as properties
          "name" : name, 
          "qty" : qty, //The quantity the client wants 
          "unit_price" : u_price, // The unit price of the product
          "accum_price" : a_price // The accumulated price of each product
     }

     function getId(){ // Function that gets the it from the user. 
          prompt.question("Enter product Id: ", (id)=>{
               let i = parseInt(id);
               cartItem.name = products[i -1].name ;
               cartItem.unit_price = products[i -1].price;
               getQty(i); // This function is called  here so that the prompt will not exit 
          })
     }
     
     function getQty(i){ // This function gets gets the quantity of the product from the user. 
          prompt.question("Enter product Quantity: ", (qty)=>{ 
               let j = parseInt(qty)
               cartItem.qty = j;
               cartItem.accum_price =  j * products[i - 1].price;
               addedCartItem('');
          })
     }

     getId(); // The Id is called here 

     cart.push(cartItem); // This adds the cartItem object to the cart Array.
}

//remove product from Cart --------Victor
function removeFromCart(msg){
     header('REMOVE FROM CART -  remove an item', msg);
     prompt.question("Enter product Id: ", (id)=>{ // Ask the user the Id of the Product he/she wants to remove 
          let i = parseInt(id); // to make it an integer 
          cart.splice( (i - 1), 1); // This removes the element from the cart array.
          removedCartItem(msg);
     })
}

// cart product added successfuly --------Hope
function addedCartItem(msg) {
     header('PRODUCT ADDED SUCCESSFULLY !', msg);
}

// cart product removed successfuly --------Hope
function removedCartItem(msg) {
     header('PRODUCT REMOVED SUCCESSFULLY !', msg)
}

//payment card details --------Jerry
function cardDetails(msg) {
     header('ENTER YOUR ATM CARD DETAILS', msg)
}

//payment Confirnmation --------Hope
function payConfirm(msg) {
     header('YOUR PAYMENT WAS SUCCESSFUL !', msg)
}

home('');
