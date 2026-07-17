import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import getParam from "./utils.mjs";

// 1. Initialize the header and footer template injection dynamically
loadHeaderFooter();

// 2. Read the active category parameter from the URL string
const category = getParam("category");

// 3. Format and cleanly replace the heading text content on screen
const titleElement = document.querySelector(".category-title");
if (titleElement && category) {
  const formattedCategory = category
    .replace("-", " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  titleElement.textContent = `Top Products: ${formattedCategory}`;
}

// 4. Initialize our API data source and lists controller
const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");
const myList = new ProductList(category, dataSource, listElement);

myList.init();
