export default class Media {
    
    constructor(data) {
        this._date = data.date;
        this._id = data.id;
        this._likes = data.likes;
        this._photographerId = data.photographerId;
        this._price = data.price;
        this._title = data.title;
        this._media;
        this._name;
    }

    // pour david question si jenleve le underscore et que je garde les getters gros soucis, je pensais qu'il sagissait simplement d'une convention
    // Media.js:4 Uncaught (in promise) TypeError: Cannot set property date of #<Media> which has only a getter
    // at new Media (Media.js:4:19)
    // at new Card (Card.js:6:9)
    // at photographer.js:31:23
    // at Array.forEach (<anonymous>)
    // at displayWork (photographer.js:30:21)
    // at start (photographer.js:78:3)

    get date() {
        return this._date;
    }
    
    get id() {
        return this._id;
    }

    get likes() {
        return this._likes;
    }

    set likes(add) {
        this._likes += add;
    }

    get price() {
        return this._price;
    }

    get photographerId() {
        return this._photographerId;
    }
      
    get title() {
        return this._title;
    }

    get media() {
        return this._media;
    }
    
}