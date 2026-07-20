import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import updateCartCount from "./itemsCount.mjs"; // 1. Import your counter logic

function productDetailsTemplate(product) {
  const colorName = product.Colors?.[0]?.ColorName || "Standard";

  return `<section class="product-detail">
    <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Images.PrimaryLarge}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.ListPrice}</p>
    <p class="product__color">${colorName}</p>
    <p class="product__description">
      ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>
  </section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails("main");
    
    const addToCartBtn = document.getElementById("addToCart");
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", this.addToCart.bind(this));
    }
  }

  addToCart() {
    let cartItems = getLocalStorage("so-cart") || [];
    
    // Check if item already exists to handle Quantity safely
    const existingItem = cartItems.find(item => item.Id === this.product.Id);
    if (existingItem) {
      existingItem.Quantity = (existingItem.Quantity || 1) + 1;
    } else {
      this.product.Quantity = 1;
      cartItems.push(this.product);
    }
    
    setLocalStorage("so-cart", cartItems);
    
    // 2. Call your modular helper to handle insertion/calculation automatically
    updateCartCount();
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.innerHTML = productDetailsTemplate(this.product);
    }
  }
}
