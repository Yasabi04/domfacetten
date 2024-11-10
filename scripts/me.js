let continentalShip = JSON.parse(localStorage.getItem("continentalShip")) || [];

console.log("Gespeicherte Produkte:", continentalShip);

function displaySafedProducts() {
  const safedSection = document.querySelector(".product-container");

  if (continentalShip.length === 0 || !continentalShip) {
    safedSection.innerHTML =
      "<p>Leider ziemlich leer hier. Schauen Sie sich doch mal ein bisschen um!</p>";
    return;
  }
  console.log("Gespeicherte Produkte:", continentalShip);

  const productsHTML = continentalShip.map(product => `
            <article class="productCard" data-artnr="${product.artnr}">
                <img src="${product.foto}" alt="Produktbild von ${product.bezeichnung}">
                <h2>${product.bezeichnung}</h2>
                <p>Preis: ${product.preis} €</p>
                <p>Farbe: ${product.farbe}</p>
                <span class="star"><i class="fa fa-xmark"></i></span>
            </article>
        `
    ).join("");

  safedSection.innerHTML = productsHTML;
}

document.querySelector(".product-container").addEventListener("click", (event) => {
  if (event.target.classList.contains("fa-xmark")) {
    const artnr = event.target.closest(".productCard").getAttribute("data-artnr");
    continentalShip = continentalShip.filter(product => product.artnr !== artnr);
    localStorage.setItem("continentalShip", JSON.stringify(continentalShip));
    displaySafedProducts();
  }
});

document.addEventListener("DOMContentLoaded", displaySafedProducts);