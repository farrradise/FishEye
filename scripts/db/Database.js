export default class Database {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        this._url = url
    }

    async get() {
        console.log('test', this)
        return fetch(this._url)
            .then(res => res.json())
            .then(res => {
                console.log('coucou test', res);
                return res;
            })
            // .catch(err => console.log('an error occurs', err))
    }


}
