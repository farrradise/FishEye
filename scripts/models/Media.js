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