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
        <article class="productCard" 
            data-artnr="${product.ArtNr}"
            data-farben="${product.Farbe}"
            data-preis="${product.Preis}"
            data-bezeichnung="${product.Bezeichnung}"
            data-foto="${product.Foto}">
            <a href="singleProduct.html">
                <img src="${product.Foto}" alt="Produktbild von ${
        product.Bezeichnung
      }">
            </a>
            <span class="star">${
              isProductSaved(product.ArtNr)
                ? '<i class="fa-solid fa-star"></i>'
                : '<i class="fa-regular fa-star"></i>'
            }</span>
            <h2>${product.Bezeichnung}</h2>
            <p>Preis: ${product.Preis} €</p>
            <p>Farbe: ${product.Farbe}</p>
        </article>
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
    let size = csvData.split("\n").length - 1;

    // Produkte parsen und HTML generieren
    const products = parseCSV(csvData, ";");
    document.getElementById("product-container").innerHTML =
      generateHTML(products);

    document.querySelectorAll(".productCard").forEach((card) => {
      card.addEventListener("click", (event) => {
        const artnr = card.getAttribute("data-artnr");
        const preis = card.getAttribute("data-preis");
        const bezeichnung = card.getAttribute("data-bezeichnung");
        const farben = card.getAttribute("data-farben");
        const foto = card.getAttribute("data-foto");
        const productData = {
          artnr: artnr,
          preis: preis,
          bezeichnung: bezeichnung,
          farben: farben,
          foto: foto,
        };
        localStorage.setItem("selectedProduct", productData); // Speichert die ArtNr des Produkts
      });
    });

    // Event-Listener für das Speichern und Entfernen von Produkten
    document.querySelectorAll(".star").forEach((starElement) => {
      starElement.addEventListener("click", (event) => {
        const productCard = event.currentTarget.closest(".productCard");
        const artnr = productCard.getAttribute("data-artnr");

        if (!isProductSaved(artnr)) {
          // Produkt hinzufügen und Stern ausfüllen
          event.currentTarget.innerHTML = '<i class="fa-solid fa-star"></i>';

          // Produktdaten aus HTML holen
          const productData = {
            artnr: productCard.getAttribute("data-artnr"),
            preis: productCard.getAttribute("data-preis"),
            bezeichnung: productCard.getAttribute("data-bezeichnung"),
            farben: productCard.getAttribute("data-farben"),
            foto: productCard.getAttribute("data-foto"),
          };

          // Produkt zur Liste hinzufügen
          continentalShip.push(productData);
          console.log(continentalShip);
        } else {
          // Produkt entfernen und Stern leer darstellen
          event.currentTarget.innerHTML = '<i class="fa-regular fa-star"></i>';

          // Produkt aus der Liste entfernen
          continentalShip = continentalShip.filter(
            (product) => product.artnr !== artnr
          );
          console.log(continentalShip);
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
