import cartItemsCounter from "./itemsCount.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  // Each item already has a Quantity property from addToCart
  // No aggregation needed – render each item directly
  const htmlItems = cartItems.map((item, index) =>
    cartItemTemplate(item, index)
  );
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // Attach delete listeners using the product ID
  document.querySelectorAll(".cart-removal").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = e.currentTarget.dataset.id;
      removeCartItem(productId);
    });
  });

  cartItemsCounter();
  calculateCartTotal();
}

function cartItemTemplate(item, index) {
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img
          src="${item.Images.PrimarySmall}"
          alt="${item.Name}"
        />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">QTY: ${item.Quantity || 1}</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
      <div>
        <span class="cart-removal" data-id="${item.Id}">X</span>
      </div>
    </li>
  `;
}

function removeCartItem(productId) {
  const cart = getLocalStorage("so-cart") || [];

  // Use loose equality (==) to handle string vs number mismatch
  const index = cart.findIndex((item) => item.Id == productId);

  if (index !== -1) {
    const item = cart[index];

    // If quantity > 1, decrement by 1
    if (item.Quantity && item.Quantity > 1) {
      item.Quantity -= 1;
      setLocalStorage("so-cart", cart);
    } else {
      // If quantity is 1 or undefined, remove the entire item
      cart.splice(index, 1);
      setLocalStorage("so-cart", cart);
    }

    renderCartContents();
  } else {
    console.warn(`Product ${productId} not found in cart.`);
  }
}

function calculateCartTotal() {
  const cartItems = getLocalStorage("so-cart") || [];
  const myCart = document.querySelector(".cart-total");

  if (cartItems.length > 0) {
    let total = 0;
    cartItems.forEach((item) => {
      const qty = item.Quantity || 1;
      total += item.FinalPrice * qty; // Multiply by quantity!
    });
    setLocalStorage("total", total)

    // what i did here was delete the p from the htm and generated it dinamically
    //  in that way we can cleaning it out and add the check ouu button in the same way
    // istead we select the container and append the total and the check out button
    const container = document.querySelector(".cart-hide")
    const p = document.createElement("p")
    const btn = document.createElement("button")
    const a = document.createElement("a")

    // then we add clases and the redirection link to the button 
    btn.id = "checkout-link"
    a.href = "/checkout/index.html"
    a.textContent = "Check Out"
    p.classList.add("cart-total")
    p.innerHTML = `Total: $${total.toFixed(2)}`;
    // within the text, we clean the container to avoid redundance of contente
    container.innerHTML = ""
    
    // append all the elements to be displayed into the cart 
    btn.appendChild(a)
    container.appendChild(p)
    container.appendChild(btn)

  } else {
    myCart.innerHTML = `Your cart is empty.`;
  }
}

renderCartContents();