document.addEventListener('DOMContentLoaded', () => {
    // Hole das gespeicherte Produkt-Array aus dem localStorage
    const products = JSON.parse(localStorage.getItem('safedProductList'));

    // Füge sicherheitshalber einen Check hinzu, ob das Array existiert und nicht leer ist
    if (products && products.length > 0) {
        // Finde das Element, in das du die Produktkarten einfügen möchtest (die Klasse 'safed')
        const safedContainer = document.querySelector('.safed');
        products.forEach(element => {
            // Erstelle eine neue article-Karte für jedes Produkt
            const productCard = document.createElement('article');
            productCard.classList.add('productCard');
            
            // Füge den HTML-Inhalt für jedes Produkt hinzu
            productCard.innerHTML = `
                <abbr title="Produkt aus Gespeichert entfernen">
                    <span class="star"><i class="fa-regular fa-trash-can"></i></span>
                </abbr>
                <img src="${element.foto}" alt="${element.bezeichnung}">
                <h2>${element.bezeichnung}</h2>
                <p>Preis ${element.preis} €</p>
            `;

            // Füge die Produktkarte zum Container hinzu
            safedContainer.appendChild(productCard);
        });
    }
});

document.querySelectorAll('.star').forEach(starIcon => {
    starIcon.addEventListener('click', (event) => {
        // Hole das gespeicherte Produkt-Array aus dem localStorage
        let products = JSON.parse(localStorage.getItem('safedProductList')) || [];

        // Finde die Produktkarte (div.productCard) basierend auf dem DOM-Element, das angeklickt wurde
        const productCard = event.target.closest('.productCard');
        
        // Hole die Produktbezeichnung oder eine eindeutige ID aus den Datenattributen
        const productBezeichnung = productCard.getAttribute('data-bezeichnung');

        // Finde das Produkt im Array
        const productIndex = products.findIndex(product => product.bezeichnung === productBezeichnung);

        if (productIndex !== -1) {
            // Entferne das Produkt aus dem Array
            products.splice(productIndex, 1);

            // Speichere das aktualisierte Array im localStorage
            localStorage.setItem('safedProductList', JSON.stringify(products));

            // Entferne die Produktkarte aus dem DOM
            productCard.remove();

            console.log(`Produkt '${productBezeichnung}' wurde erfolgreich entfernt.`);
        } else {
            console.log(`Produkt '${productBezeichnung}' wurde nicht gefunden.`);
        }
    });
});