// Hole das gespeicherte Produkt-Array aus dem localStorage
let safedProductList = JSON.parse(localStorage.getItem('safedProductList')) || [];

// Setze die Produkte in localStorage
function updateLocalStorage() {
    localStorage.setItem('safedProductList', JSON.stringify(safedProductList));
}

// HTML-Elemente für jedes Produkt erstellen
function generateHTML(products) {
    return products.map(product => `
        <article class="productCard" 
            id="product-${product.ArtNr}" 
            data-artnr="${product.ArtNr}"
            data-farben="${product.Farben}"
            data-preis="${product.Preis}"
            data-bezeichnung="${product.Bezeichnung}"
            data-foto="${product.Foto}">
            <a href="singleProduct.html">
                <img src="${product.Foto}" alt="Produktbild von ${product.Bezeichnung}">
            </a>
            <abbr title="Produkt speichern">
                <span class="star">${isProductSaved(product.ArtNr) ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>'}</span>
            </abbr>
            <h2>${product.Bezeichnung}</h2>
            <p>Preis: ${product.Preis} €</p>
            <p>Farben: ${product.Farben}</p>
        </article>
    `).join('');
}

// Überprüfen, ob ein Produkt gespeichert ist
function isProductSaved(artnr) {
    return safedProductList.some(product => product.artnr === artnr);
}

const csvData = `Foto,Bezeichnung,ArtNr,Preis,Farben
    images/bracelet1.png,Armband,1234,3.75,ambergreen,borealis,crystalpurple
    images/bracelet1.png,Armband2,097124,4.50,black,white
    images/bracelet1.png,Armband3,0911,13.99,auratiumgold,technogreen,bridgeblue
    images/bracelet1.png,Armband4,3994,10.75,crystalpurple
    images/bracelet1.png,Armband5,0001,7.99,black,white
    images/bracelet1.png,Armband6,0002,9.99,black,white
    images/bracelet1.png,Armband7,0003,5.99,black,white
    images/bracelet1.png,Armband3,0911,13.99,auratiumgold,technogreen,bridgeblue
    images/bracelet1.png,Armband4,3994,10.75,crystalpurple
    images/bracelet1.png,Armband5,0001,7.99,black,white
    images/bracelet1.png,Armband6,0002,9.99,black,white
    images/bracelet1.png,Armband7,0003,5.99,black,white
    images/bracelet1.png,Armband3,0911,13.99,auratiumgold,technogreen,bridgeblue
    images/bracelet1.png,Armband4,3994,10.75,crystalpurple
    images/bracelet1.png,Armband5,0001,7.99,black,white
    images/bracelet1.png,Armband6,0002,9.99,black,white
    images/bracelet1.png,Armband7,0003,5.99,black,white`;

    let size = csvData.split('\n').length-1;

// Produkte parsen und HTML generieren
const products = parseCSV(csvData, ',');
document.getElementById('product-container').innerHTML = generateHTML(products);

// Event-Listener für das Speichern und Entfernen von Produkten
document.querySelectorAll(".star").forEach(starElement => {
    starElement.addEventListener('click', (event) => {
        const productCard = event.currentTarget.closest('.productCard');
        const artnr = productCard.getAttribute('data-artnr');

        if (!isProductSaved(artnr)) {
            // Produkt hinzufügen und Stern ausfüllen
            event.currentTarget.innerHTML = '<i class="fa-solid fa-star"></i>';
            
            // Produktdaten aus HTML holen
            const productData = {
                artnr,
                preis: productCard.getAttribute('data-preis'),
                bezeichnung: productCard.getAttribute('data-bezeichnung'),
                farben: productCard.getAttribute('data-farben'),
                foto: productCard.getAttribute('data-foto'),
                datum: new Date().toISOString()
            };

            // Produkt zur Liste hinzufügen
            safedProductList.push(productData);
            console.log('Produkt hinzugefügt:', productData);
            console.log('Anzahl Fotos', size);
        } else {
            // Produkt entfernen und Stern leer darstellen
            event.currentTarget.innerHTML = '<i class="fa-regular fa-star"></i>';

            // Produkt aus der Liste entfernen
            safedProductList = safedProductList.filter(product => product.artnr !== artnr);
            console.log('Produkt entfernt:', artnr);
        }

        // Aktualisiere die localStorage-Daten
        updateLocalStorage();
    });
});

// Funktion zum Parsen des CSV
function parseCSV(csv, delimiter = ',') {
    const rows = csv.trim().split('\n');
    const headers = rows[0].split(delimiter);
    const data = rows.slice(1).map(row => {
        const values = row.split(delimiter);
        return headers.reduce((object, header, index) => {
            object[header] = values[index];
            return object;
        }, {});
    });
    return data;
}
