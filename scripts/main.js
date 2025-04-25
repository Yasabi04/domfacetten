document.querySelectorAll('.searchSymbol').forEach((searchSymbol) => {
    searchSymbol.addEventListener('click', () => {
        // Erstelle das Input-Feld dynamisch
        const input = document.createElement('input');
        input.id = "inputSearchField"
        input.type = 'text';
        input.placeholder = 'Suche';

        // Finde das Listenelement mit der Suchlupe
        const searchIcon = searchSymbol
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