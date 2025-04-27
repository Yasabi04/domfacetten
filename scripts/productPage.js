// Zugriff auf JSON Datei
document.addEventListener('DOMContentLoaded', () => {
  const productConatiner = document.querySelector('#product-container');
  const specialProductConatiner = document.querySelector('#newIn');
  if(!productConatiner) {
    console.log('Nicht erkannt')
  }

  fetch('./scripts/products/products.json')
    .then(response => response.json())
    .then(data => {
      const productsHTML = data.products.map(product => `
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
                      <span class="temp-star" role="button" tabindex="0"><i class="fa-regular fa-star"></i></span>
                  </section>`
      ).join('');

      if(data.specialProducts.length === 0) {
        specialProductConatiner.style.display = 'none';
      }
      else{
        const specialProductsHTML = data.specialProducts.map(product => `
                  <section class="temp-product special">
                      <a href="singleProduct.html?artnr=${product.artnr}">
                          <div class="temp-image-container">
                              <img src="${product.images[0]}" alt="${product.name}">
                          </div>
                          <div class="temp-product-text">
                              <h2>${product.name}</h2>
                              <p class="temp-colour">${product.artnr}</p>
                              <p class="temp-price">${product.price}€</p>
                          </div>
                      </a>
                      <span class="temp-star" role="button" tabindex="0"><i class="fa-solid fa-star"></i></span>
                  </section>`
        ).join('');

        specialProductConatiner.innerHTML = specialProductsHTML;
      }
      
      
    
      productConatiner.innerHTML = productsHTML;
    })
    .catch(error => {
      console.error('Fehler beim Laden der JSON-Datei:', error);
    });
});