import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

// Load header and footer partials globally
loadHeaderFooter();

// Select the element where product listings are rendered
const element = document.querySelector(".product-list");

// Only initialize ProductList if the .product-list container exists on the page
if (element) {
  const dataSource = new ExternalServices("tents");
  const productList = new ProductList("tents", dataSource, element);
  productList.init();
}
