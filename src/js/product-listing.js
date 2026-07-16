import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import getParam from "./utils.mjs";

// Load header and footer partials dynamically
loadHeaderFooter();

// Pull category parameter from the current page URL
const category = getParam("category");

// Format and set dynamic category heading dynamically on screen
const titleElement = document.querySelector(".category-title");
if (titleElement && category) {
  const formattedCategory = category
    .replace("-", " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  titleElement.textContent = `Top Products: ${formattedCategory}`;
}

const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");
const myList = new ProductList(category, dataSource, listElement);

myList.init();