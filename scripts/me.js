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
                <article class="productCard" data-bezeichnung="${element.bezeichnung}">
                    <abbr title="Produkt aus Gespeichert entfernen">
                        <span class="star"><i class="fa-regular fa-trash-can"></i></span>
                    </abbr>
                    <img src="${element.foto}" alt="${element.bezeichnung}">
                    <h2>${element.bezeichnung}</h2>
                    <p>Preis ${element.preis} €</p>
                </article>

            `;

            // Füge die Produktkarte zum Container hinzu
            safedContainer.appendChild(productCard);
        });
    }
});

//Pordukt aus Mein Bereich löschen
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('fa-trash-can')) {
        // Hole das Produkt-Array aus dem localStorage
        const products = JSON.parse(localStorage.getItem('safedProductList'));
        // Hole die Bezeichnung des Produkts, das gelöscht werden soll
        const bezeichnung = event.target.closest('.productCard').dataset.bezeichnung;

        // Filtere das Produkt aus dem Array heraus
        const newProducts = products.filter(element => element.bezeichnung !== bezeichnung);
        // Speichere das neue Array im localStorage
        localStorage.setItem('safedProductList', JSON.stringify(newProducts));

        // Entferne die Produktkarte aus dem DOM
        event.target.closest('.productCard').remove();
    }
});