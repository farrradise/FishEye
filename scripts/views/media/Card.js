import Media from "../../models/Media.js";

export default class Card  {
    
    constructor(media) {
        this.media = media;
    }


    render() {
        return `<div class="media__card media__id--${this.media.id}">
            <a href="" class="media__link">
                ${this.media.name}
            </a>
            <div class="media__details">
                <h4 class="media__title">${this.media.title}</h4>
                <div class="media__likes">
                    <span>${this.media.likes}</span>
                    <i class="fa-solid fa-heart"></i>
                </div>
            </div>
        </div>`
    }
}