//===============================================================================
//                  Require modules                                            //
//===============================================================================

//========== require the prompt module and create interface ==========
const prompt = require('readline').createInterface(process.stdin, process.stdout);

//========== require file system module ==========
const fs = require('fs')

//========== require cli-tabel ==========
var Table = require('cli-table');

//========== require colors ==========
var colors = require('colors');

//===============================================================================
//                  Global variables                                           //
//===============================================================================

//========== product array ==========
const products = [
     { "id": 1, "name": "Milo", "price": 350 },
     { "id": 2, "name": "Bread", "price": 150 },
     { "id": 3, "name": "Milk", "price": 50 },
     { "id": 4, "name": "Okpa", "price": 150 },
     { "id": 5, "name": "Beans", "price": 200 },
     { "id": 6, "name": "Rice", "price": 350 },
     { "id": 7, "name": "Fish", "price": 530 }
]

//========== cart array ==========
var cart = [];

//========== page header ==========
function header(title, msg) {
     console.clear();

     var table = new Table({
          chars: { 'top': '═', 'top-left': '╔', 'top-right': '╗', 'bottom': '═', 'bottom-left': '╚', 'bottom-right': '╝', 'left': '║', 'right': '║' },
          head: [title],
          colWidths: [72],
          colAligns: ['middle']
     });
     console.log(table.toString());

     if (msg.length < 1) {
          console.log();
     } else {
          console.log();
          console.log(colors.red('=> '), msg)
          console.log()
     }
}

//===============================================================================
//                  Pages                                                      //
//===============================================================================

//========== home page ==========
function home(msg) {
     header('WELCOME TO SHOPU', msg);
     console.log("1.", "View products");
     console.log("2.", "View cart");
     console.log("3.", "View checkout");
     console.log();
     console.log('-------------------------------------------------------------------------'.red);
     prompt.question("Please Select an option: ", (opt) => {
          if (opt == 1) {
               displayProducts('');
          } else if (opt == 2) {
               displayCart('');
          } else if (opt == 3) {
               checkout('');
          } else {
               home("PLEASE ENTER A VALID INPUT".cyan)
          }
     });
}

//========== product page ========== (Mich)
function displayProducts(msg) {
     header('OUR PRODUCTS', msg);

     var table = new Table({
          chars: {
               'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗',
               'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝',
               'left': '|', 'left-mid': '╟', 'mid': '-', 'mid-mid': '┼',
               'right': '|', 'right-mid': '╢', 'middle': '│',
          },
          head: ["Id", "Name", "Price ($)"],
          colWidths: [10, 30, 30]
     });
     products.forEach(e => {
          table.push(
               [e.id, e.name, e.price]
          );
     });
     console.log(table.toString());

     console.log();
     console.log("1.", "Add to cart");
     console.log("2.", "View cart");
     console.log("3.", "Checkout");
     console.log("4.", "Go to Home");
     console.log();
     console.log('-------------------------------------------------------------------------'.red);
     prompt.question("Please Select an option ", (opt) => {
          if (opt == 1) {
               addToCart('');
          } else if (opt == 2) {
               displayCart('');
          } else if (opt == 3) {
               checkout('');
          } else {
               displayProducts("PLEASE ENTER A VALID INPUT".cyan)
          }
     });
}

//========== cart page ========== (Mich)
function displayCart(msg) {
     header('YOUR CART', msg)

     var table = new Table({
          chars: {
               'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗',
               'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝',
               'left': '|', 'left-mid': '╟', 'mid': '-', 'mid-mid': '┼',
               'right': '|', 'right-mid': '╢', 'middle': '│',
          },
          head: ["id", "Product", "Qty", "Unit Price ($)", "Acc Price ($)"],
          colWidths: [5, 20, 5, 19, 19]
     });
     cart.forEach((e, index) => {
          table.push(
               [index + 1, e.name, e.qty, e.unit_price, e.accum_price]
          );
     });
     console.log(table.toString());//displays cart array

     console.log();
     console.log("1.", "Add item to cart");
     console.log("2.", "Remove item from cart");
     console.log("3.", "View products");
     console.log("4.", "Checkout");
     console.log("5.", "Go to Home");
     console.log();
     console.log('-------------------------------------------------------------------------'.red);
     prompt.question("Please Select an option ", (opt) => {
          if (opt == 1) {
               addToCart('');
          } else if (opt == 2) {
               removeFromCart('');
          } else if (opt == 3) {
               displayProducts('');
          } else if (opt == 4) {
               checkout('');
          } else if (opt == 5) {
               home('');
          } else {
               displayCart("PLEASE ENTER A VALID INPUT".cyan)
          }
     });
}

