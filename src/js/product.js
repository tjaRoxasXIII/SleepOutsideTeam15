import ExternalServices from "./ExternalServices.mjs";
import updateCartCount from "./itemsCount.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import getParam from "./utils.mjs";

async function initPage() {
  // 1. Wait for HTML components to load completely
  await loadHeaderFooter();
  
  // 2. Run initial count display
  updateCartCount();

  const productId = getParam("product");
  const dataSource = new ExternalServices();

  // 3. Pass the function reference as a callback to your class
  const product = new ProductDetails(productId, dataSource, updateCartCount);
  product.init();
}

initPage();