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

document.querySelector('.buyMeACookie').addEventListener('click', function() {
        window.open('https://www.paypal.com/paypalme/Yasabi911', '_blank');      
});