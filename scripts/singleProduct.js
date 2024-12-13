//Hole das Produkt das in spaceship gespeichert wurde und zeige es auf der singleProduct.html Seite an

const cargoDelivery = JSON.parse(".localStorage.getItem('cargoShip')") || [];

console.log(cargoDelivery);


// Hole das Produkt das in spaceship gespeichert wurde und zeige es auf der singleProduct.html Seite an
const product = JSON.parse(localStorage.getItem('product')) || {};
console.log(product);