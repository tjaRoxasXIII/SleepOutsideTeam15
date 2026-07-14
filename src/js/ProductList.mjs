import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const brandName = product.Brand?.Name || "";
  const nameWithoutBrand = product.NameWithoutBrand || product.Name || "";
  const price = product.ListPrice || "0.00";
  const imageSrc = product.Image || "";

  return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img src="${imageSrc}" alt="Image of ${nameWithoutBrand}">
      <h2 class="card__brand">${brandName}</h2>
      <h3 class="card__name">${nameWithoutBrand}</h3>
      <p class="product-card__price">$${price}</p>
    </a>
    <button class="quick-view-btn" data-id="${product.Id}">Quick View</button>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
    this.setupQuickView(list);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  setupQuickView(list) {
    console.log("Quick View setup initialized. Listening for clicks on:", this.listElement);

    this.listElement.addEventListener("click", (e) => {
      console.log("Something was clicked inside the list:", e.target);

      if (e.target.classList.contains("quick-view-btn")) {
        const productId = e.target.dataset.id;
        console.log("Quick View button clicked! Product ID:", productId);

        const product = list.find((item) => item.Id === productId);
        console.log("Found product details:", product);

        if (product) {
          this.showModal(product);
        }
      }
    });
  }

  showModal(product) {
    const modal = document.querySelector("#quick-view-modal");
    const content = document.querySelector("#modal-details-content");

    console.log("Modal element found:", modal);
    console.log("Content container found:", content);

    if (!modal) {
      console.error("CRITICAL ERROR: Could not find #quick-view-modal in the HTML!");
      return;
    }

    content.innerHTML = `
      <h2>${product.Name}</h2>
      <img src="${product.Image}" alt="${product.Name}" style="max-width: 100%; height: auto; margin: 15px 0;">
      <p class="product-card__price"><strong>Price:</strong> $${product.ListPrice}</p>
      <p>${product.DescriptionHtmlSimple || "No description available."}</p>
    `;

    modal.classList.remove("hidden");
    console.log("Removed 'hidden' class from modal. Classes remaining:", modal.className);

    const closeBtn = modal.querySelector(".close-modal");
    closeBtn.onclick = () => {
      modal.classList.add("hidden");
    };
  }
}