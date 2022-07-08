function photographerFactory(data) {
    const { name, portrait, city, country, tagline, id, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = `<article class="photographer" id="${id}">
                            <img src="assets/photographers/${portrait}">
                            <h2>${name}</h2>
                            <p class="photographer__details">
                                <span class="photographer__hometown">${city}, ${country}</span>
                                <span class="photographer__tagline">${tagline}</span>
                                <span class="photographer__price">${price}€/jour</span>
                            </p>
                        </article>`;
                            
        // const article = document.createElement( 'article' );
        // article.classList.add('photographer');
        // const img = document.createElement( 'img' );
        // img.setAttribute("src", picture)
        // const h2 = document.createElement( 'h2' );
        // h2.textContent = name;
        // article.appendChild(img);
        // article.appendChild(h2);
        console.log(article);
        return (article);
    }

    return { name, picture, getUserCardDOM }





    // créer les variables (constructeur)

    // creer fonction qui genere une carte html
    


}