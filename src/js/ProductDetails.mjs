import cartItemsCounter from "./itemsCount.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
export default class ProductDetails {
    constructor(productId, datasource) {
        this.productId = productId;
        this.product = {};
        this.datasource = datasource;
    }    

    async init() {
        this.product = await this.datasource.findProductById(this.productId);
        this.renderProductDetails(this.product);

        document
            .getElementById("addToCart")
            .addEventListener("click", this.addProductToCart.bind(this));
    }

    addProductToCart() {
        const currentCart = getLocalStorage("so-cart") || [];
        currentCart.push(this.product);
        setLocalStorage("so-cart", currentCart);
        cartItemsCounter()
    }

    renderProductDetails(data) {
        const container = document.querySelector(".product-detail")
        const h3 = document.createElement("h3")
        const h2 = document.createElement("h2")
        const img = document.createElement("img")
        const price = document.createElement("p")
        const color = document.createElement("p")
        const description = document.createElement("p")
        const div = document.createElement("div")
        const btn = document.createElement("button")
    
        h2.classList.add("divider")
        img.classList.add("divider")
        price.classList.add("product-card__price")
        color.classList.add("product__color")
        description.classList.add("product__description")
        div.classList.add("product-detail__add")
        btn.id = "addToCart"
    
        h3.textContent = data.Brand.Name
        h2.textContent = data.NameWithoutBrand
        img.src = `${data.Image}`
        img.alt = data.NameWithoutBrand
        price.textContent = data.FinalPrice
        color.textContent = data.Colors.ColorName
        description.inert = data.DescriptionHtmlSimple
        btn.textContent = "Add to Cart"
        container.innerHTML = ""
    
        container.appendChild(h3)
        container.appendChild(h2)
        container.appendChild(img)
        container.appendChild(price)
        container.appendChild(color)
        container.appendChild(description)
        container.appendChild(btn)
    }

}