//========== add product to cart ========== (Victor)
function addToCart(msg) {
     header('ADD CART ITEM', msg);

     var table = new Table({
          chars: {
               'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗',
               'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝',
               'left': '|', 'left-mid': '╟', 'mid': '-', 'mid-mid': '┼',
               'right': '|', 'right-mid': '╢', 'middle': '│',
          },
          head: ["Id", "Name", "Price ($)"],
          colWidths: [10, 30, 30]
     });
     products.forEach(e => {
          table.push(
               [e.id, e.name, e.price]
          );
     });
     console.log(table.toString());

     console.log();
     console.log('-------------------------------------------------------------------------'.red);

     // This is a class that an object that holds the id and quantity
     var name, qty, u_price, a_price; // the variable holding the name and the quantity
     var cartItem = { // An Object where the name and quantity are held as properties
          "name": name,
          "qty": qty, //The quantity the client wants 
          "unit_price": u_price, // The unit price of the product
          "accum_price": a_price // The accumulated price of each product
     }

     function getId() { // Function that gets the it from the user. 
          prompt.question("Enter product Id: ", (id) => {
               let i = parseInt(id);
               i = i - 1;
               if (i < (products.length ) && i > -1) {
                    cartItem.name = products[i].name;
                    cartItem.unit_price = products[i].price;
                    getQty(i); // This function is called  here so that the prompt will not exit
               } else {
                    addToCart("SORRY, PRODUCT ID DOSEN'T EXIST".cyan);
               }
          })
     }

     function getQty(i) { // This function gets gets the quantity of the product from the user. 
          prompt.question("Enter product Quantity: ", (qty) => {
               let q = parseInt(qty)
               cartItem.qty = q;
               cartItem.accum_price = q * products[i].price;
               cart.push(cartItem); // This adds the cartItem object to the cart Array.
               let message = "Added \"" + products[i].name + "\" to cart";
               editedCartItem(message .cyan);
          })
     }

     getId(); // The Id is called here 
}

//========== remove product from Cart ========== (Victor)
function removeFromCart(msg) {
     header('REMOVE CART ITEM', msg);

     var table = new Table({
          chars: {
               'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗',
               'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝',
               'left': '|', 'left-mid': '╟', 'mid': '-', 'mid-mid': '┼',
               'right': '|', 'right-mid': '╢', 'middle': '│',
          },
          head: ["id", "Product", "Qty", "Unit Price ($)", "Acc Price ($)"],
          colWidths: [5, 20, 5, 19, 19]
     });
     cart.forEach((e, index) => {
          table.push(
               [index + 1, e.name, e.qty, e.unit_price, e.accum_price]
          );
     });
     
     console.log(table.toString());//displays cart array
     console.log();
     console.log('-------------------------------------------------------------------------'.red);

     prompt.question("Enter product Id: ", (id) => { // Ask the user the Id of the Product he/she wants to remove 
          let i = parseInt(id); // to make it an integer
          i = i - 1;
          if (i < (cart.length ) && i > -1) {
               let message = "Removed \"" + cart[i].name + "\" from cart";
               cart.splice(i, 1); // This removes the element from the cart array.
               editedCartItem(message.cyan);
          } else {
               removeFromCart("SORRY, CART ID DOSEN'T EXIST" .cyan)
          }
     })
}

