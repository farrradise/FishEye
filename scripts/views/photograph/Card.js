import Photograph from '../../models/Photograph.js'

export default class Card extends Photograph {
    
    constructor (data) {
        super(data)
    }



 render() {
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
        
}