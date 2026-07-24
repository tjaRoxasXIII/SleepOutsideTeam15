import validateCheckoutForm from "./CheckOutFormValidator.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { loadHeaderFooter, setLocalStorage } from "./utils.mjs";

// Load common header and footer templates
loadHeaderFooter();

// Initialize order process and service instances
const order = new CheckoutProcess("so-cart", "order-total");
const postOrder = new ExternalServices();

order.init();

// Recalculate totals when the user finishes entering their zip code
document.querySelector("#zip").addEventListener("blur", () => {
    order.calculateOrderTotal();
});

// Form submit handler
document.getElementById("checkout-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    // 1. Validate form fields
    const isValid = validateCheckoutForm(e.target);
    if (!isValid) {
        return; // Stop execution if validation fails
    }

    try {
        // 2. Build order payload options
        const options = await order.checkout(e.target);

        // 3. Send order request to the backend server
        const res = await postOrder.checkout(options);

        // 4. Handle successful response
        if (res) {
            // Clear the cart from localStorage
            setLocalStorage("so-cart", []);
            
            // Redirect to order success page
            window.location.href = "/checkout/success.html"; 
        }
    } catch (err) {
        // Handle server or network errors
        console.error("Checkout error:", err);
        alert("Something went wrong with the order. Please check your details and try again.");
    }
});