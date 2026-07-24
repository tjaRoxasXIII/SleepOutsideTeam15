import validateCheckoutForm from "./CheckOutFormValidator.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const order = new CheckoutProcess("so-cart", "order-total");
const postOrder = new ExternalServices()

order.init();

document.querySelector("#zip").addEventListener("blur", () => {
    order.calculateOrderTotal();
});

// Form submit handler
document.getElementById("checkout-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    // 1. Validate all fields
    if (!validateCheckoutForm(e.target)) {
        return; // validation failed
    }

    // 2. Pass the form element to checkout()
    const options =  await order.checkout(e.target);

    try{
        const res = await postOrder.checkout(options)
        window.location.href = "/";

    } catch (erro) {
        alert("Something went wrong with the order")
    }

});