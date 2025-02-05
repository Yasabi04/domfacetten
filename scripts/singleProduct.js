document.addEventListener('DOMContentLoaded', () => {
    const url = new URL(window.location.href);
    const artnr = url.searchParams.get('artnr');
    const JSONdata = './scripts/products.json';
    fetch(JSONdata)
        .then(response => response.json())
        .then(data => {
            const product = data.products.find(product => product.artnr === artnr);
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
                            ? '<img class="test" src="' + product.images[0] + '" style="filter: grayscale(100%);" alt="Produktbild">'
                                : '<img class="test" src="' + product.images[0] + '" alt="Produktbild">'
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
                        <div class = "parcel-number">1.00 &euro;</div>
                        <div class = "divisor"><hr></div>
                        <div class = "total-text">Gesamt</div>
                        <div class = "total-number">${product.price + 1}</div>
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
            `;
            presentNewImage();
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