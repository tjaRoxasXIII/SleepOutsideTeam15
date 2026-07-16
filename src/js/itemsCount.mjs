import { getLocalStorage } from "./utils.mjs";

export default function updateCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];
  const totalCount = cartItems.reduce((sum, item) => sum + (item.Quantity || 1), 0);
  
  const cartElement = document.querySelector(".cart");
  if (cartElement) {
    // Find or create a small badge element for our number
    let countBadge = cartElement.querySelector(".cart-count");
    if (!countBadge) {
      countBadge = document.createElement("span");
      countBadge.className = "cart-count";
      cartElement.appendChild(countBadge);
    }
    countBadge.textContent = totalCount;
    
    // Hide the badge if the cart is empty
    if (totalCount === 0) {
      countBadge.style.display = "none";
    } else {
      countBadge.style.display = "inline-block";
    }
  }
}

// Automatically run on load
updateCartCount();