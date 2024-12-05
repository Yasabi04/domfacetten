// Hole das gespeicherte Produkt-Array aus dem localStorage
let continentalShip = JSON.parse(localStorage.getItem("continentalShip")) || [];


// Setze die Produkte in localStorage
function updateLocalStorage() {
  localStorage.setItem("continentalShip", JSON.stringify(continentalShip));
}

// HTML-Elemente für jedes Produkt erstellen

function generateHTML(products) {
  return products
    .map(
      (product) => `
            <section class="temp-product slideInRight"
              data-artnr="${product.ArtNr}"
              data-farben="${product.Farbe}"
              data-preis="${product.Preis}"
              data-bezeichnung="${product.Bezeichnung}"
              data-foto="${product.Foto}">
                <a href="singleProduct.html">
                  <div class="temp-image-container">
                      <img src="${product.Foto}" alt="${product.ArtNr}">
                  </div>
                  <div class="temp-product-text">
                    <h2>${product.Bezeichnung}</h2>
                    <p class="temp-colour">${product.ArtNr}</p>
                    <p class="temp-price">${product.Farbe}</p>
                  </div>
                </a>
                <span class="temp-star" role="button" tabindex="0">${
                  isProductSaved(product.ArtNr)
                    ? '<i class="fa-solid fa-star"></i>'
                    : '<i class="fa-regular fa-star"></i>'
                }</span>
            </section>
    `
    )
    .join("");
}

// Überprüfen, ob ein Produkt gespeichert ist
function isProductSaved(artnr) {
  return continentalShip.some((product) => product.artnr === artnr);
}

fetch("./products.csv")
  .then((response) => response.text())
  .then((csvData) => {
    const products = parseCSV(csvData, ";");
    document.getElementById("product-container").innerHTML = generateHTML(products);

    // Event-Listener für die Sterne
    document.querySelectorAll(".temp-star").forEach((starElement) => {
      starElement.addEventListener("click", (event) => {
        event.preventDefault(); // Verhindert das Auslösen des Links
        const productSection = event.currentTarget.closest(".temp-product");
        const artnr = productSection.getAttribute("data-artnr");

        if (!isProductSaved(artnr)) {
          // Produkt hinzufügen und Stern ausfüllen
          event.currentTarget.innerHTML = '<i class="fa-solid fa-star"></i>';

          // Produktdaten aus HTML holen
          const productData = {
            artnr: productSection.getAttribute("data-artnr"),
            preis: productSection.getAttribute("data-preis"),
            bezeichnung: productSection.getAttribute("data-bezeichnung"),
            farben: productSection.getAttribute("data-farben"),
            foto: productSection.getAttribute("data-foto"),
          };

          // Produkt zur Liste hinzufügen
          continentalShip.push(productData);
        } else {
          // Produkt entfernen und Stern leer darstellen
          event.currentTarget.innerHTML = '<i class="fa-regular fa-star"></i>';

          // Produkt aus der Liste entfernen
          continentalShip = continentalShip.filter(
            (product) => product.artnr !== artnr
          );
        }
        
        // Aktualisiere die localStorage-Daten
        updateLocalStorage();
      });
    });
  });


// Funktion zum Parsen des CSV
function parseCSV(csv, delimiter = ",") {
  const rows = csv.trim().split("\n");
  const headers = rows[0].split(delimiter);
  const data = rows.slice(1).map((row) => {
    const values = row.split(delimiter);
    return headers.reduce((object, header, index) => {
      object[header] = values[index];
      return object;
    }, {});
  });
  return data;
}




/*Altes Produkt*/

/*
<article class="productCard" 
            data-artnr="${product.ArtNr}"
            data-farben="${product.Farbe}"
            data-preis="${product.Preis}"
            data-bezeichnung="${product.Bezeichnung}"
            data-foto="${product.Foto}">
            <a href="singleProduct.html">
                <img src="${product.Foto}" alt="Produktbild von ${product.Bezeichnung}">
            </a>
            <span class="star">${
              isProductSaved(product.ArtNr)
                ? '<i class="fa-solid fa-star"></i>'
                : '<i class="fa-regular fa-star"></i>'
            }</span>
            <h2>${product.Bezeichnung}</h2>
            <p>Preis: ${product.Preis} €</p>
            <p>${product.Farbe !== "-"
              ? "Farben: " + product.Farbe
              : ""
            }</p>
            <span class = "new">${
              product.Special === "true" 
                ? "Neu"
                : ""
            }</span>
            <span class = "bestseller">${
              product.Bestseller === "true" 
                ? "Bestseller"
                : ""
            }</span>
            <span class = "sale">${
              product.Sale === "true" 
                ? "Sale"
                : ""
            }</span>
        </article>
*/


