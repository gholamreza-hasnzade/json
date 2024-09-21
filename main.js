const products = [
  {
    name: "Ring Video",
    price: 200,
    id: 1,
    quantity: 1,
    picture: "images/1-ringvideo.png",
    description: "Smart doorbell camera",
  },
  {
    name: "Fire Max",
    price: 300,
    id: 2,
    quantity: 1,
    picture: "images/2-firemax.png",
    description: "High-performance tablet",
  },
  {
    name: "Airtag",
    price: 400,
    id: 3,
    quantity: 1,
    picture: "images/3-airtag.png",
    description: "Finding your device easily",
  },
  {
    name: "Adaptor",
    price: 500,
    id: 4,
    quantity: 1,
    picture: "images/4-chargingadaptor.png",
    description: "Fast charge adaptor",
  },
  {
    name: "Canon Camera",
    price: 600,
    id: 5,
    quantity: 1,
    picture: "images/5-canoncamara.png",
    description: "High quality camera",
  },
  {
    name: "hp Laptop",
    price: 700,
    id: 6,
    quantity: 1,
    picture: "images/6-hplaptop.png",
    description: "High quality laptop",
  },
];


// Retrieve cart from localStorage or initialize empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* Product Rendering */
const productHTML = products
  .map(
    (product) => `
    <div class="product-card">
        <h2 class="product-name">${product.name}</h2>
        <img class="product-picture" src="${product.picture}" style="height: 100px; width: 150px;">   
        <strong>${product.price}</strong>
        <button class="product-btn" id=${product.id}>Add To cart</button>
        <p class="product-desc" style="border: 1px solid var(--gray); border-radius: 0.6rem; height:35px; width:100px; display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;" onclick="showModal(${product.id})">Description</p>
        <div id="myModal_${product.id}" class="modal">
            <div class="modal-content" style="border: 4px solid var(--gray); border-radius: 1rem;">
                <span class="close" style="display: flex; justify-content: flex-end;">&times;</span>
                 <h1>${product.name}</h1>
                <div style="display: flex; align-items: flex-start; margin-top: 100px;">
                    <img class="modal-picture" src="${product.picture}" style="height: 200px; width: 250px; margin-top: 2rem; border: 1px solid var(--gray);">
                    <div style="flex-grow: 1;">
                        <ul style="margin-left: 0; padding-left: 0;">
                            <li class="product-li" style="list-style-type:none;">${product.description}</li>
                            <li class="product-li" style="list-style-type:none;">price :${product.price}</li>
                       </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
`
  )
  .join("");

const result = document.querySelector(".result");
result.innerHTML = productHTML;

/* Show Modal */
function showModal(productId) {
  const modal = document.getElementById(`myModal_${productId}`);
  modal.style.display = "flex";

  const product = products.find((p) => p.id === productId);

 /*  document.getElementById(`description_${productId}`).textContent =
    product.description; */
}

/* Close Modal on Outside Click */
window.onclick = function (event) {
  var modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
};

/* Close Modal on 'X' Click */
document.addEventListener("DOMContentLoaded", function () {
  var spans = document.getElementsByClassName("close");
  Array.from(spans).forEach((span) => {
    span.onclick = function () {
      var modal = this.closest(".modal");
      modal.style.display = "none";
    };
  });
});

/* Add to Cart Button */
let num = document.querySelectorAll(".product-btn").length;
for (let i = 0; i < num; i++) {
  document
    .querySelectorAll(".product-btn")
    [i].addEventListener("click", function (e) {
      addToCart(products, parseInt(e.target.id));
    });
}

/* Add to Cart Function */
function addToCart(products, id) {
  const product = products.find((product) => product.id === id);
  const cartProduct = cart.find((item) => item.id === id);

  if (cartProduct) {
    incrItem(id);
  } else {
    // Clone product to avoid modifying the original
    const productClone = { ...product };
    cart.push(productClone);
  }

  updateLocalStorage();
  updateCart();
  getTotal(cart);
}

/* Update Cart UI */
function updateCart() {
  const cartHTML = cart
    .map(
      (item) => `
    <div class="cart-item">
        <h3>${item.name}</h3>
        <img class="cart-picture" src="${item.picture}" style="height:50px; width:75px;">
        <div class="cart-detail">
            <div class="mid">
                <button onclick="decrItem(${item.id})">-</button>
                <p>${item.quantity}</p>
                <button onclick="incrItem(${item.id})">+</button>
            </div>
            <p>${item.price}</p>
            <button onclick="deleteItem(${item.id})" class="cart-product" id="${item.id}">Delete</button>
        </div>
    </div>
    `
    )
    .join("");

  const cartItems = document.querySelector(".cart-items");
  cartItems.innerHTML = cartHTML;
}

/* Update LocalStorage */
function updateLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* Increment Item Quantity */
function incrItem(id) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i] && cart[i].id == id) {
      cart[i].quantity += 1;
    }
  }
  updateLocalStorage();
  updateCart();
  getTotal(cart);
}

/* Decrement Item Quantity */
function decrItem(id) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i] && cart[i].id == id) {
      if (cart[i].quantity > 1) {
        cart[i].quantity -= 1;
      } else {
        deleteItem(id);
      }
    }
  }
  updateLocalStorage();
  updateCart();
  getTotal(cart);
}

/* Delete Item from Cart */
function deleteItem(id) {
  cart = cart.filter((item) => item.id !== id);
  updateLocalStorage();
  updateCart();
  getTotal(cart);
}

/* Calculate Total Items and Amount */
function getTotal(cart) {
  let { totalItem, cartTotal } = cart.reduce(
    (total, cartItem) => {
      total.cartTotal += Number(cartItem.price) * Number(cartItem.quantity);
      total.totalItem += cartItem.quantity;
      return total;
    },
    { totalItem: 0, cartTotal: 0 }
  );

  const totalItemsHTML = document.querySelector(".noOfItems");
  totalItemsHTML.innerHTML = `${totalItem} items`;

  const totalAmountHTML = document.querySelector(".total");
  totalAmountHTML.innerHTML = `${cartTotal} $`;

}

/* Ensure cart is loaded on page load */
document.addEventListener("DOMContentLoaded", () => {
  updateCart(); // Ensure the cart UI is updated
  getTotal(cart); // Ensure total is displayed correctly
});

