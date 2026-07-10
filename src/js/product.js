import cartItemsCounter from "./itemsCount.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import getParam from "./utils.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");
cartItemsCounter()

const product = new ProductDetails(productId, dataSource);
product.init();

// add to cart button event handler

// add listener to Add to Cart button

