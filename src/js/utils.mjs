import cartItemsCounter from "./itemsCount.mjs";

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  const element = qs(selector);
  if (element) {
    element.addEventListener("touchend", (event) => {
      event.preventDefault();
      callback();
    });
    element.addEventListener("click", callback);
  }
}

// Dynamic function to retrieve any query parameter by key name from the URL
export default function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// Renders a list of items into the DOM using a template function
export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// Helper to load an external HTML template file
async function loadTemplate(path) {
  const res = await fetch(path);
  if (!res.ok) {
    throw new Error(`Failed to load template at: ${path}`);
  }
  const template = await res.text();
  return template;
}

// Renders a template into a parent DOM element
export function renderWithTemplate(template, parentElement, data, callback) {
  if (parentElement) {
    parentElement.innerHTML = ""; 
    parentElement.insertAdjacentHTML("afterbegin", template);
    if (callback) {
      callback(data);
    }
  }
}

// Calculates total cart count and updates the badge in the header
export function renderCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartCountElement = document.querySelector(".cart-count");

  if (cartCountElement) {
    // If cart items are objects with a quantity property, sum them up; otherwise, use list length
    const totalCount = cartItems.reduce((total, item) => total + (item.Quantity || 1), 0);
    cartCountElement.textContent = totalCount;

    // Show count if cart has items, hide if empty
    if (totalCount > 0) {
      cartCountElement.classList.remove("hide");
    } else {
      cartCountElement.classList.add("hide");
    }
  }
}

// Dynamically loads the header and footer HTML partials globally
export async function loadHeaderFooter() {
  try {
    const headerTemplate = await loadTemplate("/partials/header.html");
    const footerTemplate = await loadTemplate("/partials/footer.html");
    
    const headerElement = document.getElementById("main-header");
    const footerElement = document.getElementById("main-footer");
    
    // Renders header and automatically triggers cart counter calculation
    renderWithTemplate(headerTemplate, headerElement, null, () => {
      if (typeof cartItemsCounter === "function") {
        cartItemsCounter();
      }
      renderCartCount();
    });
    
    renderWithTemplate(footerTemplate, footerElement);
  } catch (error) {
    console.error("Error loading header/footer partials:", error);
  }
}

// Display a custom UI alert message banner at the top of <main>
export function alertMessage(message, scroll = true) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName === "SPAN" || e.target.innerText === "X") {
      this.remove();
    }
  });

  const main = document.querySelector("main");
  if (main) {
    main.prepend(alert);
  }

  if (scroll) {
    window.scrollTo(0, 0);
  }
}

// Remove all active alerts before creating new ones
export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => alert.remove());
}