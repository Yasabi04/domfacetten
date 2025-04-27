// Gespeicherte Produkte aus dem localStorage laden oder leeres Array initialisieren
let saved = JSON.parse(localStorage.getItem('saved')) || [];

document.addEventListener('DOMContentLoaded', () => {
    // Wait for stars to be available
    setTimeout(() => {
        const stars = document.querySelectorAll('.temp-star');
        console.log('Found stars:', stars.length);  

        stars.forEach(star => {
            star.addEventListener('click', (event) => {
                event.preventDefault();
                console.log('Star clicked');  // Debug log

                // Get the product info from parent
                const product = star.closest('.temp-product');
                if (!product) {
                    console.error('Product not found');
                    return;
                }
                let productNumber = product.querySelector('.temp-artnr').innerHTML

                if(saved.includes(productNumber)) {
                    saved.splice(saved.indexOf(productNumber), 1);
                    star.innerHTML = '<i class="fa-regular fa-star"></i>';
                    console.log('Entfernt:', saved);  // Debug log
                    localStorage.setItem('saved', JSON.stringify(saved));
                }
                else{
                    saved.push(productNumber);
                    star.innerHTML = '<i class="fa-solid fa-star"></i>';
                    console.log('Hinzugefügt:', saved);  // Debug log
                    localStorage.setItem('saved', JSON.stringify(saved)); // Hier fehlte das Speichern
                }
            });
        });
    }, 1000); // Give time for dynamic content to load
});