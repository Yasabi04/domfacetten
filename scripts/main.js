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
    input.placeholder = 'Suche';

    // Finde das Listenelement mit der Suchlupe
    const searchIcon = document.querySelector('.searchSymbol');
    //Mit parentNode wird das Elternelement von searchSymbols gesucht und gefunden
    const parentLi = searchIcon.parentNode;

    parentLi.replaceChild(input, searchIcon);
    input.focus();

    // Optional: Wenn der Benutzer aus dem Input-Feld herausklickt, wieder zur Lupe wechseln
    input.addEventListener('blur', function() {
        parentLi.replaceChild(searchIcon, input);
    });
    inputSearchField.addEventListener('input', function() {
        const searchValue = inputSearchField.value.toLowerCase();
        const products = document.querySelectorAll('.temp-product');

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


document.querySelector('.burger').addEventListener('click', () => {
    const aside = document.querySelector('aside');
    const burgerPatties = document.querySelector('.burger');
    if(!aside.classList.contains('open')) {
        aside.style.transform = 'translateX(-176px)';
        aside.style.transition = 'transform 0.3s';
        aside.classList.add('open');
        burgerPatties.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        return;
    }
    else {
        aside.style.transform = 'translateX(0px)';
        burgerPatties.innerHTML = '<i class="fa-solid fa-bars">';
        aside.classList.remove('open');
    }
});