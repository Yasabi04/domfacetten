const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs')

const app = express();
const PORT = process.env.PORT || 3000;

// Statische Dateien (HTML, CSS, JS) aus dem public-Ordner servieren
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(bodyParser.json());

let products;
try {
    const data = fs.readFileSync(path.join(__dirname, 'products-backend.json'), 'utf8');
    products = JSON.parse(data);
    console.log('Produkte erfolgreich geladen:', products);
} catch (error) {
    console.error('Fehler beim Laden der Produkte:', error);
    products = { products: [], specialProducts: [] }; // Fallback
}

// API-Endpunkt, um Produkte zu holen
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
