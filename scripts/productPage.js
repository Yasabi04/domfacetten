let safedProductList = [];
localStorage.setItem('safedProductList', JSON.stringify(safedProductList));

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
                <span class="star"><i class="fa-regular fa-star"></i></span>
            </abbr>
            <h2>${product.Bezeichnung}</h2>
            <p>Preis: ${product.Preis} €</p>
            <p>Farben: ${product.Farben}</p>
        </article>
    `).join('');
    }

    // CSV-Daten (Diese sollten idealerweise aus einer externen Quelle geladen werden)
    const csvData = `Foto,Bezeichnung,ArtNr,Preis,Farben
                images/koelnerDom.jpg,Armband,1234,3.75,ambergreen,borealis,crystalpurple
                images/Logo.png,Armband2,097124,4.50,black,white
                images/Logo.png,Armband3,0911,13.99,auratiumgold,technogreen,bridgeblue
                images/mrCrabs.gif,Armband4,3994,10.75,crystalpurple
                images/bracelet1.png,Armband5,0001,7.99,black,white
                images/smallLogo.png,Armband6,0002,9.99,black,white
                images/braceletWrist.png,Armband7,0003,5.99,black,white`;

    // Produkte parsen und HTML generieren
    const products = parseCSV(csvData, ',');
    document.getElementById('product-container').innerHTML = generateHTML(products);

    /*
    document.querySelectorAll('.product').forEach(productElement => {
        productElement.addEventListener('click', (event) => {
        const productData = event.currentTarget.getAttribute('data-product');
        localStorage.setItem('selectedProduct', productData);
        alert('Produkt gespeichert: ' + productData);
    });
    });
    */

    document.querySelectorAll(".star").forEach(starElement => {
        starElement.addEventListener('click', (event) => {
            if (event.currentTarget.innerHTML === '<i class="fa-regular fa-star"></i>') {
                // Ändere zu ausgefülltem Stern
                event.currentTarget.innerHTML = '<i class="fa-solid fa-star"></i>';
    
                // Produktinformationen direkt aus HTML Code holen
                const productCard = event.currentTarget.closest('.productCard');
                const productData = {
                    artnr: productCard.getAttribute('data-artnr'),
                    preis: productCard.getAttribute('data-preis'),
                    bezeichnung: productCard.getAttribute('data-bezeichnung'),
                    farben: productCard.getAttribute('data-farben'),
                    foto: productCard.getAttribute('data-foto'),
                    datum: new Date().toISOString() // Datum als ISO-String speichern
                };
    
                // Überprüfe, ob die Daten korrekt sind
                console.log('Produktinformationen:', productData);
                safedProductList.push(productData);
            } else {
                // Ändere zu regulärem Stern
                event.currentTarget.innerHTML = '<i class="fa-regular fa-star"></i>';
    
                // Entferne die gespeicherten Daten
                localStorage.removeItem('safedProduct');
                console.log('Produktinformationen aus Mein Bereich gelöscht');
            }
        });
    });
    
    