import { getLocalStorage } from "./utils.mjs";

function packageItems(items) {
    const groupedItems = items.reduce((newArray, {Id, Name, FinalPrice }) => {
        if (newArray[Id]) {
            newArray[Id].price = FinalPrice.value
            newArray[Id].quantity += 1
        } else {
            newArray[Id] = {id: Id, name: Name, price: FinalPrice.value, quantity: 1}
        }
        return newArray
    }, {})

    return Object.values(groupedItems)
}

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key) || [];
        this.calculateItemSubTotal();
        this.calculateOrderTotal();
    }

    calculateItemSubTotal() {
        this.itemTotal = 0;
        if (this.list.length) {
            this.list.forEach(item => {
                const qty = item.Quantity || 1;
                this.itemTotal += item.FinalPrice * qty;
            });
        }
        document.querySelector("#subtotal").innerHTML = `$${this.itemTotal.toFixed(2)}`;
        document.querySelector("#items-amount").innerHTML = this.list.length;
    }

    calculateOrderTotal() {
        this.tax = this.itemTotal * 0.06;
        this.shipping = this.list.length === 0 ? 0 : 10 + (this.list.length - 1) * 2;
        this.orderTotal = this.itemTotal + this.tax + this.shipping;
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        document.querySelector("#shipping").innerHTML = `$${this.shipping.toFixed(2)}`;
        document.querySelector("#tax").innerHTML = `$${this.tax.toFixed(2)}`;
        document.querySelector(`#${this.outputSelector}`).innerHTML = `$${this.orderTotal.toFixed(2)}`;
    }

    async checkout(form) {

        const payload = {
            orderDate: new Date(),
            fname: form.fname.value,
            lname: form.lname.value,
            street: form.street.value,
            city: form.city.value,
            state: form.state.value,
            zip: form.zip.value,
            cardNumber: form.cardNumber.value,
            expiration: form.expiration.value,
            code: form.code.value,
            items: packageItems(this.list),
            orderTotal:  this.orderTotal,
            shipping: this.shipping,
            tax: this.tax,
        }

        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        }

        return options
    }
}