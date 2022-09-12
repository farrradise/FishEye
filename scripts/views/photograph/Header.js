import Photograph from '../../models/Photograph.js'
// import {displayModal, closeModal} from '../../utils/contactForm.js'

export default class Header extends Photograph {
    
    constructor(data) {
        super(data);
    }



    render() {
        const header = `<section class="photograph-header">
            <div>
            
                <h2 class="photographer__name">${this.name}</h2>
                <p class="photographer__details">
                    <span class="photographer__hometown">${this.city}, ${this.country}</span>
                    <span class="photographer__tagline">${this.tagline}</span>
                
                </p>
            </div>
            <button class="contact_button" aria-label="Ouvrir le formulaire de contact">Contactez-moi</button>
            <figure>
            <img alt="photo de profil de ${this.name}" src="assets/photographers/${this.portrait}">
            </figure>
            </section>`
            
        
        return header;

    }
}