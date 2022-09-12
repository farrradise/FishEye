import Media from "../../models/Media.js";

export default class Card  {
    
    constructor(media) {
        this.media = media;
    }


    render() {
        return `<div class="media__card" data-liked="false" data-id="${this.media.id}">
            <a aria-label="Ouvrir la lightbox sur l'image ${this.media.title}" href="" class="media__link">
                ${this.media.name}
            </a>
            <div class="media__details">
                <h4 class="media__title">${this.media.title}</h4>
                <div class="media__likes">
                    <span aria-label="nombre de j'aime">${this.media.likes}</span>
                    <i class="fa-solid fa-heart" aria-hidden="false" role="checkbox"  aria-checked="false" tabindex="0" title="Bouton pour aimer la photo" ></i>
                </div>
            </div>
        </div>`
    }

    renderSlide() {
        return `      
            
            <div class="lightbox__card" data-slide="${this.media.id}">
                ${this.media.name} 
                <h4 class="lightbox__title ">${this.media.title}</h4>
            </div>
            `


    }
}