import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  // 1. Ensure prices exist and convert them safely
  const suggestedPrice = Number(product.SuggestedRetailPrice) || 0;
  const listPrice = Number(product.ListPrice) || 0;

  // 2. Calculate discount
  const discountAmount = suggestedPrice > listPrice 
    ? (suggestedPrice - listPrice).toFixed(2) 
    : 0;

  // 3. Render badge HTML
  const discountSpan = discountAmount > 0 
    ? `<span class="discount">$${discountAmount} <br>off!</span>` 
    : "";

  return `
    <li class="product-card">
      <a href="../product_pages/index.html?product=${product.Id}">
        ${discountSpan}
        <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${listPrice.toFixed(2)}</p>
      </a>
    </li>
  `;
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
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
  }
}