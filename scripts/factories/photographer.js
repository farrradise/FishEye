function photographerFactory(data) {
    const { name, portrait, city, country, tagline, id, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = `<article class="photographer" id="${id}">
                            <a class="photographer__clickable" href="" alt="${name}">
                                <img src="assets/photographers/${portrait}">
                                <h2>${name}</h2>
                            </a>
                            <p class="photographer__details">
                                <span class="photographer__hometown">${city}, ${country}</span>
                                <span class="photographer__tagline">${tagline}</span>
                                <span class="photographer__price">${price}€/jour</span>
                            </p>
                        </article>`;
                            
   
        return (article);
    }

    return { name, picture, getUserCardDOM }
    


}