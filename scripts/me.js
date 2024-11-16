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
            <section class="temp-product"
              data-artnr="${product.artnr}"
              data-farben="${product.farben}"
              data-preis="${product.preis}"
              data-bezeichnung="${product.bezeichnung}"
              data-foto="${product.foto}">
                <a href="singleProduct.html">
                  <div class="temp-image-container">
                      <img src="${product.foto || ''}" alt="${product.artnr || ''}">
                  </div>
                  <div class="temp-product-text">
                    <h2>${product.bezeichnung || ''}</h2>
                    <p class="temp-colour">${product.artnr || ''}</p>
                    <p class="temp-price">${product.farben || ''}</p>
                  </div>
                </a>
                <span class="temp-star" role="button" tabindex="0">
                  <i class="fa fa-xmark"></i>
                </span>
            </section>
        `
    ).join("");

  safedSection.innerHTML = productsHTML;
}

// Event-Delegation für das Entfernen von Produkten
document.querySelector(".product-container").addEventListener("click", (event) => {
  if (event.target.classList.contains("fa-xmark")) {
    const productElement = event.target.closest(".temp-product");
    if (productElement) {
      const artnr = productElement.getAttribute("data-artnr");
      // Produkt aus Array entfernen
      continentalShip = continentalShip.filter(product => product.artnr !== artnr);
      // LocalStorage aktualisieren
      localStorage.setItem("continentalShip", JSON.stringify(continentalShip));
      // Anzeige aktualisieren
      displaySafedProducts();
    }
  }
});

// Initialisierung beim Laden der Seite
document.addEventListener("DOMContentLoaded", () => {
  displaySafedProducts();
  console.log("Seite geladen, gespeicherte Produkte:", continentalShip);
});