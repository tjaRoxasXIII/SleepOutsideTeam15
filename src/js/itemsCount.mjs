import { getLocalStorage } from "./utils.mjs";

export default function updateCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];
  const totalCount = cartItems.reduce((sum, item) => sum + (item.Quantity || 1), 0);
  const cartElement = document.querySelector(".cart");
  
  if (cartElement) {
    let countBadge = document.querySelector(".cart-count");
    
    if (totalCount > 0) {
      if (!countBadge) {
        countBadge = document.createElement("span");
        countBadge.className = "cart-count";
        
        // This inserts it inside <div class="cart">, right before anything else
        cartElement.insertAdjacentElement("afterbegin", countBadge);
      }
      countBadge.textContent = totalCount;
    } 
    else if (countBadge) {
      countBadge.remove();
    }
  }
}

// Automatically run on load
updateCartCount();
