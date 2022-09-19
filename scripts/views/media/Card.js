export default class Card  {
    
    constructor(media) {
        this.media = media;
    }


    render() {
        return `<div class="media__card" data-liked="false" data-id="${this.media.id}">
            <a aria-haspopup="true" aria-expanded="false" aria-controls="lightbox" tabindex="0" aria-label="Ouvrir la lightbox sur l'image ${this.media.title}" href="" class="media__link">
                ${this.media.name}
            </a>
            <div class="media__details">
                <h3 class="media__title">${this.media.title}</h3>
                <div class="media__likes">
                    <span  aria-label="${this.media.likes} mentions 'j'aime' sur cette photo"><span aria-hidden="true">${this.media.likes}</span></span>
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