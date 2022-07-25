import Photograph from '../../models/Photograph.js'
// import {displayModal, closeModal} from '../../utils/contactForm.js'

export default class Header extends Photograph {
    
    constructor(data) {
        super(data);
    }



    render() {
        const header = `<div class="photograph-header">
            <div>
            
                <h2 class="photographer__name">${this.name}</h2>
                <p class="photographer__details">
                    <span class="photographer__hometown">${this.city}, ${this.country}</span>
                    <span class="photographer__tagline">${this.tagline}</span>
                
                </p>
            </div>
            <button class="contact_button">Contactez-moi</button>
            <figure>
            <img src="assets/photographers/${this.portrait}">
            </figure>
            </div>`
            
            // <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        
        return header;

    }
}