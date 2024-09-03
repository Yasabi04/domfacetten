const csvData = `
Bezeichnung;ArtNr;Preis;Farben
Armband;1234;3.75;ambergreen,borealis,crystalpurple
Armband2;097124;4.50;black,white
Armband3;0911;13.99;auratiumgold,technogreen,bridgeblue
`;

// CSV-Daten in ein Array von Objekten parsen
function parseCSV(data) {
const lines = data.split('\n');
const headers = lines[0].split(';'); // Verwende hier das richtige Trennzeichen
return lines.slice(1).map(line => {
    const values = line.split(';'); // Verwende auch hier das richtige Trennzeichen
    const obj = {};
    headers.forEach((header, index) => {
        obj[header.trim()] = values[index]?.trim().replace(/"/g, '');
    });
    return obj;
});
}

// Produktkarten erstellen und in die HTML-Seite einfügen
function createProductCards(products) {
const container = document.getElementById('product-container');
products.forEach(product => {
    const card = document.createElement('article');
    card.className = 'productCard';

    // Farben in ein Array umwandeln und Dropdown-Optionen erstellen
    const colorOptions = product.Farben.split(',').map(color => `<option value="${color.trim()}">${color.trim()}</option>`).join('');

    card.innerHTML = `
        <a href="singleProduct.html">
            <img src="./images/bracelet1.png" alt="Produkt">
            <h2>${product.Bezeichnung}</h2>
            <h3>Preis: ${product.Preis}$</h3>
            <h4>Artikelnr: ${product.ArtNr}</h4>
        </a>
    `;
    container.appendChild(card);
    document.getElementsByClassName('productCard').addEventListener("click", function(){
        bezeichnung = product.Bezeichnung
        preis = product.Preis
        artnr = product.ArtNr
        farben = product.Farben
        console.log(artnr)
    });
});
}

// CSV-Daten parsen und Produktkarten erstellen
const products = parseCSV(csvData);
createProductCards(products);