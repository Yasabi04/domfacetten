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

  const productsHTML = continentalShip
    .map(
      (product) => `
            <article class="productCard" data-artnr="${product.artnr}">
                <img src="${product.foto}" alt="Produktbild von ${product.bezeichnung}">
                <h2>${product.bezeichnung}</h2>
                <p>Preis: ${product.preis} €</p>
                <p>Farbe: ${product.farbe}</p>
            </article>
        `
    )
    .join("");

  safedSection.innerHTML = productsHTML;
}

document.addEventListener("DOMContentLoaded", displaySafedProducts);
