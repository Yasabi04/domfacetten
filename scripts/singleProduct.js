const artnr = localStorage.getItem('tempArtnr');
        const preis = localStorage.getItem('tempPreis');
        function loadPreferedProduct(){
            if(true){
                const container = document.getElementById("singleProduct");
                const product = document.createElement('article');
                product.className = "shownProduct"
                
                product.innerHTML = `
                    <section class = "shownProduct">
                        
                    </section>
                `;
                container.appendChild(product)
            }
            else{
                console.log("Keine Produktinformationen gefunden :(")
            }
        }

        loadPreferedProduct();