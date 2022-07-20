import Media from '../models/Media.js'


export default class Image extends Media {
    constructor (data) {
        super(data) 
        this._media = 'image';
        this._name = data.image
    }

    get name() {
        return `<img src="assets/images/works/${this._name}"/>`
    }
}