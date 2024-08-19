document.addEventListener('DOMContentLoaded', function() {
    // Aktuelle Seite aus der URL extrahieren
    var currentPage = window.location.pathname.split("/").pop().replace(".html", "");
    
    // Wenn die Seite leer ist (z.B. "/"), setzen wir sie auf "index"
    if (currentPage === "") {
        currentPage = "index";
    }
    
    // Alle Links in der Navigation durchgehen
    var navLinks = document.querySelectorAll('.mainNavBar a');
    navLinks.forEach(function(link) {
        // Wenn das data-page Attribut mit der aktuellen Seite übereinstimmt
        if (link.getAttribute('data-page') === currentPage) {
            // Füge die Klasse 'current-page' hinzu
            link.classList.add('current-page');
        }
    });
});