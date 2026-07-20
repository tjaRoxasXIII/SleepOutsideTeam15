import cartItemsCounter from "./itemsCount.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  // added by dreiser
  // function to count the
  const itemsList = [];

  cartItems.forEach((item) => {
    const isInItemList = itemsList.find((i) => i.Id === item.Id);

    if (isInItemList) {
      isInItemList.count += 1;
    } else {
      itemsList.push({ ...item, count: 1 });
    }
  });
  //TA addition: preserve index for cart removal
  const htmlItems = itemsList.map((item, index) =>
    cartItemTemplate(item, index),
  );
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  // end of the function below is comented the part of the code taht rendered
  //  multiple same elements

  // const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  // document.querySelector(".product-list").innerHTML = htmlItems.join("");
  // Taylor addition: attach removal listeners
  document.querySelectorAll(".cart-removal").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = parseInt(e.currentTarget.dataset.index);
      removeCartItem(index);
    });
  });
  cartItemsCounter();
  calculateCartTotal();
}

// i added itemQuantity to quantify the amount of
// itens instead of rendering the item multiple times
// merged with taylor's index feature to get item index from cart for specific location removal
function cartItemTemplate(item, index) {
  const newItem = `
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
      <p class="cart-card__quantity">QTY: ${item.count}</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
      <div>
        <span span class="cart-removal" data-index="${index}" >X</span >
      </div>
    </li>
  `;

  return newItem;
}

function removeCartItem(index) {
  const cart = getLocalStorage("so-cart") || [];

  cart.splice(index, 1);

  setLocalStorage("so-cart", cart);

  renderCartContents();
}

function calculateCartTotal() {
  const cartItems = getLocalStorage("so-cart") || [];
  const myCart = document.querySelector(".cart-total");

  if (cartItems.length > 0) {
    let total = 0;

    cartItems.forEach((item) => {
      total += item.FinalPrice;
    });

    myCart.innerHTML = `Total: $${total.toFixed(2)}`;
  } else {
    myCart.innerHTML = `Your cart is empty.`;
  }
}

renderCartContents();
