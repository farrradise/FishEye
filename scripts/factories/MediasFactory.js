import Video from "../models/Video.js";
import Image from "../models/Image.js";

export default class MediaFactory {
    constructor(data) {
        if (data.image !== undefined) {
            return new Image(data);
        } else if (data.video !== undefined) {
            return new Video(data);
        } else {
            return "type image ou video non défini"
        }

    }

}