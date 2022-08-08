export async function getDatas (alldatas) {
    const a = await datas;
    const DB = new Database(a);
}

const datas = fetch("./data/photographers.json")
    .then((response) => response.json())
    .then((value) => {
        return value;
});


class Database {
    constructor (datas) {
        if (Database.exists) {
            return Database.instance
        } else {
            this._datas = datas;
            this._photographers = datas.photographers;
            this._medias = datas.media;
        }
        Database.instance = this
        Database.exists = true

        return this
    }

}

  



