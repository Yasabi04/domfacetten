document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.smallProduct');
    const carousel = document.querySelector('.productCaroussel'); // Fixed selector
    
    if (!carousel) {
        console.error('Carousel element not found');
        return;
    }
    
    if (productCards.length === 0) {
        console.error('No product cards found');
        return;
    }

    let currentIndex = 0;
    console.log('Found products:', productCards.length);

    function updateCarousel() {
        if (!productCards[0]) return;
        const cardWidth = productCards[0].offsetWidth;
        const offset = -currentIndex * (cardWidth + 16); // Add margin
        carousel.style.transform = `translateX(${offset}px)`;
        console.log('Moving to index:', currentIndex, 'offset:', offset);
    }

    const leftArrow = document.querySelector('.leftArrow');
    const rightArrow = document.querySelector('.rightArrow');

    leftArrow?.addEventListener('click', () => {
        console.log('Left click');
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    rightArrow?.addEventListener('click', () => {
        console.log('Right click');
        if (currentIndex < productCards.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    updateCarousel();
});


// Remove the arrows when the screen width is below 768px
document.addEventListener('DOMContentLoaded', () => {
    const leftArrow = document.querySelector('.leftArrow');
    const rightArrow = document.querySelector('.rightArrow');

    if (!leftArrow || !rightArrow) {
        console.error('Arrows not found');
        return;
    }

    function updateArrows() {
        if (window.innerWidth < 768) {
            leftArrow.style.display = 'none';
            rightArrow.style.display = 'none';
        } else {
            leftArrow.style.display = 'flex';
            rightArrow.style.display = 'flex';
        }
    }

    updateArrows();
    window.addEventListener('resize', updateArrows);
});





let spaceship = JSON.parse(localStorage.getItem("spaceship")) || [];
spaceship = spaceship[spaceship.length - 1];


// Letztes Produkt im spaceship anzeigen

console.log("Gespeicherte Produkte:", spaceship);

document.addEventListener("DOMContentLoaded", () => {
    // HTML-Elemente für jedes Produkt erstellen
function displayWantedProduct() {
    const safedSection = document.querySelector("container");
    console.log("Letztes Produkt:", spaceship);
  
    const productsHTML = spaceship.map(product => `
            <section class = "singleProduct">
                
            </section>
          `
      ).join("");
  
    safedSection.innerHTML = productsHTML;
  }
});

document.addEventListener("DOMContentLoaded", () => {

    function displayWantedProduct() {
        const safedSection = document.querySelector(".container"); // Fixed selector
        
        // Get the spaceship data
        let spaceship = JSON.parse(localStorage.getItem("spaceship")) || [];
        // If we want to show only the last product, wrap it in an array
        const productToShow = [spaceship[spaceship.length - 1]];
        
        console.log("Product to display:", productToShow);
        
        // Only proceed if we have a product to show
        if (productToShow[0]) {
            const productsHTML = productToShow.map(product => `
                <section class="singleProduct">
                <ul class = "images">
                    <li class  = "miniImage" id = "1"><img src="./images/products/ABRotWeiß_1.jpg" alt="Test"></li>
                    <li class  = "miniImage" id = "2"><img src="./images/products/ABRotWeiß_1.jpg" alt="Test"></li>
                    <li class  = "miniImage" id = "3"><img src="./images/products/ABRotWeiß_1.jpg" alt="Test"></li>
                </ul>
                    <div class = "image-wrapper"
                    data-foto="${product.foto}"
                    data-available="${product.Available}"
                    >
                        <p class = "productImage">
                        ${
                            product.available === 'false'
                            ? '<img class="test" src="' + product.foto + '" style="filter: grayscale(100%);" alt="Produktbild">'
                                : '<img class="test" src="' + product.foto + '" alt="Produktbild">'
                        }
                        </p>
                    </div>
                <div class = "productDetails"
                    data-artnr="${product.ArtNr}"
                    data-farben="${product.Farbe}"
                    data-preis="${product.Preis}"
                    data-bezeichnung="${product.Bezeichnung}"
                    data-available="${product.Available}"
                >
                    <h1 class = "test">${product.bezeichnung || 'Eigentlich sollte hier der Name stehen...'}</h1>
                    <hr>
                    <div class = "spaceBetween">
                        <div class = "fakeSelect">
                            <i class="fa-regular fa-circle-dot"></i>
                            <p>Menge: 1. Stk</p>
                        </div>
                        <p class = "data">${product.preis || '100.00'}$</p> 
                    </div>
                    <div class = "spaceBetween">
                        <div class = "fakeSelect">
                            <i class="fa-solid fa-question"></i>
                            <p>Verfügbarkeit</p>
                        </div>
                        <p>${
                            product.available === 'true'
                                ? '<i class = "fa-solid fa-check" style="color: green"></i>'
                                :product.available === 'false'
                                    ? '<i class = "fa-solid fa-xmark" style="color: red"></i>'
                                    : '<i class = "fa-solid fa-question"></i>'
                        }</p>
                    </div>
                    <div class = "spaceBetween">
                        <div class = "fakeSelect">
                            <i class="fa-solid fa-truck"></i>
                            <p>Lieferzeit</p>
                        </div>
                        <p class = "data">3-5 Tage</p>
                    </div>
                    <div class = "spaceBetween">
                        <div class = "fakeSelect">
                            <i class="fa-solid fa-box"></i>
                            <p>Versandkosten</p>
                        </div>
                        <p class = "data">1.00$</p>
                    </div>
                    <hr>
                    <div class = "spaceBetween">
                        <p class = "data finalPrice">Gesamt</p>
                        <p class = "data finalPrice">${product.preis - -1 || '100.00'}$</p>
                    </div>
                    <!--Paypal Button hierhin-->
                    <!-- <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top" class = "test">
                        <input type="hidden" name="cmd" value="_s-xclick" />
                        <input type="hidden" name="hosted_button_id" value="FDETVFV9MSQ7A" />
                        <input type="hidden" name="currency_code" value="EUR" />
                        <input type="image" src="https://www.paypalobjects.com/de_DE/i/btn/btn_paynowCC_LG.gif" border="0" name="submit" title="PayPal – Einfacher und sicherer online bezahlen." alt="Jetzt kaufen" />
                    </form> -->
                    <div class = "buy">Jetzt mit Paypal kaufen!</div>
                </div>
                </section>
            `).join("");
            
            safedSection.innerHTML = productsHTML;
        } else {
            console.error("Aus irgendeinem Grund wurde kein Produkt gefunden");
        }
    }
    
    displayWantedProduct();
    presentNewImage();
});


function presentNewImage(){
    document.querySelectorAll('.miniImage').forEach(image => {
        image.addEventListener('click', () => {
            const productImage = document.querySelector('.productImage img');
            productImage.src = image.querySelector('img').src;
        });
    });
}