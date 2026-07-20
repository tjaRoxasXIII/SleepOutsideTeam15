import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import updateCartCount from "./itemsCount.mjs"; // 1. Import your counter logic

function productDetailsTemplate(product) {
  const colorName = product.Colors?.[0]?.ColorName || "Standard";

  const suggestedPrice = Number(product.SuggestedRetailPrice) || 0;
  const listPrice = Number(product.ListPrice) || 0;

  const discountAmount = suggestedPrice > listPrice 
    ? (suggestedPrice - listPrice).toFixed(2) 
    : 0;

  /**
   * BADGE STRUCTURE: The `.corner-badge-wrap` acts as the reference point.
   * It takes up ZERO layout space (height:0, margin-top) so the following 
   * `<img>` tag flows exactly where it normally would.
   */
  const discountSpan = discountAmount > 0 
    ? `<div class="corner-badge-wrap">
         <span class="discount">$${discountAmount}<br>off!</span>
       </div>` 
    : '';

  return `<section class="product-detail">
    <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    
    <div class="product-media-group">
      ${discountSpan}
      <img
        class="divider"
        src="${product.Images.PrimaryLarge}"
        alt="${product.NameWithoutBrand}"
      />
    </div>
    
    <p class="product-card__price">$${listPrice.toFixed(2)}</p>
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
