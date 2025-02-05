// Zugriff auf JSON Datei
document.addEventListener('DOMContentLoaded', () => {
  const productConatiner = document.querySelector('#product-container');
  if(!productConatiner) {
    console.log('Nicht erkannt')
  }

  fetch('./scripts/products.json')
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
                              <p class="temp-colour">${product.artnr}</p>
                              <p class="temp-price">${product.price}€</p>
                          </div>
                      </a>
                      <span class="temp-star" role="button" tabindex="0"><i class="fa-solid fa-star"></i></span>
                  </section>`
      ).join('');
      
      productConatiner.innerHTML = productsHTML;
    })
    .catch(error => {
      console.error('Fehler beim Laden der JSON-Datei:', error);
    });
});