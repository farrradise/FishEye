export default class Recap {
    constructor (price, likes) {
        this.price = price;
        this.likes = likes;
    }

    render () {
        return `<div class="recap">
            <span class="recap__likes"><span>${this.likes}</span> <i class="fa-solid fa-heart"></i></span>
            <span class="recap__price">${this.price}€ / jour</span>
        </div>
        `
    }
}