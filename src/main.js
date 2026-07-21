import ProductData from "./js/ProductData.mjs";
import ProductList from "./js/ProductList.mjs";
import { loadHeaderFooter } from "./js/utils.mjs";

loadHeaderFooter();

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const productList = new ProductList("tents", dataSource, element);

productList.init();
