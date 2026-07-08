import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import renderProductPage from "./renderProductPage.mjs";

const dataSource = new ProductData("tents");
const currentCart = getLocalStorage("so-cart") || [];
const tentData = localStorage.getItem("currentProduct")    

function addProductToCart(product) {
  currentCart.push(product);
  setLocalStorage("so-cart", currentCart);
}

// add to cart button event handler
// DREISER MORALES
// What i did: i set the curent iten into localStorage
// this is the tentData from where we extract the Id
// instead using the event target, this also allows 
// the product.htm rendering the item dinamicaly
// DREISER MORALES
async function addToCartHandler() {
  const item = JSON.parse(tentData)
  const product = await dataSource.findProductById(item.Id);
  // if 
  addProductToCart(product);
}

renderProductPage(JSON.parse(tentData))

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler,);