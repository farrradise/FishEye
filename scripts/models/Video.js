import Media from "../models/Media.js"


export default class Video extends Media {
    constructor(data) {
        super(data)
        this._media = "video";
        this._name = data.video;
    }

    get name() {
        return `<video controls class="media__img"  type=video/mp4/>
            <source src="assets/images/works/${this._name}" type="video/mp4">
        </video>`
    }
 }