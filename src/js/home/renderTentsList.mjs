function tentCard(tent) {

    const ul = document.createElement("ul")
    const li = document.createElement("li")
    const a = document.createElement("a")
    const img = document.createElement("img")
    const h3 = document.createElement("h3")
    const h2 = document.createElement("h2")
    const p = document.createElement("p")

    ul.classList.add("product-list")
    li.classList.add("product-card")
    h3.classList.add("card__brand")
    h2.classList.add("card__name")

    a.href = `./product_pages/product.html`
    img.src = `src/${tent.Image}`
    img.alt = `${tent.Name.split(" -")[0]}`
    h3.textContent = tent.Brand.Name
    h2.textContent = tent.NameWithoutBrand
    p.textContent = `$${tent.FinalPrice}`

    a.appendChild(img)
    a.appendChild(h3)
    a.appendChild(h2)
    a.appendChild(p)
    li.appendChild(a)
    ul.appendChild(li)

    a.addEventListener("click", () => {
        localStorage.setItem("currentProduct", JSON.stringify(tent))
    })

    return ul
}

export default function renderTents(tentsList) {

    const container = document.querySelector(".products")
    container.innerHTML = ""
    tentsList.forEach(tent => {
        const card = tentCard(tent)
        container.appendChild(card)
    });

}