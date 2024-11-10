/*
document.addEventListener('scroll', function() {
    const footer = document.querySelector('footer');
    const cookieButton = document.querySelector('.buyMeACookie');
    const footerRect = footer.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Wenn der Footer in Sicht ist
    if (footerRect.top <= windowHeight) {
        cookieButton.style.bottom = `${footerRect.height + 20}px`; // 20px Abstand zum Footer
    } else {
        cookieButton.style.bottom = '10px'; // Zurück zur ursprünglichen Position
    }
});
*/

document.querySelector('.searchSymbol').addEventListener('click', () => {
    // Erstelle das Input-Feld dynamisch
    const input = document.createElement('input');
    input.id = "inputSearchField"
    input.type = 'text';
    input.placeholder = 'Suche...';

    // Finde das Listenelement mit der Suchlupe
    const searchIcon = document.querySelector('.searchSymbol');
    //Mit parentNode wird das Elternelement von searchSymbols gesucht und gefunden
    const parentLi = searchIcon.parentNode;

    // Ersetze das Symbol mit dem Input-Feld
    parentLi.replaceChild(input, searchIcon);

    // Setze Fokus auf das Input-Feld. Ist optional, aber sorgt dafür, dass der Benutzer direkt loslegen kann
    input.focus();

    // Optional: Wenn der Benutzer aus dem Input-Feld herausklickt, wieder zur Lupe wechseln
    input.addEventListener('blur', function() {
        parentLi.replaceChild(searchIcon, input);
    });
    inputSearchField.addEventListener('input', function() {
        const searchValue = inputSearchField.value.toLowerCase();
        const products = document.querySelectorAll('.productCard');

        products.forEach(product => {
            const productName = product.querySelector('h2').textContent.toLowerCase();
            if (productName.includes(searchValue)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
});