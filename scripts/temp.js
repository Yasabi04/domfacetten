document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('#safed-product-container');
    if(!container) {
        console.log('Container nicht gefunden');
        return;
    }

    // Gespeicherte Produkte aus localStorage abrufen
    const savedProducts = JSON.parse(localStorage.getItem('saved')) || [];
    console.log('Saved products:', savedProducts);
    
    // Überprüfen, ob gespeicherte Produkte vorhanden sind
    if(savedProducts.length === 0) {
        container.innerHTML = '<h1 class = "headline-one">Keine Produkte gespeichert.</h1>';
        return;
    }
    
    // Array für alle Promises erstellen
    const promises = savedProducts.map(productId => {
        return fetch('./scripts/products/products.json')
            .then(response => response.json())
            .then(data => {
                const product = data.products.find(p => p.artnr === productId);
                if (product){
                    return `
                        <section class="temp-product">
                            <a href="singleProduct.html?artnr=${product.artnr}">
                                <div class="temp-image-container">
                                    <img src="${product.images[0]}" alt="${product.name}">
                                </div>
                                <div class="temp-product-text">
                                    <h2>${product.name}</h2>
                                    <p class="temp-artnr">${product.artnr}</p>
                                    <p class="temp-price">${product.price}€</p>
                                </div>
                            </a>
                            <span class="temp-trash" role="button" tabindex="0" data-id="${product.artnr}">
                                <i class="fa-regular fa-trash-can"></i>
                            </span>
                        </section>
                    `;
                }
                return ''; // Fallback für nicht gefundene Produkte
            });
    });

    Promise.all(promises)
        .then(productCards => {
            container.innerHTML = productCards.join('');
            
            // Jetzt Event-Listener hinzufügen, nachdem der Inhalt geladen wurde
            document.querySelectorAll('.temp-trash').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation(); // Verhindert Bubble-Up des Events
                    
                    // Produktnummer direkt aus dem data-id Attribut holen
                    const productId = button.dataset.id;
                    console.log('Lösche Produkt:', productId);
                    
                    // Produkt aus dem localStorage entfernen
                    const updatedProducts = savedProducts.filter(id => id !== productId);
                    localStorage.setItem('saved', JSON.stringify(updatedProducts));
                    
                    // Seite neu laden, um die Änderungen anzuzeigen
                    location.reload();
                });
            });
        })
        .catch(error => {
            console.error('Fehler beim Laden der Produkte:', error);
            container.innerHTML = '<h1>Fehler beim Laden der gespeicherten Produkte.</h1>';
        });
});