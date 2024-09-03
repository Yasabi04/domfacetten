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

/*
document.querySelector('.buyMeACookie').addEventListener('click', function() {
        window.open('https://www.paypal.com/paypalme/Yasabi911', '_blank');
});
*/

document.getElementById("createDivButton").addEventListener("click", function() {
    // Überprüfen, ob das Div bereits existiert
    if (!document.getElementById("centeredDiv")) {
        // Erstelle das neue Div-Element
        const div = document.createElement("div");
        div.id = "centeredDiv";
        div.innerHTML = `
            <p>Hi, mein Name ist Yassin! Ich bin 20 Jahre, Student und habe diesen Shop alleine aufgesetzt :) Ich würde mich über eine kleine Spende freuen!</p>
            <button id="yesButton">Akzeptieren</button>
            <button id="noButton">Ablehnen</button>
        `;
        div.style.display = "block";

        // Füge das Div zum Body hinzu
        document.body.appendChild(div);

        // Event-Listener für die Buttons hinzufügen
        document.getElementById("yesButton").addEventListener("click", function() {
            window.open('https://www.paypal.com/paypalme/Yasabi911', '_blank');
            document.body.removeChild(div);
        });

        document.getElementById("noButton").addEventListener("click", function() {
            document.body.removeChild(div);
        });
    } else {
        document.body.removeChild(document.getElementById("centeredDiv"));
    }
});











