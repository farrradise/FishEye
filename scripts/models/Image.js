import Media from '../models/Media.js'


export default class Image extends Media {
    constructor (data) {
        super(data) 
        this._media = 'image';
        this._name = data.image
    }

    get name() {
        return `<img class="media__img" alt="Décrire image avec alternative au média pertinent" src="assets/images/works/${this._name}"/>`
    }
}