//========== checkout page ========== (Jerry)
function checkout(msg) {
     header('CHECKOUT', msg)
     if (cart.length === 0) {
          console.log("You have no item in Cart");
          console.log();
          console.log("1", "Add Item(s) to Cart")
          console.log("2", "Go Back to home")
          console.log();
          console.log('-------------------------------------------------------------------------'.red);
          prompt.question("Please select an option to proceed: ", (options) => {
               if (options == 1) {
                    addToCart('');
               } else if (options == 2) {
                    home('');
               } else {
                    checkout("PLEASE ENTER A VALID INPUT".cyan);
               }
          })
     } else {
          var table = new Table({
               chars: {
                    'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗',
                    'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝',
                    'left': '|', 'left-mid': '╟', 'mid': '-', 'mid-mid': '┼',
                    'right': '|', 'right-mid': '╢', 'middle': '│',
               },
               head: ["id", "Product", "Qty", "Unit Price ($)", "Acc Price ($)"],
               colWidths: [5, 20, 5, 19, 19]
          });
          cart.forEach((e, index) => {
               table.push(
                    [index + 1, e.name, e.qty, e.unit_price, e.accum_price]
               );
          });
          console.log(table.toString());//displays cart array

          var t_price = cart.map((ca)=> ca.accum_price).reduce((a,b) =>  a + b);
          console.log("TOTAL: ", t_price)

          console.log("1", "Proceed to make payment")
          console.log("2", "Go Back to Cart")
          console.log("3", "Cancel payment and Return Home")
          console.log();
          console.log('-------------------------------------------------------------------------'.red);
          prompt.question("Please Select an option: ", (options) => {
               if (options == 1) {
                    cardDetails('');
               } else if (options == 2) {
                    //Go back to cart to add to cart
                    displayCart('');
               } else if (options == 3) {
                    // cancel payment and return to home
                    home('');
               } else {
                    checkout("PLEASE ENTER A VALID INPUT".cyan);
               }
          })
     }
}

//========== payment card details ========== (Jerry)
function cardDetails(msg) {
     header('SECURE PAYMENT', msg)
     prompt.question("Enter your card number: ", (options) => {
          if (options == parseInt(options)) {
               payConfirm('YOUR PAYMENT WAS SUCCESSFUL !'.cyan);
               cart = [];
          } else {
               cardDetails('PLEASE ENTER A VALID INPUT'.cyan);
          }
     })
}

//===============================================================================
//                  Success messsages                                          //
//===============================================================================

//========== cart item edited successfuly ========== (Hope)
function editedCartItem(msg) {
     header('CART EDITED', msg);
     console.log();
     console.log("1.", "View cart");
     console.log("2.", "Add item to cart");
     console.log("3.", "Remove item from cart");
     console.log("4.", "View products");
     console.log("5.", "Checkout");
     console.log("6.", "Go to Home");
     console.log();
     console.log('-------------------------------------------------------------------------'.red);
     prompt.question("Please Select an option ", (opt) => {
          if (opt == 1) {
               displayCart('');
          } else if (opt == 2) {
               addToCart('');
          } else if (opt == 3) {
               removeFromCart('');
          } else if (opt == 4) {
               displayProducts('');
          } else if (opt == 5) {
               checkout('');
          } else if (opt == 6) {
               home('');
          } else {
               editedCartItem("PLEASE ENTER A VALID INPUT".cyan)
          }
     });
}

//========== payment Confirnmation ========== (Hope)
function payConfirm(msg) {
     header('ORDER CONFIRMED', msg)
     console.log("Would you like to make another purchase: ");
     console.log("1", "Yes")
     console.log("2", "No")
     prompt.question("Please Select an option: ", (options) => {
          if (options == 1) {
               displayProducts('');
          } else if (options == 2) {
               console.clear();
          } else {
               payConfirm("PLEASE ENTER A VALID INPUT" .cyan);
          }
     })
}

//===============================================================================
//                  Call home page                                             //
//===============================================================================

home('');
