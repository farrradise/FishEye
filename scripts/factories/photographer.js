class Photographer {
    
    constructor(data) {
        // this.data = data;
        this.name = data.name;
        this.portrait = data.portrait;
        this.city = data.city;
        this.country = data.country;
        this.tagline = data.tagline;
        this.id = data.id;
        this.price = data.price;
    }

    photographerCard() {
        const photographerCard = `<article class="photographer" id="${this.id}">
            <a class="photographer__clickable" href="photographer.html?id=${this.id}" alt="${this.name}">
                <img src="assets/photographers/${this.portrait}">
                <h2 class="photographer__name">${this.name}</h2>
            </a>
            <p class="photographer__details">
                <span class="photographer__hometown">${this.city}, ${this.country}</span>
                <span class="photographer__tagline">${this.tagline}</span>
                <span class="photographer__price">${this.price}€/jour</span>
            </p>
        </article>` 
        
        
        return photographerCard;
            
    }

    photographerSingleHeader() {
        const header = `<div class="photograph-header">
            <div>
            
                <h2 class="photographer__name">${this.name}</h2>
                <p class="photographer__details">
                    <span class="photographer__hometown">${this.city}, ${this.country}</span>
                    <span class="photographer__tagline">${this.tagline}</span>
                
                </p>
            </div>
            <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
            <figure>
                <img src="assets/photographers/${this.portrait}">
            </figure>
        </div>`
        
        
        return header;

    }
}