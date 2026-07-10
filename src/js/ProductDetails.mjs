export default class ProductDetails {
    constructor(productId) {
        this.productId = productId;
        this.productData = new ProductData("products");
    }
}