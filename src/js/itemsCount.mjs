import { getLocalStorage } from "./utils.mjs"

export default async function cartItemsCounter() {
    const cart = getLocalStorage("so-cart")
    const nav = document.querySelector(".cart")
    const children = nav.children
    let itemsCount = cart.length
    const previousCount = document.querySelector(".countCart")
    if (previousCount) {
        previousCount.textContent = itemsCount
        return
    }
    const h3 = document.createElement("h3")
    h3.classList.add("countCart")   
    h3.textContent = itemsCount

    nav.insertBefore(h3, children[0])
} 

cartItemsCounter()