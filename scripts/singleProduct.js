document.addEventListener('DOMContentLoaded', () => {
    const url = new URL(window.location.href);
    const artnr = url.searchParams.get('artnr');
    const JSONdata = './scripts/products/products.json';
    fetch(JSONdata)
        .then(response => response.json())
        .then(data => {
            console.log('ArtNr:', artnr);
            let product; // Declare product outside if/else block
            if(artnr[0] === 'S'){
                product = data.specialProducts.find(p => p.artnr === artnr);
            } else {
                product = data.products.find(p => p.artnr === artnr);
            }

            if (!product) {
                throw new Error('Product not found');
            }
            const productContainer = document.querySelector('.container');
            productContainer.innerHTML = `
                <section class="singleProduct">
                    <ul class = "images">
                        <li class  = "miniImage" id = "1"><img src="${product.images[1]}" alt="Test"></li>
                        <li class  = "miniImage" id = "2"><img src="${product.images[2]}" alt="Test"></li>
                        <li class  = "miniImage" id = "3"><img src="${product.images[3]}" alt="Test"></liclass>
                    </ul>
                    <div class = "image-wrapper">
                        <p class = "productImage">
                        ${
                            product.available === false
                            ? '<img class="test normal" src="' + product.images[0] + '" style="filter: grayscale(100%);" alt="Produktbild">'
                                : '<img class="test normal" src="' + product.images[0] + '" alt="Produktbild">'
                        }
                        </p>
                    </div>
                    <div class = "productDetails">
                        <h1 class = "test">${product.name || 'Eigentlich sollte hier der Name stehen...'}</h1>
                        <hr>
                        <div class="product-wrapper">
                            <div class = "amount-icon"><i class="fa-regular fa-circle-dot"></i></div>
                            <div class = "available-icon"><i class="fa-solid fa-person-running"></i></div>
                            <div class = "lorry-icon"><i class="fa-solid fa-rocket"></i></div>
                            <div class = "parcel-icon"><i class="fa-solid fa-truck-fast"></i></div>
                            <div class = "amount-text">Anzahl: 1 Stk</div>
                            <div class = "available-text">Verfügbarkeit</div>
                            <div class = "lorry-text">Lieferung</div>
                            <div class = "parcel-text">Versandkosten</div>
                            <div class = "amount-number">${product.price} &euro;</div>
                            <div class = "available-number"><i class="fa-solid fa-check"></i></div>
                            <div class = "lorry-number">3-5 Tage</div>
                            <div class = "parcel-number">1.80 &euro;</div>
                            <div class = "divisor"><hr></div>
                            <div class = "total-text">Gesamt</div>
                            <div class = "total-number">${product.price + 1.8}0 &euro;</div>
                        </div>
                        
                        <!--Paypal Button hierhin-->
                        <!-- <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top" class = "test">
                            <input type="hidden" name="cmd" value="_s-xclick" />
                            <input type="hidden" name="hosted_button_id" value="FDETVFV9MSQ7A" />
                            <input type="hidden" name="currency_code" value="EUR" />
                            <input type="image" src="https://www.paypalobjects.com/de_DE/i/btn/btn_paynowCC_LG.gif" border="0" name="submit" title="PayPal – Einfacher und sicherer online bezahlen." alt="Jetzt kaufen" />
                        </form> -->
                        <div class = "buy">Bald kann der Artikel online gekauft werden!</div>
                    </div>
                </section>
            `;
            presentNewImage();
            zoom()
        })
});

function presentNewImage(){
    const images = document.querySelectorAll(".images li img")

    images.forEach(img => {
        img.addEventListener('click', () => {
            images.forEach(i => i.classList.remove("selected"));
            const mainImage = document.querySelector('.productImage img');
            mainImage.src = img.src;
            img.classList.add("selected")
        })
    })
}


function zoom(){
    const image = document.querySelector('.test');
    const wrapper = document.querySelector('.image-wrapper');
    
    wrapper.style.overflow = 'hidden';
    wrapper.style.position = 'relative';
    
    image.addEventListener('click', () => {
        image.classList.toggle('zoomed');
        const rect = image.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;
        const zoomFactor = 2.5;

        if (image.classList.contains('zoomed')) {
            image.style.position = 'relative';
            image.style.transformOrigin = `${offsetX}px ${offsetY}px`;
            image.style.transform = `scale(${zoomFactor})`;
            wrapper.style.overflow = 'hidden';
        } else {
            image.style.position = 'static';
            image.style.transform = 'none';
        }
    });

    // Add mouse move handling when zoomed
    image.addEventListener('mousemove', (event) => {
        if (image.classList.contains('zoomed')) {
            const rect = wrapper.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            // Calculate boundaries
            const maxX = wrapper.offsetWidth * (zoomFactor - 1);
            const maxY = wrapper.offsetHeight * (zoomFactor - 1);
            
            // Constrain movement
            const moveX = Math.max(0, Math.min(maxX, x * zoomFactor));
            const moveY = Math.max(0, Math.min(maxY, y * zoomFactor));
            
            image.style.transform = `translate(-${moveX}px, -${moveY}px) scale(${zoomFactor})`;
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const similarProductsContainer = document.querySelector('.sim-container');
    const JSONdata = './scripts/products/products.json';
    
    fetch(JSONdata)
        .then(response => response.json())
        .then(data => {
            // Get all products
            const allProducts = [...data.products, ...data.specialProducts];
            // Shuffle and slice
            const shuffledProducts = allProducts.sort(() => 0.5 - Math.random()).slice(0, 4);
            
            // Create HTML for all products
            const productsHTML = shuffledProducts.map(product => `
                <a href="singleProduct.html?artnr=${product.artnr}">
                    <div class="sim-product">
                        <div class="sim-img-container">
                            <img src="${product.images[0]}" alt="${product.name}">
                        </div>
                        <p class="sim-name">${product.name}</p>
                        <p class="sim-artnr">${product.artnr}</p>
                        <p class="sim-price">${product.price}€</p>
                    </div>
                </a>
            `).join('');
            
            // Set container content
            similarProductsContainer.innerHTML = productsHTML;
        })
        .catch(error => {
            console.error('Error loading similar products:', error);
            similarProductsContainer.innerHTML = '<p>Ähnliche Produkte konnten nicht geladen werden</p>';
        });
});