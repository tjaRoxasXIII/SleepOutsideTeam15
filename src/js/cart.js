import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item, index) =>
    cartItemTemplate(item, index),
  );
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  document.querySelectorAll(".cart-removal").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = parseInt(e.currentTarget.dataset.index);
      removeCartItem(index);
    });
  });
}

function cartItemTemplate(item, index) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    
  </li>
  <span span class="cart-removal" data - index="${index}" > X</span >`;

  return newItem;
}

function removeCartItem(index) {
  const cart = getLocalStorage("so-cart") || [];

  cart.splice(index, 1);

  setLocalStorage("so-cart", cart);

  renderCartContents();
}

renderCartContents();
