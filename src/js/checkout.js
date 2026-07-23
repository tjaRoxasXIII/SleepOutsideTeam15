import { loadHeaderFooter, alertMessage, removeAllAlerts } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", "#order-summary");
myCheckout.init();

document.querySelector("#zip").addEventListener("blur", () => {
  myCheckout.calculateOrderTotal();
});

document.querySelector("#checkoutSubmit").addEventListener("click", async (e) => {
  e.preventDefault();
  const myForm = document.forms["checkout-form"] || document.forms[0];
  const chkStatus = myForm.checkValidity();
  myForm.reportValidity();

  if (chkStatus) {
    try {
      await myCheckout.checkout(myForm);
    } catch (err) {
      removeAllAlerts();
      if (err.name === "servicesError" && err.message) {
        for (const key in err.message) {
          alertMessage(err.message[key]);
        }
      } else {
        alertMessage("There was an error processing your order.");
      }
    }
  }
});