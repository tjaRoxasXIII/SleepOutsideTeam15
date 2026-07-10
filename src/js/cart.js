import cartItemsCounter from "./itemsCount.mjs";
import { getLocalStorage } from "./utils.mjs";

cartItemsCounter()

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  // added by dreiser 
  // function to count the 
  const itemsList = []

  cartItems.forEach(item => {
    const isInItemList = itemsList.find(i => i.Id === item.Id)

    if (isInItemList) {
      isInItemList.count += 1
    }
    else {
      itemsList.push({ ...item, count: 1})
    }
  });
  const htmlItems = itemsList.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  // end of the function below is comented the part of the code taht rendered
  //  multiple same elements

  // const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  // document.querySelector(".product-list").innerHTML = htmlItems.join("");

}

// i added itemQuantity to quantify the amount of 
// itens instead of rendering the item multiple times 
function cartItemTemplate(item) {
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
  <p class="cart-card__quantity">QTY: ${item.count}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();