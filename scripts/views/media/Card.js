export default class Card {
    
    constructor(data) {
        this.date = data.date;
        this.id = data.id;
        this.likes = data.likes;
        // this.photographerId = data.photographerId;
        this.price = data.price;
        this.title = data.title;
        // this.price = data.price;
    }


    render() {
        return `<div class="media__card">
            <a href="" class="media__link">
                <img src="" class="media__img">
            </a>
            <div class="media__details">
                <h4 class="media__title">${this.title}</h4>
                <div class="media__likes">
                    <span>${this.likes}</span>
                    <i class="fa-solid fa-heart"></i>
                </div>
            </div>
        </div>`
    }
}